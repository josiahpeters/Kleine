using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Data
{
    public interface IRepository<T> where T : Entity
    {
        T GetById(int Id);
        List<T> GetAll();
        T Create(T entity);
        T Update(T entity);

    }

    public interface IPredictionRepository : IRepository<Prediction>
    {
        Prediction GetByProfileIdAndDueDateId(int profileId, int dueDateId);
    }

    public interface IProfileRepository : IRepository<Profile>
    {
        Profile GetByEmailAddress(string emailAddress);

        Profile GetByEmailCode(string code);
    }

    public interface ICookieTrackerRepository : IRepository<CookieTracker>
    {
        CookieTracker GetByUniqueKey(string unique);
    }

    public interface IResultsRepository
    {
        List<GenderResult> GetGenderResult();
        List<DateTimeCount> GetDateCounts(string gender = null);
        List<DateTimeCount> GetTimeCounts(string gender = null);
    }

}
