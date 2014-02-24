using Kleine.Requests;
using ServiceStack.ServiceHost;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Services
{
    public interface IKleineService
    {
        ProfilePrediction Get(ProfileGet request);

        ProfilePrediction Post(ProfileCreate request);

        ProfilePrediction Put(ProfileUpdate request);

        ProfilePrediction Put(PredictionUpdate request);

        ResultsAggregate Get(ResultsRequest request);

        List<PredictionPlacement> Get(RankingsRequest request);
    }
}
