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

    public class DueDateUpdateResponse : BaseResponse, IReturn<DueDate>
    {

    }

    public class DueDateCreateRequest : DueDate
    {

    }


    public class DueDateCreateResponse : BaseResponse, IReturn<DueDate>
    {

    }

    public class DueDateUpdateRequest : DueDate
    {

    }

    
}
