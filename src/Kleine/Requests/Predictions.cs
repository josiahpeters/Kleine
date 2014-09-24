using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Requests
{
    // GUESS
    [Route("/predict/{DueDateId}", "GET")]
    public class PredictionGet : IReturn<Prediction>
    {
        public int DueDateId { get; set; }
        //public int ProfileId { get; set; }
    }

    [Route("/predict", "PUT")]
    public class PredictionUpdate : Prediction, IReturn<ProfilePrediction> { }
}
