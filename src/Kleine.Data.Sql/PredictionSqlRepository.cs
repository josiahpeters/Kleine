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
            using (var db = dbFactory.OpenDbConnection())
            {
                var prediction = db.Select<Prediction>(p => p.ProfileId == profileId && p.DueDateId == dueDateId).FirstOrDefault();

                if(prediction.Time != null)
                {
                    var time = ((DateTime)prediction.Time);

                    prediction.Time = time.ToLocalTime();
                }

                return prediction;
            }
        }
    }
}
