using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine
{
    public class InviteCode : Entity
    {
        public int DueDateId { get; set; }

        public int ProfileId { get; set; }

        public string Code { get; set; }
    }
}
