using Kleine.Data;
using Kleine.Services;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace Kleine.Website
{
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
                });

            var invite = this.repo.InviteCodes.Create(
                new InviteCode
                {
                    DueDateId = dueDate.Id,
                    ProfileId = joey.Id,
                    Code = "canada"
                });
        }

        public List<DueDate> Get(DueDateGetAll request)
        {
            return repo.DueDates.GetAll();
        }

        public DueDate Get(DueDateGetById request)
        {
            return repo.DueDates.GetById(request.Id);
        }

        public DueDate Post(DueDateCreate request)
        {
            var dueDate = repo.DueDates.Create(request);

            return dueDate;
        }

        public DueDate Put(DueDateUpdate request)
        {
            var dueDate = repo.DueDates.Update(request);

            return dueDate;
        }

        // Profiles
        public List<Profile> Get(GuessProfileGetAll request)
        {
            return repo.Profiles.GetAll();
        }

        public Profile Get(GuessProfileGetById request)
        {
            return repo.Profiles.GetById(request.Id);
        }

        public Profile Post(GuessProfileCreate request)
        {
            var dueDate = repo.Profiles.Create(request);

            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("Dear {0},<br /><br />\n", request.Name);
            sb.AppendFormat("Thanks for signing up to make guesses. To keep things simple, you don't need a username or password, just an email account. We've included this link: {0} that you can use to make guesses or check on the statistics of other guessers. If you lose this email and need access again just enter your email address in again.", "");

            //notify.SendNotification("josiahpeters@gmail.com", "Welcome", "test");

            return dueDate;
        }

        public Profile Put(GuessProfileUpdate request)
        {
            var dueDate = repo.Profiles.Update(request);

            return dueDate;
        }
    }

    // DueDate
    [Route("/DueDate/", "GET")]
    public class DueDateGetAll : IReturn<List<DueDate>> { }

    [Route("/DueDate/{id}", "GET")]
    public class DueDateGetById : IReturn<DueDate>
    {
        public int Id { get; set; }
    }

    [Route("/DueDate/", "POST")]
    public class DueDateCreate : DueDate, IReturn<DueDate> { }

    [Route("/DueDate/{id}", "PATCH")]
    public class DueDateUpdate : DueDate, IReturn<DueDate> { }


    // Guess Profiles
    [Route("/GuessProfile/", "GET")]
    public class GuessProfileGetAll : IReturn<List<Profile>> { }

    [Route("/GuessProfile/{id}", "GET")]
    public class GuessProfileGetById : IReturn<Profile>
    {
        public int Id { get; set; }
    }

    [Route("/GuessProfile/", "POST")]
    public class GuessProfileCreate : Profile, IReturn<Profile> { }

    [Route("/GuessProfile/{id}", "PATCH")]
    public class GuessProfileUpdate : Profile, IReturn<Profile> { }


}