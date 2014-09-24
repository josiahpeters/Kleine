using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Requests
{
    // RESULTS
    [Route("/results", "GET")]
    public class ResultsRequest : IReturn<ResultsAggregate>
    {
    }

    [Route("/results/rankings", "GET")]
    public class RankingsRequest : IReturn<List<PredictionPlacement>>
    {
    }
}
