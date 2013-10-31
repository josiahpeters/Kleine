using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using ServiceStack.OrmLite;

namespace Kleine.Data
{
    public class BaseRepository<T> : IRepository<T> where T : Entity
    {
        IDbConnection db;
    

        public BaseRepository(IDbConnection db)
        {
            this.db = db;
        }

        public T GetById(int Id)
        {
            return db.GetById<T>(Id);
        }

        public List<T> GetAll()
        {
            throw new NotImplementedException();
        }

        public T Create(T entity)
        {
            throw new NotImplementedException();
        }

        public T Update(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
