using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace Kleine
{
    public class ProfilePrediction
    {
        [DataMember]
        public Profile Profile { get; set; }

        [DataMember]
        public Prediction Prediction { get; set; }

        [DataMember]
        public PredictionScore PredictionScore { get; set; }

        public ProfilePrediction() { }
        public ProfilePrediction(Profile profile)
        {
            this.Profile = profile;
            this.Prediction = null;
        }
        public ProfilePrediction(Profile profile, Prediction prediction, PredictionScore predictionScore = null)
        {
            this.Profile = profile;
            this.Prediction = prediction;
            this.PredictionScore = predictionScore;
        }
    }
}
