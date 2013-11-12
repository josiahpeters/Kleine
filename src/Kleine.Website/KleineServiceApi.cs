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
        public List<GuessProfile> Get(GuessProfileGetAll request)
        {
            return repo.GuessProfiles.GetAll();
        }

        public GuessProfile Get(GuessProfileGetById request)
        {
            return repo.GuessProfiles.GetById(request.Id);
        }

        public GuessProfile Post(GuessProfileCreate request)
        {
            var dueDate = repo.GuessProfiles.Create(request);

            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("Dear {0},<br /><br />\n", request.Name);
            sb.AppendFormat("Thanks for signing up to make guesses. To keep things simple, you don't need a username or password, just an email account. We've included this link: {0} that you can use to make guesses or check on the statistics of other guessers. If you lose this email and need access again just enter your email address in again.", "");

            //notify.SendNotification("josiahpeters@gmail.com", "Welcome", "test");

            return dueDate;
        }

        public GuessProfile Put(GuessProfileUpdate request)
        {
            var dueDate = repo.GuessProfiles.Update(request);

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
    public class GuessProfileGetAll : IReturn<List<GuessProfile>> { }

    [Route("/GuessProfile/{id}", "GET")]
    public class GuessProfileGetById : IReturn<GuessProfile>
    {
        public int Id { get; set; }
    }

    [Route("/GuessProfile/", "POST")]
    public class GuessProfileCreate : GuessProfile, IReturn<GuessProfile> { }

    [Route("/GuessProfile/{id}", "PATCH")]
    public class GuessProfileUpdate : GuessProfile, IReturn<GuessProfile> { }


}