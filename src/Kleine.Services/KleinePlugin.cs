//#define MEMORYSTORAGE

using Kleine.Data;
using Kleine.Data.Memory;
using Kleine.Data.Sql;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;

namespace Kleine.Services
{
    public class KleinePlugin : IPlugin
    {
        public void Register(IAppHost appHost)
        {
            var container = appHost.GetContainer();

#if MEMORYSTORAGE
            registerInMemoryStore(container);
#else
            registerSqlDataStore(container);
#endif

            container.Resolve<IRepositories>().SetUp();
            var repo = container.Resolve<IRepositories>();
            var notify = container.Resolve<INotification>();

            appHost.RegisterService<KleineServiceApi>("");
        }

        private void registerInMemoryStore(Funq.Container container)
        {
            // register repositories and autowire their dependencies
            container.RegisterAutoWiredAs<BaseMemoryRepository<DueDate>, IRepository<DueDate>>();
            container.RegisterAutoWiredAs<ProfileRepository, IProfileRepository>();
            container.RegisterAutoWiredAs<PredictionRepository, IPredictionRepository>();
            container.RegisterAutoWiredAs<CookieTrackerRepository, ICookieTrackerRepository>();
            container.RegisterAutoWiredAs<ResultsRepository, IResultsRepository>();

            container.RegisterAutoWiredAs<MemoryRepositories, IRepositories>();
            container.RegisterAutoWiredAs<MemoryRepositories, MemoryRepositories>();
        }

        private void registerSqlDataStore(Funq.Container container)
        {
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
