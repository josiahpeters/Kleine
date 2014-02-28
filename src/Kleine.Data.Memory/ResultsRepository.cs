using Kleine.Data.Memory;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Data.Memory
{
    public class ResultsRepository : IResultsRepository
    {
        private InMemoryData data;

        private List<Prediction> d;

        public ResultsRepository(InMemoryData data)
        {
            this.data = data;
            d = data.PredictionData.Values.ToList();
        }

        public List<GenderResult> GetGenderResult()
        {
            // ghetto way of handling this, but it works...
            var maleData = d.Where(g => g.Gender == "Male");
            var femaleData = d.Where(g => g.Gender == "Female");

            GenderResult maleResult = maleData.Select(x => new GenderResult { Count = maleData.Count(), Gender = "Male", Date = new DateTime((long)maleData.Average(p => p.Date.Value.Ticks)), Time = new DateTime((long)maleData.Average(p => p.Time.Value.Ticks)), Length = maleData.Average(p => p.Length), Weight = maleData.Average(p => p.Weight) }).FirstOrDefault();
            GenderResult femaleResult = femaleData.Select(x => new GenderResult {Count = femaleData.Count(), Gender = "Female", Date = new DateTime((long)femaleData.Average(p => p.Date.Value.Ticks)), Time = new DateTime((long)femaleData.Average(p => p.Time.Value.Ticks)), Length = femaleData.Average(p => p.Length), Weight = femaleData.Average(p => p.Weight)}).FirstOrDefault();

            return new List<GenderResult>{ maleResult, femaleResult };
        }


        public List<DateTimeCount> GetDateCounts(string gender = null)
        {
            // doesn't take into account days outside of the month. works for our target due date but not for anyone else :-/
            if (gender != null)
                d = d.Where(g => g.Gender == gender).ToList();

            var days = d.GroupBy(g => g.Date.Value.Day).Select(x => new DateTimeCount { Count = x.Count(), Date = new DateTime(2013,12, x.Key) });

            return days.ToList();
        }

        public List<DateTimeCount> GetTimeCounts(string gender = null)
        {
            if (gender != null)
                d = d.Where(g => g.Gender == gender).ToList();

            var days = d.GroupBy(g => g.Time.Value.Hour).Select(x => new DateTimeCount { Count = x.Count(), Date = new DateTime(2013, 1, 1, x.Key, 0, 0) });

            return days.ToList();
        }

        public List<IntegerGroupCount> GetWeightCounts(string gender = null)
        {
            if (gender != null)
                d = d.Where(g => g.Gender == gender).ToList();

            var weights = d.GroupBy(g => (int)Math.Floor(g.Weight)).Select(x => new IntegerGroupCount { Count = x.Count(), Value = x.Key });

            return weights.ToList();
        }

        public List<IntegerGroupCount> GetLengthCounts(string gender = null)
        {
            if (gender != null)
                d = d.Where(g => g.Gender == gender).ToList();

            var lengths = d.GroupBy(g => (int)Math.Floor(g.Weight)).Select(x => new IntegerGroupCount { Count = x.Count(), Value = x.Key });

            return lengths.ToList();
        }
    }
}


