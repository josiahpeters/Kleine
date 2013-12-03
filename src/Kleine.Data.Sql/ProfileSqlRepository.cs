using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Data.Sql
{
    public class ProfileSqlRepository : BaseSqlRepository<Profile>, IProfileRepository
    {
        public ProfileSqlRepository(OrmLiteConnectionFactory dbFactory) : base(dbFactory) { }

        public Profile GetByEmailAddress(string emailAddress)
        {
            using (var db = dbFactory.OpenDbConnection())
            {
                return db.Select<Profile>(p => p.EmailAddress == emailAddress.ToLower()).FirstOrDefault();
            }
        }
    }
}
