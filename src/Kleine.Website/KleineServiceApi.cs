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

            var joey = this.repo.Profiles.Create(
                new Profile
                {
                    EmailAddress = "josiahpeters@gmail.com",
                    Name = "Joey Peters",
                    SessionId = Guid.NewGuid()
                });

            var invite = this.repo.InviteCodes.Create(
                new InviteCode
                {
                    DueDateId = dueDate.Id,
                    ProfileId = joey.Id,
                    Code = "canada123"
                });


        }

        //public List<DueDate> Get(DueDateGetAll request)
        //{
        //    return repo.DueDates.GetAll();
        //}

        //public DueDate Get(DueDateGetById request)
        //{
        //    return repo.DueDates.GetById(request.Id);
        //}

        //public DueDate Post(DueDateCreate request)
        //{
        //    var dueDate = repo.DueDates.Create(request);

        //    return dueDate;
        //}

        //public DueDate Put(DueDateUpdate request)
        //{
        //    var dueDate = repo.DueDates.Update(request);

        //    return dueDate;
        //}

        //// Profiles
        //public List<Profile> Get(GuessProfileGetAll request)
        //{
        //    return repo.Profiles.GetAll();
        //}

        //public Profile Get(GuessProfileGetById request)
        //{
        //    return repo.Profiles.GetById(request.Id);
        //}
        public Profile Get(ProfileGet request)
        {
            if (Session[SessionKeys.ProfileId] != null)
            {
                int profileId = Session.Get<int>(SessionKeys.ProfileId);

                return repo.Profiles.GetById(profileId);
            }
            else
            {
                this.Session.Set<int>(SessionKeys.ProfileId, 1);
                return repo.Profiles.GetById(1);
            }
            //return null;
        }
        public Profile Post(ProfileCreate request)
        {
            var dueDate = repo.DueDates.GetById(1);

            request.SessionId = Guid.NewGuid();

            var profile = repo.Profiles.Create(request);

            var invite = this.repo.InviteCodes.Create(
                new InviteCode
                {
                    DueDateId = dueDate.Id,
                    ProfileId = profile.Id,
                    Code = "canada123"
                });

            this.Session.Set<int>(SessionKeys.ProfileId, profile.Id);

            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("Dear {0},<br /><br />\n", request.Name);
            sb.AppendFormat("Your confirmation code is: {0} or click this link: <a href=\"http://localhost:53252/#/invite/start-guessing?code={0}\">THIS LINK</a>", invite.Code);
            //sb.AppendFormat("Thanks for signing up to make guesses. To keep things simple, you don't need a username or password, just an email account. We've included this link: {0} that you can use to make guesses or check on the statistics of other guessers. If you lose this email and need access again just enter your email address in again.", "");

            //notify.SendNotification("josiahpeters@gmail.com", "Welcome", sb.ToString());

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

        public Guess Get(GuessGet request)
        {
            int profileId = Session.Get<int>(SessionKeys.ProfileId);

            var guesses = repo.Guesses.GetAll();
            var guess = guesses.SingleOrDefault(u => u.DueDateId == request.DueDateId && u.ProfileId == profileId);

            if (guess == null)
                guess = repo.Guesses.Create(new Guess { ProfileId = profileId, DueDateId = request.DueDateId });

            return guess;
        }

        public Guess Post(GuessUpdate request)
        {
            var guesses = repo.Guesses.GetAll();
            var guess = guesses.SingleOrDefault(u => u.DueDateId == request.DueDateId && u.ProfileId == request.ProfileId);

            if (guess == null)
            {                
                guess = repo.Guesses.Create(request.TranslateTo<Guess>());
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

    //// DueDate
    //[Route("/DueDate/", "GET")]
    //public class DueDateGetAll : IReturn<List<DueDate>> { }

    //[Route("/DueDate/{id}", "GET")]
    //public class DueDateGetById : IReturn<DueDate>
    //{
    //    public int Id { get; set; }
    //}

    //[Route("/DueDate/", "POST")]
    //public class DueDateCreate : DueDate, IReturn<DueDate> { }

    //[Route("/DueDate/{id}", "PATCH")]
    //public class DueDateUpdate : DueDate, IReturn<DueDate> { }


    //// Guess Profiles


    //[Route("/profile/{id}", "GET")]
    //public class GuessProfileGetById : IReturn<Profile>
    //{
    //    public int Id { get; set; }
    //}



    // PROFILE
    [Route("/profile", "GET")]
    public class ProfileGet : IReturn<Profile> { }

    [Route("/profile", "POST")]
    public class ProfileCreate : Profile, IReturn<Profile> { }

    [Route("/profile/confirmation", "POST")]
    public class ProfileConfirmation : IReturn<Profile>
    {
        public string ConfirmationCode { get; set; }
    }


    // GUESS
    [Route("/guess/{DueDateId}", "GET")]
    public class GuessGet : IReturn<Guess>
    {
        public int DueDateId { get; set; }
        //public int ProfileId { get; set; }
    }

    [Route("/guess", "POST")]
    public class GuessUpdate : Guess, IReturn<Guess> { }

    //[Route("/profile/{id}", "PATCH")]
    //public class ProfileUpdate : Profile, IReturn<Profile> { }
}