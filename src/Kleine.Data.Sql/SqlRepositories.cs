using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using ServiceStack.OrmLite;
using System.ComponentModel;
using Kleine.Data.Sql;

namespace Kleine.Data
{
    public class SqlRepositories : IRepositories
    {
        private IRepository<DueDate> dueDates;
        private IProfileRepository profile;
        private IPredictionRepository predictions;
        private ICookieTrackerRepository cookieTrackers;
        private IResultsRepository results;

        OrmLiteConnectionFactory dbFactory;

        public SqlRepositories(OrmLiteConnectionFactory dbFactory, IRepository<DueDate> dueDates, IProfileRepository profile, IPredictionRepository predictions, ICookieTrackerRepository cookieTrackers, IResultsRepository results)
        {
            this.dbFactory = dbFactory;
            
            this.dueDates = dueDates;
            this.profile = profile;
            this.predictions = predictions;
            this.cookieTrackers = cookieTrackers;
            this.results = results;
        }

        public void SetUp()
        {
            using (var db = dbFactory.OpenDbConnection())
            {
                if (!db.TableExists("DueDates"))
                {
                    db.CreateTable<DueDate>();

                    var dueDate = dueDates.Create(new DueDate
                    {
                        CouplesNames = "Katie and Zack",
                        CouplesEmailAddress = "kt.r.roberts@gmail.com,josiahpeters@gmail.com",
                        Name = "Baby Roberts",
                        BabyAlias = "Baby Roberts",
                        Title = "Baby  Roberts",
                        ExpectedDate = new DateTime(2014, 10, 16),
                        Description = "Baby  Roberts is coming soon!"
                    });
                }

                if (!db.TableExists("Profiles"))
                    db.CreateTable<Profile>();

                if (!db.TableExists("Predictions"))
                    db.CreateTable<Prediction>();

                if (!db.TableExists("CookieTrackers"))
                    db.CreateTable<CookieTracker>();                
            }
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
