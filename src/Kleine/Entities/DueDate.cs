using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine
{
    public class DueDate : Entity
    {
        public DateTime ExpectedDate { get; set; }

        public string BirthTitle { get; set; }

        public string BirthDescription { get; set; }
    }
}
