using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Data
{
    public interface IRepositories
    {
        IRepository<DueDate> DueDates { get; set; }
        IProfileRepository Profiles { get; set; }
        IPredictionRepository Predictions { get; set; }
        ICookieTrackerRepository CookieTrackers { get; set; }

        void SetUp();
    }
}
