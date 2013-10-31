using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine
{
    public class GuessProfile : Entity
    {
        public Guid SessionId { get; set; }

        public string EmailAddress { get; set; }

        public string Name { get; set; }
    }    
}
