using ServiceStack.DataAnnotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace Kleine
{
    [Alias("CookieTrackers")]
    public class CookieTracker : Entity
    {
        [References(typeof(Profile))] 
        public int ProfileId { get; set; }

        [StringLength(64)]
        public string Unique { get; set; }
    }
}
