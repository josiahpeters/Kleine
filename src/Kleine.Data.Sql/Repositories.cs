﻿using System;
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

        public SqlRepositories(OrmLiteConnectionFactory dbFactory)
        {
            this.dbFactory = dbFactory;
            //IDbConnection db
            this.dueDates = new BaseSqlRepository<DueDate>(this.dbFactory);
            this.profile = new ProfileSqlRepository(this.dbFactory);
            this.predictions = new PredictionSqlRepository(this.dbFactory);
            this.cookieTrackers = new CookieTrackerSqlRepository(this.dbFactory);
            this.results = new ResultsSqlRepository(this.dbFactory);
        }

        public void SetUp()
        {
            using (var db = dbFactory.OpenDbConnection())
            {
                db.DropTable<CookieTracker>();
                db.DropTable<Prediction>();
                db.DropTable<Profile>();
                db.DropTable<DueDate>();

                db.CreateTable<DueDate>();
                db.CreateTable<Profile>();
                db.CreateTable<Prediction>();
                db.CreateTable<CookieTracker>();

                var dueDate = dueDates.Create(new DueDate
                {
                    Name = "BabyP",
                    Title = "BabyP",
                    ExpectedDate = new DateTime(2013, 12, 16),
                    Description = "Baby P is coming soon!"
                });
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
