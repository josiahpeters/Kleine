using Funq;
using Kleine.Data;
using ServiceStack.Common.Web;
using ServiceStack.Logging;
using ServiceStack.Logging.EventLog;
using ServiceStack.OrmLite;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using ServiceStack.WebHost.Endpoints;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Kleine.Website
{
    public class AppHost : AppHostBase
    {
        public static INotification notify;

        // Initializes a new instance of your ServiceStack application, with the specified name and assembly containing the services.
        public AppHost() : base("Project Kleine", typeof(KleineServiceApi).Assembly) { }

        // Configure the container with the necessary routes for your ServiceStack application.
        public override void Configure(Container container)
        {
            LogManager.LogFactory = new EventLogFactory("Kleine", "Application");

            notify = new NotificationService();

            var dbFactory = new OrmLiteConnectionFactory("Kleine", SqlServerDialect.Provider);

            container.Register<IDbConnection>(dbFactory.OpenDbConnection());

            container.Register<IRepositories>(new SqlRepositories(dbFactory));
            container.Register<INotification>(notify);

            Plugins.Add(new SessionFeature());

            SetConfig(new EndpointHostConfig
            {
                ServiceStackHandlerFactoryPath = "api",
                ReturnsInnerException = true,
                DefaultContentType = ContentType.Json,
                EnableFeatures = Feature.Json | Feature.Metadata //Feature.Xml | Feature.Html

            });
        }
    }
}