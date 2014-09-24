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

        public List<GenderResult> GetGenderResult()
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
                var results = db.Select<GenderResult>(query);

                return results;
            }    
        }


        public List<DateTimeCount> GetDateCounts(string gender = null)
        {
            using (var db = dbFactory.OpenDbConnection())
            {
                string query = @"
SELECT 
	COUNT(Date) as Count, Date
FROM	
	Predictions
WHERE 
	{0} 
    Time IS NOT NULL 
	AND FinishDate IS NOT NULL
GROUP BY 
	Date,
	DATEPART(DAY, Date)	
ORDER BY 
	Date
";
                string genderFilter = "";

                if (!string.IsNullOrWhiteSpace(gender))
                    genderFilter = " GENDER = @Gender AND ";

                var results = db.Select<DateTimeCount>(string.Format(query, genderFilter), new { Gender = gender });

                return results;
            } 
        }

        public List<DateTimeCount> GetTimeCounts(string gender = null)
        {
            using (var db = dbFactory.OpenDbConnection())
            {
                string query = @"
SELECT 
	COUNT(Time) as Count, Time as Date
FROM	
	(SELECT 
		DATEADD (
			HOUR, 
			DATEPART(HOUR, Time), 
			CAST('12/16/2013' AS DATETIME)
		) AS Time
	FROM (
		SELECT DATEADD(HOUR, -8, time) as Time 
		FROM Predictions 
		WHERE 
			{0} 
            Time IS NOT NULL 
			AND FinishDate IS NOT NULL) localTime
	) AS normalizedHours
	
GROUP BY 
	Time,
	DATEPART(HOUR, Time)	
";
                string genderFilter = "";

                if(!string.IsNullOrWhiteSpace(gender))
                    genderFilter = " GENDER = @Gender AND ";

                var results = db.Select<DateTimeCount>(string.Format(query, genderFilter), new { Gender = gender });

                return results;
            } 
        }

        public List<IntegerGroupCount> GetWeightCounts(string gender = null)
        {
            using (var db = dbFactory.OpenDbConnection())
            {
                string query = @"
SELECT 
	COUNT(weight) As Count,
	weight as Value
FROM
	(
	SELECT 
		FLOOR (weight) as weight 
	FROM Predictions
	WHERE 
			{0} 
			Time IS NOT NULL 
			AND FinishDate IS NOT NULL
	) weightGroup
group by weight	
";
                string genderFilter = "";

                if (!string.IsNullOrWhiteSpace(gender))
                    genderFilter = " GENDER = @Gender AND ";

                var results = db.Select<IntegerGroupCount>(string.Format(query, genderFilter), new { Gender = gender });

                return results;
            }
        }

        public List<IntegerGroupCount> GetLengthCounts(string gender = null)
        {
            using (var db = dbFactory.OpenDbConnection())
            {
                string query = @"
SELECT 
	COUNT(Length) As Count,
	Length as Value
FROM
	(
	SELECT 
		FLOOR (Length) as Length 
	FROM Predictions
	WHERE 
			{0} 
			Time IS NOT NULL 
			AND FinishDate IS NOT NULL
	) lengthGroup
group by Length	
";
                string genderFilter = "";

                if (!string.IsNullOrWhiteSpace(gender))
                    genderFilter = " GENDER = @Gender AND ";

                var results = db.Select<IntegerGroupCount>(string.Format(query, genderFilter), new { Gender = gender });

                return results;
            }
        }
    }
}


