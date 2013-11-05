using Kleine.Data;
using Kleine.Services;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kleine.Website
{
    public class KleineServiceApi : Service
    {
        IRepositories repo;

        // Due Dates
        public KleineServiceApi(IRepositories repo)
        {
            this.repo = repo;
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