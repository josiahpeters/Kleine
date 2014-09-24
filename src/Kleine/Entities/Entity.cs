using ServiceStack.DataAnnotations;
using ServiceStack.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine
{
    public class Entity : IHasId<int>
    {
        [AutoIncrement]
        public int Id { get; set; }
    }
}
