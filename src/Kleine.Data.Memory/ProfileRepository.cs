using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Data.Memory
{
    public class ProfileRepository : BaseMemoryRepository<Profile>, IProfileRepository
    {
        private InMemoryData data;

        public ProfileRepository(InMemoryData data)
            : base(data.ProfileData)
        {
            this.data = data;
        }

        public Profile GetByEmailAddress(string emailAddress)
        {
            return data.ProfileData.Values.FirstOrDefault(p => p.EmailAddress == emailAddress.ToLower());
        }

        public Profile GetByEmailCode(string code)
        {
            return data.ProfileData.Values.FirstOrDefault(p => p.EmailCode == code.ToLower());
        }
    }
}
