using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine
{
    public class PredictionPlacement
    {
        public string Name { get; set; }

        public Prediction Prediction { get; set; }

        public PredictionScore Score { get; set; }

        public int Place { get; set; }
    }
}
