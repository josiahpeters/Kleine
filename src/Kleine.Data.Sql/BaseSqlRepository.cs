using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using ServiceStack.OrmLite;
using System.ComponentModel;

namespace Kleine.Data
{
    // Why did we add new() at the end? BECAUSE JON SKEET MAKES IT SO - http://stackoverflow.com/questions/3056863/class-mapping-error-t-must-be-a-non-abstract-type-with-a-public-parameterless
    public class BaseSqlRepository<T> : IRepository<T> where T : Entity, new()
    {
        protected OrmLiteConnectionFactory dbFactory;

        public BaseSqlRepository(OrmLiteConnectionFactory dbFactory)
        {
            this.dbFactory = dbFactory;
        }

        public T GetById(int Id)
        {
            using (var db = dbFactory.OpenDbConnection())
            {
                return db.GetById<T>(Id);
            }
        }

        public List<T> GetAll()
        {
            using (var db = dbFactory.OpenDbConnection())
            {
                return db.Select<T>();
            }
        }

        public T Create(T entity)
        {
            using (var db = dbFactory.OpenDbConnection())
            {
                db.Insert<T>(entity);

                entity.Id = (int)db.GetLastInsertId();
                return entity;
            }
        }

        public T Update(T entity)
        {
            using (var db = dbFactory.OpenDbConnection())
            {
                db.Update<T>(entity);

                return entity;
            }
        }
    }
}
