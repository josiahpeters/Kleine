using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine
{
    public class PredictionScore
    {
        public int Gender { get; set; }
        public int Date { get; set; }
        public int Time { get; set; }
        public int Weight { get; set; }
        public int Length { get; set; }

        public int Total
        {
            get
            {
                return Gender + Date + Time + Weight + Length;
            }
        }
    }
}
