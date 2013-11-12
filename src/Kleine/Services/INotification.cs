using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine
{
    public interface INotification
    {
        void SendNotification(string to, string subject, string message);
    }
}
