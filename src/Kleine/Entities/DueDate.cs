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
        public DateTime DeliveredDate { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(100)]
        public string Title { get; set; }

        [StringLength(250)]
        public string Description { get; set; }

        [StringLength(100)]
        public string CouplesNames { get; set; }

        [StringLength(320)]
        public string CouplesEmailAddress { get; set; }

        [StringLength(100)]
        public string BabyAlias { get; set; }

        [StringLength(100)]
        public string BabyName { get; set; }

        public string WelcomeMessage { get; set; }
        public string ThankYouMessage { get; set; }

        public string EmailGreeting { get; set; }

        public string DateFact { get; set; }
        public string GenderFact { get; set; }
        public string LengthFact { get; set; }
        public string TimeFact { get; set; }
        public string WeightFact { get; set; }


    }
}
