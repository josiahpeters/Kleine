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

            var dueDate = this.repo.DueDates.Create(
                new DueDate
                {
                    Name = "BabyP",
                    Title = "BabyP",
                    ExpectedDate = new DateTime(2013, 12, 16),
                    Description = "Baby P is coming soon!"
                });

            //var joey = this.repo.Profiles.Create(
            //    new Profile
            //    {
            //        EmailAddress = "josiahpeters@gmail.com",
            //        Name = "Joey Peters",
            //        SessionId = Guid.NewGuid()
            //    });

            //var invite = this.repo.InviteCodes.Create(
            //    new InviteCode
            //    {
            //        DueDateId = dueDate.Id,
            //        ProfileId = joey.Id,
            //        Code = "canada123"
            //    });


        }
        
        private Profile determineCurrentProfileFromSession()
        {
            if (Session[SessionKeys.ProfileId] != null)
            {
                int profileId = Session.Get<int>(SessionKeys.ProfileId);

                return repo.Profiles.GetById(profileId);
            }
            else if (Request.Cookies.ContainsKey(CookieKeys.Identity))
            {
                string sessionId = Request.Cookies[CookieKeys.Identity].ToString();

                return repo.Profiles.GetAll().FirstOrDefault(u => u.SessionId == Guid.Parse(sessionId));
            }
            else
                return null;
        }

        public object Get(BrowserIdentity request)
        {
            //string identity = Guid.NewGuid().ToString();

            //var cookies = Response.CookiesAsDictionary();

            //if (Request.Cookies.ContainsKey("Identity"))
            //    throw new Exception("HUR");

            //Response.Cookies.AddPermanentCookie("Identity", identity, false);
            return "done";
        }

        public Profile Get(ProfileGet request)
        {
            if (Session[SessionKeys.ProfileId] != null)
            {
                int profileId = Session.Get<int>(SessionKeys.ProfileId);

                return repo.Profiles.GetById(profileId);
            }
            else
            {
                return null;
            }
        }
        public Profile Post(ProfileCreate request)
        {
            var dueDate = repo.DueDates.GetById(1);

            string emailCode = Guid.NewGuid().ToString().Replace("-","");

            // determine if they have already signed up
            Profile profile = repo.Profiles.GetAll().FirstOrDefault(u => u.EmailAddress == request.EmailAddress);
            // if they have send them an email telling them how to 
            if (profile != null)
            {
                

                return profile;
            }

            profile = new Profile { EmailCode = emailCode }.PopulateWith(request);

            profile = repo.Profiles.Create(request);


            this.Session.Set<int>(SessionKeys.ProfileId, profile.Id);

            var cookieTracker = this.repo.CookieTrackers.Create(new CookieTracker
            {
                ProfileId = profile.Id,
                Unique = request.SessionId.ToString()
            });

            Response.Cookies.AddPermanentCookie(CookieKeys.Identity, cookieTracker.Unique, false);

            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("Dear {0},<br /><br />\n", "Friend");
            sb.AppendFormat("<a href=\"http://localhost:53252/#/predict/start?code={0}\">Make Prediction</a>", cookieTracker.Unique);
            //sb.AppendFormat("Thanks for signing up to make guesses. To keep things simple, you don't need a username or password, just an email account. We've included this link: {0} that you can use to make guesses or check on the statistics of other guessers. If you lose this email and need access again just enter your email address in again.", "");

            notify.SendNotification("josiahpeters@gmail.com", "BabyP - Make Prediction", sb.ToString());

            return profile;
        }

        public Profile Put(ProfileUpdate request)
        {
            var dueDate = repo.DueDates.GetById(1);

            var profile = determineCurrentProfileFromSession();

            profile.Name = request.Name ?? profile.Name;

            return profile;
        }

        public Profile Post(ProfileConfirmation request)
        {
            var invites = repo.InviteCodes.GetAll();
            var invite = invites.FirstOrDefault(u => u.Code == request.ConfirmationCode);

            if (invite != null)
            {
                var profile = repo.Profiles.GetById(invite.ProfileId);

                this.Session.Set<int>(SessionKeys.ProfileId, profile.Id);

                return profile;
            }
            else
                throw new Exception("Confirmation code invalid.");
        }

        public Prediction Get(PredictionGet request)
        {
            int profileId = Session.Get<int>(SessionKeys.ProfileId);

            var guesses = repo.Guesses.GetAll();
            var guess = guesses.SingleOrDefault(u => u.DueDateId == request.DueDateId && u.ProfileId == profileId);

            if (guess == null)
                guess = repo.Guesses.Create(new Prediction { ProfileId = profileId, DueDateId = request.DueDateId });

            return guess;
        }

        public Prediction Post(PredictionUpdate request)
        {
            var guesses = repo.Guesses.GetAll();
            var guess = guesses.SingleOrDefault(u => u.DueDateId == request.DueDateId && u.ProfileId == request.ProfileId);

            if (guess == null)
            {
                guess = repo.Guesses.Create(request.TranslateTo<Prediction>());
            }
            else
                guess.PopulateWithNonDefaultValues(request);

            repo.Guesses.Update(guess);

            return guess;
        }

        //public Profile Put(GuessProfileUpdate request)
        //{
        //    var dueDate = repo.Profiles.Update(request);

        //    return dueDate;
        //}
    }


    [Route("/info", "GET")]
    public class BrowserIdentity { }

    // PROFILE
    [Route("/profile", "GET")]
    public class ProfileGet : IReturn<Profile> { }

    [Route("/profile", "POST")]
    public class ProfileCreate : Profile, IReturn<Profile> { }

    [Route("/profile", "PUT")]
    public class ProfileUpdate : Profile, IReturn<Profile> { }

    [Route("/profile/confirmation", "POST")]
    public class ProfileConfirmation : IReturn<Profile>
    {
        public string ConfirmationCode { get; set; }
    }


    // GUESS
    [Route("/predict/{DueDateId}", "GET")]
    public class PredictionGet : IReturn<Prediction>
    {
        public int DueDateId { get; set; }
        //public int ProfileId { get; set; }
    }

    [Route("/predict", "POST")]
    public class PredictionUpdate : Prediction, IReturn<Prediction> { }

    //[Route("/profile/{id}", "PATCH")]
    //public class ProfileUpdate : Profile, IReturn<Profile> { }
}