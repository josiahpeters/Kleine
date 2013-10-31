using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Data
{
    public interface IRepository<T> where T : Entity
    {
        T GetById(int Id);
        List<T> GetAll();
        T Create(T entity);
        T Update(T entity);
    }
}
