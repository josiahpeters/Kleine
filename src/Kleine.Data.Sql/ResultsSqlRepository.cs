using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Data.Sql
{
    public class ResultsSqlRepository : IResultsRepository
    {
        protected OrmLiteConnectionFactory dbFactory;

        public ResultsSqlRepository(OrmLiteConnectionFactory dbFactory)
        {
            this.dbFactory = dbFactory;
        }

        public List<Result> GetGenderResult()
        {
            using (var db = dbFactory.OpenDbConnection())
            {
                string query = @"
SELECT COUNT(gender) Count, Gender,
CAST( AVG( CAST( [Date] AS DECIMAL( 18, 6 ) ) ) AS DATETIME ) Date,
CAST( AVG( CAST( [time] AS DECIMAL( 18, 6 ) ) ) AS DATETIME ) Time,
    AVG(weight) Weight,
    AVG(length) Length
FROM Predictions  
	WHERE finishdate is not null
    GROUP BY gender
";
                var results = db.Query<Result>(query);

                return results;
            }    
        }
    }
}
