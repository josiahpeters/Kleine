using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Data.Memory
{
    public class CookieTrackerRepository : BaseMemoryRepository<CookieTracker>, ICookieTrackerRepository
    {
        private InMemoryData data;

        public CookieTrackerRepository(InMemoryData data)
            : base(data.CookieTrackerData)
        {
            this.data = data;
        }

        public CookieTracker GetByUniqueKey(string unique)
        {
            return data.CookieTrackerData.Values.FirstOrDefault(p => p.Unique == unique.ToLower());
        }
    }
}
