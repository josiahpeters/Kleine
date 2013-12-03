using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Kleine.Data.Memory;

namespace Kleine.Data
{
    public class Repositories : IRepositories
    {
        private IRepository<DueDate> dueDates = new BaseRepository<DueDate>();
        private IProfileRepository profile = new ProfileRepository();
        private IPredictionRepository predictions = new PredictionRepository();
        private ICookieTrackerRepository cookieTrackers = new CookieTrackerRepository();
                
        public IRepository<DueDate> DueDates
        {
            get
            {
                return dueDates;
            }
            set
            {
                dueDates = value;
            }
        }

        public IProfileRepository Profiles
        {
            get
            {
                return profile;
            }
            set
            {
                profile = value;
            }
        }


        public IPredictionRepository Predictions
        {
            get
            {
                return predictions;
            }
            set
            {
                predictions = value;
            }
        }

        public ICookieTrackerRepository CookieTrackers
        {
            get
            {
                return cookieTrackers;
            }
            set
            {
                cookieTrackers = value;
            }
        }


        public void SetUp()
        {
            throw new NotImplementedException();
        }
    }
}
