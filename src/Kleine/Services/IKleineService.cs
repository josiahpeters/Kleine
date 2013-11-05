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
        DueDateGetAllResponse GetAllDueDate(DueDateGetAllRequest request);        
    }

    public class BaseResponse
    {
        public string ErrorMessage { get; set; }
    }

    public class EnumerableBaseResponse<T> : IEnumerable<T> where T : class
    {
        IEnumerable<T> enumerable;
        public EnumerableBaseResponse(IEnumerable<T> enumerable)
        {
            this.enumerable = enumerable;
        }
        public IEnumerator<T> GetEnumerator()
        {
            return enumerable.GetEnumerator();
        }
        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return enumerable.GetEnumerator();

        }
    }

    public class DueDateUpdateResponse : BaseResponse
    {
        public DueDate DueDate { get; set; }
    }

    [Route("/DueDate/Create")]
    public class DueDateCreateRequest : DueDate
    {

    }

    public class DueDateGetAllResponse : EnumerableBaseResponse<DueDate>
    {
        public DueDateGetAllResponse(IEnumerable<DueDate> items)
            : base(items)
        {
        }
    }

    [Route("/DueDate/")]
    public class DueDateGetAllRequest
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
