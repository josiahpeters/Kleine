using Funq;
using ServiceStack.WebHost.Endpoints;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kleine.Website
{
    public class AppHost : AppHostBase
    {
        // Initializes a new instance of your ServiceStack application, with the specified name and assembly containing the services.
        public AppHost() : base("Project Kleine", typeof(KleineServiceApi).Assembly) { }

        // Configure the container with the necessary routes for your ServiceStack application.
        public override void Configure(Container container)
        {
            ////Configure ServiceStack Json web services to return idiomatic Json camelCase properties.
            //JsConfig.EmitCamelCaseNames = true;

            ////Register Redis factory in Funq IoC. The default port for Redis is 6379.
            //container.Register<IRedisClientsManager>(new BasicRedisClientManager("localhost:6379"));

            ////Register user-defined REST Paths using the fluent configuration API
            //Routes
            //  .Add<Todo>("/todos")
            //  .Add<Todo>("/todos/{Id}");
        }
    }
}