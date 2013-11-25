using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace Kleine
{
    public class Profile : Entity
    {
        //public Guid SessionId { get; set; }

        [IgnoreDataMember]
        public string EmailCode { get; set; }

        public string Name { get; set; }

        public string EmailAddress { get; set; }

    }    
}
