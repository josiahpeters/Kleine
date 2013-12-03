using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Data.Memory
{
    public class PredictionRepository : BaseRepository<Prediction>, IPredictionRepository
    {
        public Prediction GetByProfileIdAndDueDateId(int profileId, int dueDateId)
        {
            throw new NotImplementedException();
        }
    }
}
