using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace Kleine.Data
{
    public class SqlRepositories : IRepositories
    {
        private IRepository<DueDate> dueDates;
        private IRepository<Profile> profile;
        private IRepository<Prediction> guesses;
        private IRepository<InviteCode> inviteCodes;
        private IRepository<CookieTracker> cookieTrackers;

        IDbConnection db;

        public SqlRepositories(IDbConnection db)
        {
            this.db = db;
            //IDbConnection db
            this.dueDates = new BaseSqlRepository<DueDate>(db);
        this.profile = new BaseSqlRepository<Profile>(db);
        this.guesses = new BaseSqlRepository<Prediction>(db);
        this.inviteCodes = new BaseSqlRepository<InviteCode>(db);
        this.cookieTrackers = new BaseSqlRepository<CookieTracker>(db);
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
