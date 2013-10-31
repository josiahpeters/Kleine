using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Services
{
    public class GuessGender
    {
        public Gender GuessValue { get; set; }
    }

    public class GuessBirthDate
    {
        public DateTime GuessValue { get; set; }
    }

    public class GuessBirthTime
    {
        public DateTime GuessValue { get; set; }
    }

    public class GuessBirthWeight
    {
        public Decimal GuessValue { get; set; }
    }

    public class GuessBirthLength
    {
        public Decimal GuessValue { get; set; }
    }

    public class GuessBirthName
    {
        public string GuessValue { get; set; }
    }

    
    

    

    //public abstract class GuessType
    //{
    //    abstract public string Name { get; set; }

    //    abstract public string Description { get; set; }

    //    abstract public Type DataType { get; }

    //    abstract public object Value { get; set; }
    //}


    //public class GuessGender : GuessType
    //{
    //    public override string Name { get; set; }

    //    public override string Description { get; set; }



    //    public override Type DataType
    //    {
    //        get
    //        {
    //            return typeof(Gender);
    //        }
    //    }
    //}

    //public class GuessBirthDate : GuessType
    //{
    //    public override string Name { get; set; }

    //    public override string Description { get; set; }

    //    public override Type DataType
    //    {
    //        get
    //        {
    //            return typeof(DateTime);
    //        }
    //    }
    //}

    //public class GuessBirthTime : GuessType
    //{
    //    public override string Name { get; set; }

    //    public override string Description { get; set; }

    //    public override Type DataType
    //    {
    //        get
    //        {
    //            return typeof(DateTime);
    //        }
    //    }
    //}

    //public class GuessBirthWeight : GuessType
    //{
    //    public override string Name { get; set; }

    //    public override string Description { get; set; }

    //    public override Type DataType
    //    {
    //        get
    //        {
    //            return typeof(Decimal);
    //        }
    //    }
    //}

    //public class GuessBirthWeight : GuessType
    //{
    //    public override string Name { get; set; }

    //    public override string Description { get; set; }

    //    public override Type DataType
    //    {
    //        get
    //        {
    //            return typeof(Decimal);
    //        }
    //    }
    //}


    public enum Gender
    {
        Male,
        Female
    }
}
