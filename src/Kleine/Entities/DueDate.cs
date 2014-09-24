using ServiceStack.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine
{
    [Alias("DueDates")]
    public class DueDate : Entity
    {
        public DateTime ExpectedDate { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(100)]
        public string Title { get; set; }

        [StringLength(250)]
        public string Description { get; set; }
    }
}
