using Kleine.Data;
using Kleine.Services;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using ServiceStack.ServiceInterface.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using ServiceStack.Common;
using System.Runtime.Serialization;


namespace Kleine.Website
{
    public class SessionKeys
    {
        public const string ProfileId = "ProfileId";
    }

    public class CookieKeys
    {
        public const string Identity = "Identity";
    }


    public class KleineServiceApi : Service
    {
        IRepositories repo;
        INotification notify;

        // Due Dates
        public KleineServiceApi(IRepositories repo, INotification notify)
        {
            this.repo = repo;
            this.notify = notify;
        }


        private string getUniqueCode()
        {
            return Guid.NewGuid().ToString().Replace("-", "").ToLower();
        }

        private void setProfileSession(Profile profile)
        {
            if (profile != null)
            {
                this.Session.Set<int>(SessionKeys.ProfileId, profile.Id);
                trackCookieForProfile(profile);
            }
        }

        private void trackCookieForProfile(Profile profile)
        {
            var cookieTracker = this.repo.CookieTrackers.Create(new CookieTracker
            {
                ProfileId = profile.Id,
                Unique = getUniqueCode()
            });

            Response.Cookies.AddPermanentCookie(CookieKeys.Identity, cookieTracker.Unique, false);
        }

        private ProfilePrediction getAggregate(Profile profile, Prediction prediction = null)
        {
            PredictionScore predictionScore = null;

            PredictionOutcome outcome = new PredictionOutcome
            {
                Gender = "Female",
                Date = new DateTime(2013, 12, 10),
                Time = new DateTime(2013, 12, 10, 17, 42, 0),
                Weight = 7.2M,
                Length = 20.75M
            };

            if (profile != null && prediction == null)
            {
                prediction = repo.Predictions.GetByProfileIdAndDueDateId(profile.Id, 1);
                predictionScore = getScore(prediction, outcome);
            }

            return new ProfilePrediction(profile, prediction, predictionScore);
        }

        private PredictionScore getScore(Prediction prediction, PredictionOutcome outcome)
        {
            PredictionScore score = new PredictionScore();           

            var date = (DateTime)prediction.Date;
            var time = ((DateTime)prediction.Time).ToLocalTime();
            time = new DateTime(2013, 12, 10, time.Hour, time.Minute, 0);

            if (prediction.Gender == outcome.Gender)
                score.Gender = 2;

            if (date.Month == outcome.Date.Month && date.Day == outcome.Date.Day)
                score.Date = 5;

            var timedif = (outcome.Time - time);

            if (timedif.TotalHours <= 4 && timedif.TotalHours >= 0)
                score.Time = 3;

            if (prediction.Weight <= outcome.Weight && prediction.Weight <= (outcome.Weight+1.5M))
                score.Weight = 3;

            if (prediction.Length <= outcome.Length && prediction.Length <= outcome.Length + 2M)
                score.Length = 2;

            return score;
        }

        private Profile getCurrentProfileFromSession()
        {
            if (Session[SessionKeys.ProfileId] != null)
            {
                int profileId = Session.Get<int>(SessionKeys.ProfileId);

                return repo.Profiles.GetById(profileId);
            }
            else if (Request.Cookies.ContainsKey(CookieKeys.Identity))
            {
                string unique = Request.Cookies[CookieKeys.Identity].ToString();

                CookieTracker tracker = repo.CookieTrackers.GetByUniqueKey(unique);

                if (tracker != null)
                    return repo.Profiles.GetById(tracker.ProfileId);
                else
                {
                    Response.Cookies.DeleteCookie(CookieKeys.Identity);
                    return null;
                }
            }
            else
                return null;
        }

        public ProfilePrediction Get(ProfileGet request)
        {
            if (!string.IsNullOrWhiteSpace(request.code))
            {
                if (request.code == "kizzlefoshizzle")
                {
                    //repo.SetUp();
                    return new ProfilePrediction();
                }

                var profile = repo.Profiles.GetByEmailCode(request.code);

                setProfileSession(profile);

                return getAggregate(profile);
            }
            return getAggregate(getCurrentProfileFromSession());
        }

        public ProfilePrediction Post(ProfileCreate request)
        {
            var dueDate = repo.DueDates.GetById(1);

            string emailCode = getUniqueCode();

            // determine if they have already signed up
            Profile profile = repo.Profiles.GetByEmailAddress(request.EmailAddress);
            // if they have send them an email telling them how to 
            if (profile != null)
            {
                notify.SendAuth(profile, dueDate);
                Response.StatusCode = 401;
                return null;
            }

            // if they are a new person, lets create a new profile for them
            profile = repo.Profiles.Create(new Profile { EmailCode = emailCode }.PopulateWithNonDefaultValues(request));

            repo.Predictions.Create(new Prediction { ProfileId = profile.Id, DueDateId = dueDate.Id });

            //notify.SendAuth(profile, dueDate);

            // store profile Id in session and set a long lasting cookie associated with the profile
            setProfileSession(profile);

            return getAggregate(profile);
        }

        public ProfilePrediction Put(ProfileUpdate request)
        {
            var dueDate = repo.DueDates.GetById(1);

            var profile = getCurrentProfileFromSession();

            if (profile != null)
            {
                profile.Name = request.Name ?? profile.Name;

                repo.Profiles.Update(profile);

                return getAggregate(profile);
            }
            else
            {


            }
            return null;
        }

        public ProfilePrediction Put(PredictionUpdate request)
        {
            var profile = getCurrentProfileFromSession();

            Prediction prediction = repo.Predictions.GetByProfileIdAndDueDateId(request.ProfileId, 1);

            if (request.Gender != null && !(request.Gender == "Male" || request.Gender == "Female"))
                throw new Exception("Gender is incorrect");

            if (request.Date != null && (request.Date < new DateTime(2013, 11, 25) || request.Date > new DateTime(2014, 1, 4)))
                throw new Exception("Date is not valid range.");

            if (request.Weight != null && request.Weight != 0 && (request.Weight < 1 || request.Weight > 13))
                throw new Exception("Weight is not valid range.");

            if (request.Length != null && request.Length != 0 && (request.Length < 15 || request.Length > 41))
                throw new Exception("Length is not valid range.");

            prediction.PopulateWithNonDefaultValues(request);

            prediction = repo.Predictions.Update(prediction);

            if (prediction.FinishDate != null && prediction.FinishDate > DateTime.MinValue)
            {
                notify.SendGuessToKim(profile, prediction);
            }

            return getAggregate(profile, prediction);
        }

        public ResultsAggregate Get(ResultsRequest request)
        {
            var genderResults = GenderResults();

            var dateCounts = DateCounts();

            var timeCounts = TimeCounts();

            var weightCounts = WeightCounts();

            var lengthCounts = LengthCounts();

            var rankings = getRankings();

            return new ResultsAggregate(genderResults, dateCounts, timeCounts, weightCounts, lengthCounts);
        }

        private object getRankings()
        {
            var profiles = repo.Profiles.GetAll();
            var predictions = repo.Predictions.GetAll().Where(u => u.FinishDate != null);

            return null;
        }

        List<GenderResult> GenderResults()
        {
            var genderResults = repo.Results.GetGenderResult();

            return genderResults;
        }
        List<GenderDateTimeCount> DateCounts()
        {
            var femaleDates = repo.Results.GetDateCounts("Female");
            var maleDates = repo.Results.GetDateCounts("Male");

            var dates = new Dictionary<int, GenderDateTimeCount>();

            foreach (var date in femaleDates)
            {
                var day = date.Date.DayOfYear;
                if (dates.ContainsKey(day))
                {
                    dates[day].FemaleCount += date.Count;
                }
                else
                {
                    dates.Add(day, new GenderDateTimeCount
                    {
                        Date = date.Date,
                        FemaleCount = date.Count
                    });
                }
            }

            foreach (var date in maleDates)
            {
                var day = date.Date.DayOfYear;
                if (dates.ContainsKey(day))
                {
                    dates[day].MaleCount += date.Count;
                }
                else
                {
                    dates.Add(day, new GenderDateTimeCount
                    {
                        Date = date.Date,
                        MaleCount = date.Count
                    });
                }
            }

            var dateCounts = dates.Values.OrderBy(u => u.Date).ToList();

            return dateCounts;
        }
        List<GenderDateTimeCount> TimeCounts()
        {
            var femaleTimes = repo.Results.GetTimeCounts("Female");
            var maleTimes = repo.Results.GetTimeCounts("Male");

            var times = new Dictionary<int, GenderDateTimeCount>();

            foreach (var time in femaleTimes)
            {
                var hour = time.Date.Hour;
                if (times.ContainsKey(hour))
                {
                    times[hour].FemaleCount += time.Count;
                }
                else
                {
                    times.Add(hour, new GenderDateTimeCount
                    {
                        Date = time.Date,
                        FemaleCount = time.Count
                    });
                }
            }

            foreach (var time in maleTimes)
            {
                var hour = time.Date.Hour;
                if (times.ContainsKey(hour))
                {
                    times[hour].MaleCount += time.Count;
                }
                else
                {
                    times.Add(hour, new GenderDateTimeCount
                    {
                        Date = time.Date,
                        MaleCount = time.Count
                    });
                }
            }
            var timeCounts = times.Values.OrderBy(u => u.Date).ToList();

            return timeCounts;
        }
        List<GenderIntegerGroupCount> WeightCounts()
        {
            var femaleWeights = repo.Results.GetWeightCounts("Female");
            var maleWeights = repo.Results.GetWeightCounts("Male");

            var weights = new Dictionary<int, GenderIntegerGroupCount>();

            foreach (var weight in femaleWeights)
            {
                var value = weight.Value;
                if (weights.ContainsKey(value))
                {
                    weights[value].FemaleCount += weight.Count;
                }
                else
                {
                    weights.Add(value, new GenderIntegerGroupCount
                    {
                        Value = value,
                        FemaleCount = weight.Count
                    });
                }
            }

            foreach (var weight in maleWeights)
            {
                var value = weight.Value;
                if (weights.ContainsKey(value))
                {
                    weights[value].MaleCount += weight.Count;
                }
                else
                {
                    weights.Add(value, new GenderIntegerGroupCount
                    {
                        Value = value,
                        MaleCount = weight.Count
                    });
                }
            }
            var weightCounts = weights.Values.OrderBy(u => u.Value).ToList();

            return weightCounts;
        }
        List<GenderIntegerGroupCount> LengthCounts()
        {
            var femaleLengths = repo.Results.GetLengthCounts("Female");
            var maleLengths = repo.Results.GetLengthCounts("Male");

            var lengths = new Dictionary<int, GenderIntegerGroupCount>();

            foreach (var length in femaleLengths)
            {
                var value = length.Value;
                if (lengths.ContainsKey(value))
                {
                    lengths[value].FemaleCount += length.Count;
                }
                else
                {
                    lengths.Add(value, new GenderIntegerGroupCount
                    {
                        Value = value,
                        FemaleCount = length.Count
                    });
                }
            }

            foreach (var length in maleLengths)
            {
                var value = length.Value;
                if (lengths.ContainsKey(value))
                {
                    lengths[value].MaleCount += length.Count;
                }
                else
                {
                    lengths.Add(value, new GenderIntegerGroupCount
                    {
                        Value = value,
                        MaleCount = length.Count
                    });
                }
            }
            var lengthCounts = lengths.Values.OrderBy(u => u.Value).ToList();

            return lengthCounts;
        }

    }


    [Route("/info", "GET")]
    public class BrowserIdentity { }

    // PROFILE
    [Route("/profile", "GET")]
    public class ProfileGet : IReturn<ProfilePrediction>
    {
        public string code { get; set; }
    }

    [Route("/profile", "POST")]
    public class ProfileCreate : Profile, IReturn<ProfilePrediction> { }

    [Route("/profile", "PUT")]
    public class ProfileUpdate : Profile, IReturn<ProfilePrediction> { }


    // GUESS
    [Route("/predict/{DueDateId}", "GET")]
    public class PredictionGet : IReturn<Prediction>
    {
        public int DueDateId { get; set; }
        //public int ProfileId { get; set; }
    }

    [Route("/predict", "PUT")]
    public class PredictionUpdate : Prediction, IReturn<ProfilePrediction> { }

    //[Route("/profile/{id}", "PATCH")]
    //public class ProfileUpdate : Profile, IReturn<Profile> { }

    public class ProfilePrediction
    {
        [DataMember]
        public Profile Profile { get; set; }

        [DataMember]
        public Prediction Prediction { get; set; }

        [DataMember]
        public PredictionScore PredictionScore { get; set; }

        public ProfilePrediction() { }
        public ProfilePrediction(Profile profile)
        {
            this.Profile = profile;
            this.Prediction = null;
        }
        public ProfilePrediction(Profile profile, Prediction prediction, PredictionScore predictionScore = null)
        {
            this.Profile = profile;
            this.Prediction = prediction;
            this.PredictionScore = predictionScore;
        }
    }

    public class ResultsAggregate
    {
        [DataMember]
        public List<GenderResult> GenderResults { get; set; }

        [DataMember]
        public List<GenderDateTimeCount> DateCounts { get; set; }

        [DataMember]
        public List<GenderDateTimeCount> TimeCounts { get; set; }

        [DataMember]
        public List<GenderIntegerGroupCount> WeightCounts { get; set; }

        [DataMember]
        public List<GenderIntegerGroupCount> LengthCounts { get; set; }

        public ResultsAggregate() { }
        public ResultsAggregate(List<GenderResult> GenderResults,
            List<GenderDateTimeCount> DateCounts,
            List<GenderDateTimeCount> TimeCounts,
            List<GenderIntegerGroupCount> WeightCounts,
            List<GenderIntegerGroupCount> LengthCounts)
        {
            this.GenderResults = GenderResults;
            this.DateCounts = DateCounts;
            this.TimeCounts = TimeCounts;
            this.WeightCounts = WeightCounts;
            this.LengthCounts = LengthCounts;
        }
    }


    [Route("/results", "GET")]
    public class ResultsRequest : IReturn<ResultsAggregate>
    {
    }


}