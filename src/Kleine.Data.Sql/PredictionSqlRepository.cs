using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Data.Sql
{
    public class PredictionSqlRepository : BaseSqlRepository<Prediction>, IPredictionRepository
    {
        public PredictionSqlRepository(OrmLiteConnectionFactory dbFactory) : base(dbFactory) { }


        public Prediction GetByProfileIdAndDueDateId(int profileId, int dueDateId)
        {
            throw new NotImplementedException();
        }
    }
}
