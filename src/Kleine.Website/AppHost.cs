// determines whether we use SqlServer or in-memory storage - useful for running locally without SqlServer installed
//#define MEMORYSTORAGE

using Funq;
using Kleine.Data;
using Kleine.Data.Memory;
using Kleine.Data.Sql;
using Kleine.Services;
using ServiceStack;
using ServiceStack.Logging;
using ServiceStack.Logging.EventLog;
using ServiceStack.OrmLite;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Mime;

namespace Kleine.Website
{
    public class AppHost : AppHostBase
    {
        // used to store the proper url for sending links in email, we need to store data after Application_BeginRequest
        private static EnvironmentSettings environmentSettings = new EnvironmentSettings();
        public static EnvironmentSettings EnvironmentSettings
        {
            get { return AppHost.environmentSettings; }
            set { AppHost.environmentSettings = value; }
        }

        // singleton for in memory data storage
        public static InMemoryData data;

        // Initializes a new instance of your ServiceStack application, with the specified name and assembly containing the services.
        public AppHost() : base("Project Kleine", typeof(AppHost).Assembly) { }

        // Configure the container with the necessary routes for your ServiceStack application.
        public override void Configure(Container container)
        {
            // setup event logger
            //registerEventLogLogging(container);

            // setup email notifications with defaults
            registerNotifications(container);

            // determine datastore method
#if MEMORYSTORAGE
            // used for mocking database from dictionaries - need single "source" of each data type
            data = new InMemoryData();
            // register our data instance
            container.Register<InMemoryData>(data);
            container.Register<Dictionary<int, DueDate>>(data.DueDateData);
#else
            string connectionString = ConfigurationManager.ConnectionStrings["Kleine"].ConnectionString;
            container.Register<OrmLiteConnectionFactory>(c => new OrmLiteConnectionFactory(connectionString, SqlServerDialect.Provider));
#endif
            Plugins.Add(new KleinePlugin());

            // setup repositories with defaults if they don't exist


            Plugins.Add(new SessionFeature());

            //SetConfig(new EndpointHostConfig
            //{
            //    // only serve api requests from /api/
            //    ServiceStackHandlerFactoryPath = "api",
            //    ReturnsInnerException = true,
            //    DefaultContentType = ContentType.Json,
            //    EnableFeatures = Feature.Json | Feature.Metadata //Feature.Xml | Feature.Html
            //});

            SetConfig(new HostConfig
            {
                ReturnsInnerException = true,
                DebugMode = true,
                DefaultContentType = "application/json",
                EnableFeatures = Feature.Json | Feature.Metadata
            });
        }

        private void registerEventLogLogging(Funq.Container container)
        {
            string eventLogName = "Kleine.Website";
            string eventLogSource = "Application";

            LogManager.LogFactory = new EventLogFactory(eventLogSource, eventLogName);
            container.Register<ILog>(c => LogManager.LogFactory.GetLogger(""));
        }

        private void registerNotifications(Funq.Container container)
        {
            container.Register<EnvironmentSettings>(environmentSettings);
            container.RegisterAutoWiredAs<NotificationService, INotification>();
        }

        
    }
}