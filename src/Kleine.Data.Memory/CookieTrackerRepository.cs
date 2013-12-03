using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Data.Memory
{
    public class CookieTrackerRepository : BaseRepository<CookieTracker>, ICookieTrackerRepository
    {
        public CookieTracker GetByUniqueKey(string unique)
        {
            throw new NotImplementedException();
        }
    }
}
