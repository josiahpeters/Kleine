using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace Kleine
{
    public class ResultsAggregate
    {
        [DataMember]
        public List<GenderResult> GenderResults { get; set; }

        [DataMember]
        public List<GenderDateTimeCount> DateCounts { get; set; }

        [DataMember]
        public List<GenderDateTimeCount> TimeCounts { get; set; }

        [DataMember]
        public List<GenderIntegerGroupCount> WeightCounts { get; set; }

        [DataMember]
        public List<GenderIntegerGroupCount> LengthCounts { get; set; }
        public ResultsAggregate() { }

        public ResultsAggregate(List<GenderResult> genderResults, List<GenderDateTimeCount> dateCounts, List<GenderDateTimeCount> timeCounts, List<GenderIntegerGroupCount> weightCounts, List<GenderIntegerGroupCount> lengthCounts)
        {
            this.GenderResults = genderResults;
            this.DateCounts = dateCounts;
            this.TimeCounts = timeCounts;
            this.WeightCounts = weightCounts;
            this.LengthCounts = lengthCounts;
        }
    }
}
