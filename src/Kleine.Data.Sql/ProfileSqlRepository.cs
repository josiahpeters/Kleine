using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Data.Sql
{
    public class ProfileSqlRepository : BaseSqlRepository<Profile>, IProfileRepository
    {
        public Profile GetByEmailAddress(string p)
        {
            throw new NotImplementedException();
        }
    }
}
