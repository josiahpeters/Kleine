using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Data.Memory
{
    public class PredictionRepository : BaseMemoryRepository<Prediction>, IPredictionRepository
    {
        private InMemoryData data;

        public PredictionRepository(InMemoryData data)
            : base(data.PredictionData)
        {
            this.data = data;
        }

        public Prediction GetByProfileIdAndDueDateId(int profileId, int dueDateId)
        {
            var prediction = data.PredictionData.Values.FirstOrDefault(p => p.ProfileId == profileId && p.DueDateId == dueDateId);

            if (prediction.Time != null)
            {
                var time = ((DateTime)prediction.Time);

                prediction.Time = time.ToLocalTime();
            }

            return prediction;
        }
    }
}
