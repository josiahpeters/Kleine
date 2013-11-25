using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine
{
    public class Prediction : Entity
    {
        public int DueDateId { get; set; }

        public int ProfileId { get; set; }

        public string Gender { get; set; }

        public DateTime? Date { get; set; }

        public DateTime? Time { get; set; }

        public decimal Weight { get; set; }

        public decimal Length { get; set; }

        public string Name { get; set; }

        public DateTime FinishDate { get; set; }
    }
}
