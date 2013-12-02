using ServiceStack.DataAnnotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace Kleine
{
    [Alias("Profiles")]
    public class Profile : Entity
    {
        //public Guid SessionId { get; set; }

        [IgnoreDataMember]
        [StringLength(64)]
        public string EmailCode { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(320)]
        public string EmailAddress { get; set; }

    }    
}
