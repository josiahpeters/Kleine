using ServiceStack.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Entities
{
    public class Entity
    {
        [AutoIncrement]
        public int Id { get; set; }
    }
}
