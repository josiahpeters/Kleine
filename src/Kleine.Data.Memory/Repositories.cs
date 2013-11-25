using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Data
{
    public class Repositories : IRepositories
    {
        private IRepository<DueDate> dueDates = new BaseRepository<DueDate>();
        private IRepository<Profile> profile = new BaseRepository<Profile>();
        private IRepository<Prediction> guesses = new BaseRepository<Prediction>();
        private IRepository<InviteCode> inviteCodes = new BaseRepository<InviteCode>();
        private IRepository<CookieTracker> cookieTrackers = new BaseRepository<CookieTracker>();
        
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
