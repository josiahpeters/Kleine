using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Data
{
    public class Repositories : IRepositories
    {
        private IRepository<DueDate> dueDates = new BaseRepository<DueDate>();
        private IRepository<GuessProfile> guessProfile = new BaseRepository<GuessProfile>();

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

        public IRepository<GuessProfile> GuessProfiles
        {
            get
            {
                return guessProfile;
            }
            set
            {
                guessProfile = value;
            }
        }
    }
}
