using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine
{
    public class DueDate : Entity
    {
        public DateTime ExpectedDate { get; set; }

        public string Name { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }
    }
}
