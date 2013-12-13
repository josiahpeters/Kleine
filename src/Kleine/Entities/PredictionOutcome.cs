using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine
{
    public class PredictionOutcome
    {
        public string Gender { get; set; }

        public DateTime Date { get; set; }

        public DateTime Time { get; set; }

        public decimal Weight { get; set; }

        public decimal Length { get; set; }
    }
}
