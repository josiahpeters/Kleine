using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Kleine.Data.Memory;

namespace Kleine.Data
{
    public class MemoryRepositories : IRepositories
    {       
        private IRepository<DueDate> dueDates;
        private IProfileRepository profile;
        private IPredictionRepository predictions;
        private ICookieTrackerRepository cookieTrackers;
        private IResultsRepository results;

        public MemoryRepositories(IRepository<DueDate> dueDates, IProfileRepository profile, IPredictionRepository predictions, ICookieTrackerRepository cookieTrackers, IResultsRepository results)
        {
            this.dueDates = dueDates;
            this.profile = profile;
            this.predictions = predictions;
            this.cookieTrackers = cookieTrackers;
            this.results = results;
        }
                
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
            var dueDate = dueDates.Create(new DueDate
            {
                Name = "BabyP",
                Title = "BabyP",
                ExpectedDate = new DateTime(2013, 12, 16),
                Description = "Baby P is coming soon!"
            });

            var joey = Profiles.Create(new Profile { EmailAddress = "josiahpeters@gmail.com", Name = "Joey" });
            var kim = Profiles.Create(new Profile { EmailAddress = "kim@gmail.com", Name = "Kim" });

            Predictions.Create(new Prediction
            {
                ProfileId = kim.Id,
                Date = DateTime.Now.AddDays(-5),
                Time = DateTime.Now.AddHours(-5),
                Gender = "Male",
                Length = 15,
                Weight = 21
            });
            Predictions.Create(new Prediction
            {
                ProfileId = joey.Id,
                Date = DateTime.Now.AddDays(-1),
                Time = DateTime.Now.AddHours(-15),
                Gender = "Male",
                Length = 12,
                Weight = 4
            });
            Predictions.Create(new Prediction
            {
                ProfileId = joey.Id,
                Date = DateTime.Now.AddDays(-5),
                Time = DateTime.Now.AddHours(-4),
                Gender = "Male",
                Length = 12,
                Weight = 11
            });

            Predictions.Create(new Prediction
            {
                ProfileId = joey.Id,
                Date = DateTime.Now.AddDays(-5),
                Time = DateTime.Now.AddHours(-5),
                Gender = "Male",
                Length = 12,
                Weight = 14
            });

            Predictions.Create(new Prediction
            {
                ProfileId = joey.Id,
                Date = DateTime.Now.AddDays(-2),
                Time = DateTime.Now.AddHours(-4),
                Gender = "Female",
                Length = 15,
                Weight = 6
            });

            Predictions.Create(new Prediction
            {
                ProfileId = joey.Id,
                Date = DateTime.Now.AddDays(-3),
                Time = DateTime.Now.AddHours(-5),
                Gender = "Female",
                Length = 12,
                Weight = 8
            });
        }


        public IResultsRepository Results
        {
            get
            {
                return results;
            }
            set
            {
                results = value;
            }
        }
    }
}
