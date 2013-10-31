using Kleine.Services;
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

        public object CreateDueDate(DueDateCreateRequest request)
        {
            return service.CreateDueDate(request);
        }

        public object UpdateDueDate(DueDateUpdateRequest request)
        {
            return service.UpdateDueDate(request);
        }
    }
}