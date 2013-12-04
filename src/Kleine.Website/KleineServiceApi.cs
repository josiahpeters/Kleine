﻿using Kleine.Data;
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

            var dueDate = this.repo.DueDates.Create(new DueDate
                {
                    Name = "BabyP",
                    Title = "BabyP",
                    ExpectedDate = new DateTime(2013, 12, 16),
                    Description = "Baby P is coming soon!"
                });
        }


        private string getUniqueCode()
        {
            return Guid.NewGuid().ToString().Replace("-", "").ToLower();
        }

        private void setProfileSession(Profile profile)
        {
            this.Session.Set<int>(SessionKeys.ProfileId, profile.Id);
            trackCookieForProfile(profile);
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
            if (profile != null && prediction == null)
                prediction = repo.Predictions.GetByProfileIdAndDueDateId(profile.Id, 1);

            return new ProfilePrediction(profile, prediction);
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
                Response.StatusCode = 401;
                notify.SendAuth(profile, dueDate);
                return null;
            }

            // if they are a new person, lets create a new profile for them
            profile = repo.Profiles.Create(new Profile { EmailCode = emailCode }.PopulateWithNonDefaultValues(request));

            repo.Predictions.Create(new Prediction { ProfileId = profile.Id, DueDateId = dueDate.Id });

            notify.SendAuth(profile, dueDate);

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

            prediction = repo.Predictions.Update(prediction.PopulateWithNonDefaultValues(request));

            return getAggregate(profile, prediction);
        }
    }


    [Route("/info", "GET")]
    public class BrowserIdentity { }

    // PROFILE
    [Route("/profile", "GET")]
    public class ProfileGet : IReturn<ProfilePrediction> { }

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
        public Profile Profile { get; set; }
        public Prediction Prediction { get; set; }

        public ProfilePrediction(Profile profile = null, Prediction prediction = null)
        {
            this.Profile = profile;
            this.Prediction = prediction;
        }
    }
}