﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Data
{
    public interface IRepositories
    {
        IRepository<DueDate> DueDates { get; set; }
        IRepository<GuessProfile> GuessProfiles { get; set; }
    }
}