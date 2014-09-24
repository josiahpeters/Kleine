using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace Kleine.Requests
{   

    // PROFILE
    [Route("/profile", "GET")]
    public class ProfileGet : IReturn<ProfilePrediction>
    {
        public string code { get; set; }
    }

    [Route("/profile", "POST")]
    public class ProfileCreate : Profile, IReturn<ProfilePrediction> { }

    [Route("/profile", "PUT")]
    public class ProfileUpdate : Profile, IReturn<ProfilePrediction> { }    

    
}
