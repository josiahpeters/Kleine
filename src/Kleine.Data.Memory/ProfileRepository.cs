using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Data.Memory
{
    public class ProfileRepository : BaseRepository<Profile>, IProfileRepository
    {
        public Profile GetByEmailAddress(string p)
        {
            throw new NotImplementedException();
        }


        public Profile GetByEmailCode(string code)
        {
            throw new NotImplementedException();
        }
    }
}
