using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Data
{
    public interface IRepositories
    {
        IRepository<DueDate> DueDates { get; set; }
        IRepository<Profile> Profiles { get; set; }
        IRepository<Prediction> Predictions { get; set; }
        IRepository<InviteCode> InviteCodes { get; set; }
        IRepository<CookieTracker> CookieTrackers { get; set; }

        void SetUp();
    }
}
