using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using ServiceStack.OrmLite;

namespace Kleine.Data
{
    // Why did we add new() at the end? BECAUSE JON SKEET MAKES IT SO - http://stackoverflow.com/questions/3056863/class-mapping-error-t-must-be-a-non-abstract-type-with-a-public-parameterless
    public class BaseSqlRepository<T> : IRepository<T> where T : Entity, new()
    {
        IDbConnection db;

        public BaseSqlRepository(IDbConnection db)
        {
            this.db = db;
        }

        public T GetById(int Id)
        {
            return db.GetById<T>(Id);
        }

        public List<T> GetAll()
        {
            return db.Select<T>();
        }

        public T Create(T entity)
        {
            db.Insert<T>(entity);

            entity.Id = (int)db.GetLastInsertId();
            return entity;
        }

        public T Update(T entity)
        {
            db.Update<T>(entity);

            return entity;
        }
    }
}
