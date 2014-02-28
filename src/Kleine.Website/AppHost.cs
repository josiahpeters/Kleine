using Funq;
using Kleine.Data;
using Kleine.Data.Memory;
using Kleine.Data.Sql;
using Kleine.Services;
using ServiceStack.Common.Web;
using ServiceStack.Logging;
using ServiceStack.Logging.EventLog;
using ServiceStack.OrmLite;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using ServiceStack.WebHost.Endpoints;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;

namespace Kleine.Website
{
    public class AppHost : AppHostBase
    {
        public static INotification notify;
        public static InMemoryData data;

        // Initializes a new instance of your ServiceStack application, with the specified name and assembly containing the services.
        public AppHost() : base("Project Kleine", typeof(KleineServiceApi).Assembly) { }

        // Configure the container with the necessary routes for your ServiceStack application.
        public override void Configure(Container container)
        {
            LogManager.LogFactory = new EventLogFactory("Kleine", "Application");

            registerNotifications(container);
            
            // comment out one of the below to swap data stores
            //registerInMemoryStore(container);
            registerSqlDataStore(container);

            // setup repositories with defaults if they don't exist
            container.Resolve<IRepositories>().SetUp();

            Plugins.Add(new SessionFeature());

            SetConfig(new EndpointHostConfig
            {
                // only serve api requests from /api/
                ServiceStackHandlerFactoryPath = "api",
                ReturnsInnerException = true,
                DefaultContentType = ContentType.Json,
                EnableFeatures = Feature.Json | Feature.Metadata //Feature.Xml | Feature.Html
            });
        }

        private void registerNotifications(Funq.Container container)
        {
            notify = new NotificationService();
            // register static "singleton" services
            container.Register<INotification>(notify);
        }

        private void registerInMemoryStore(Funq.Container container)
        {
            // used for mocking database from dictionaries - need single "source" of each data type
            data = new InMemoryData();
            // register our data instance
            container.Register<InMemoryData>(data);            
            container.Register<Dictionary<int, DueDate>>(data.DueDateData);

            // register repositories and autowire their dependencies
            container.RegisterAutoWiredAs<BaseMemoryRepository<DueDate>, IRepository<DueDate>>();
            container.RegisterAutoWiredAs<ProfileRepository, IProfileRepository>();
            container.RegisterAutoWiredAs<PredictionRepository, IPredictionRepository>();
            container.RegisterAutoWiredAs<CookieTrackerRepository, ICookieTrackerRepository>();
            container.RegisterAutoWiredAs<ResultsRepository, IResultsRepository>();

            container.RegisterAutoWiredAs<MemoryRepositories, MemoryRepositories>();
            container.RegisterAutoWiredAs<MemoryRepositories, IRepositories>();
        }

        private void registerSqlDataStore(Funq.Container container)
        {
            string connectionString = ConfigurationManager.ConnectionStrings["Kleine"].ConnectionString;

            container.Register<OrmLiteConnectionFactory>(c => new OrmLiteConnectionFactory(connectionString, SqlServerDialect.Provider));

            // register each individual repository
            container.RegisterAutoWiredAs<BaseSqlRepository<DueDate>, IRepository<DueDate>>();
            container.RegisterAutoWiredAs<ProfileSqlRepository, IProfileRepository>();
            container.RegisterAutoWiredAs<PredictionSqlRepository, IPredictionRepository>();
            container.RegisterAutoWiredAs<CookieTrackerSqlRepository, ICookieTrackerRepository>();
            container.RegisterAutoWiredAs<ResultsSqlRepository, IResultsRepository>();
            // register the main repository that has a reference to each repository
            container.RegisterAutoWiredAs<SqlRepositories, IRepositories>();
        }
    }
}