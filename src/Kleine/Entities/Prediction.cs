using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ServiceStack.DataAnnotations;
using System.ComponentModel.DataAnnotations;

namespace Kleine
{
    [Alias("Predictions")]
    public class Prediction : Entity
    {
        [References(typeof(DueDate))] 
        public int DueDateId { get; set; }

        [References(typeof(Profile))] 
        public int ProfileId { get; set; }

        [StringLength(40)]
        public string Gender { get; set; }

        public DateTime? Date { get; set; }

        public DateTime? Time { get; set; }

        public decimal Weight { get; set; }

        public decimal Length { get; set; }

        [StringLength(40)]
        public string Name { get; set; }

        public string Message { get; set; }

        public DateTime? FinishDate { get; set; }
    }
}
