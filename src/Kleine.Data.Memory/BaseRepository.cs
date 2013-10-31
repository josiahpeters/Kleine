using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using ServiceStack.Common;

namespace Kleine.Data
{
    // Why did we add new() at the end? BECAUSE JON SKEET MAKES IT SO - http://stackoverflow.com/questions/3056863/class-mapping-error-t-must-be-a-non-abstract-type-with-a-public-parameterless
    public class BaseRepository<T> : IRepository<T> where T : Entity, new()
    {
        Dictionary<int, T> data = new Dictionary<int, T>();
        int id = 1;

        public BaseRepository()
        {
            
        }

        public T GetById(int Id)
        {
            if(data.ContainsKey(Id))
                return data[Id];
            else
                throw new Exception("Data record does not exist.");
        }

        public List<T> GetAll()
        {
            return data.Values.ToList();
        }

        public T Create(T entity)
        {
            entity.Id = id++;

            data.Add(entity.Id, entity);

            return entity;
        }

        public T Update(T entity)
        {
            var existing = GetById(entity.Id);

            existing.PopulateWith(entity);

            return existing;
        }
    }
}
