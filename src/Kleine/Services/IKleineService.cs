using ServiceStack.ServiceHost;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Services
{
    public interface IKleineService
    {
        DueDateCreateResponse CreateDueDate(DueDateCreateRequest request);
        DueDateUpdateResponse UpdateDueDate(DueDateUpdateRequest request);
    }

    public class BaseResponse
    {
        public string ErrorMessage { get; set; }
    }

    public class DueDateUpdateResponse : BaseResponse
    {
        public DueDate DueDate { get; set; }
    }

    [Route("/DueDate/Create")]
    public class DueDateCreateRequest : DueDate
    {

    }


    public class DueDateCreateResponse : BaseResponse
    {
        public DueDate DueDate { get; set; }

    }

    [Route("/DueDate/Update")]
    public class DueDateUpdateRequest : DueDate
    {

    }

    
}
