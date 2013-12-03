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
        private IPredictionRepository guesses;
        private ICookieTrackerRepository cookieTrackers;

        OrmLiteConnectionFactory dbFactory;

        public SqlRepositories(OrmLiteConnectionFactory dbFactory)
        {
            this.dbFactory = dbFactory;
            //IDbConnection db
            this.dueDates = new BaseSqlRepository<DueDate>(this.dbFactory);
            this.profile = new ProfileSqlRepository(this.dbFactory);
            this.guesses = new PredictionSqlRepository(this.dbFactory);
            this.cookieTrackers = new CookieTrackerSqlRepository(this.dbFactory);
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

        public IRepository<Profile> Profiles
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


        public IRepository<Prediction> Predictions
        {
            get
            {
                return guesses;
            }
            set
            {
                guesses = value;
            }
        }


        public IRepository<InviteCode> InviteCodes
        {
            get
            {
                return inviteCodes;
            }
            set
            {
                inviteCodes = value;
            }
        }

        public IRepository<CookieTracker> CookieTrackers
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
    }
}
