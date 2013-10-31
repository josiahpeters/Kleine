using Kleine.Services;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kleine.Website
{
    public class KleineServiceApi : Service
    {
        IKleineService service = new KleineService();

        public object Any(DueDateCreateRequest request)
        {
            return service.CreateDueDate(request);
        }

        public object Any(DueDateUpdateRequest request)
        {
            return service.UpdateDueDate(request);
        }
    }
}