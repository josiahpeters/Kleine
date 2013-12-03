using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Data.Sql
{
    public class CookieTrackerSqlRepository : BaseSqlRepository<CookieTracker>, ICookieTrackerRepository
    {
        public CookieTrackerSqlRepository(OrmLiteConnectionFactory dbFactory) : base(dbFactory) { }

        public CookieTracker GetByUniqueKey(string unique)
        {
            using (var db = dbFactory.OpenDbConnection())
            {
                return db.Select<CookieTracker>(p => p.Unique == unique.ToLower()).FirstOrDefault();
            }
        }
    }
}
