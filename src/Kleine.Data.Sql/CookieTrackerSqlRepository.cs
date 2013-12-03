using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Data.Sql
{
    public class CookieTrackerSqlRepository : BaseSqlRepository<CookieTracker>, ICookieTrackerRepository
    {
        public CookieTracker GetByUniqueKey(string unique)
        {
            throw new NotImplementedException();
        }

        public new CookieTracker GetById(int Id)
        {
            throw new NotImplementedException();
        }

        public new List<CookieTracker> GetAll()
        {
            throw new NotImplementedException();
        }

        public CookieTracker Create(CookieTracker entity)
        {
            throw new NotImplementedException();
        }

        public CookieTracker Update(CookieTracker entity)
        {
            throw new NotImplementedException();
        }
    }
}
