using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kleine.Data.Memory
{
    public class InMemoryData
    {
        private Dictionary<int, Profile> profileData = new Dictionary<int, Profile>();

        public Dictionary<int, Profile> ProfileData
        {
            get { return profileData; }
            set { profileData = value; }
        }

        private Dictionary<int, Prediction> predictionData = new Dictionary<int, Prediction>();

        public Dictionary<int, Prediction> PredictionData
        {
            get { return predictionData; }
            set { predictionData = value; }
        }

        private Dictionary<int, DueDate> dueDateData = new Dictionary<int, DueDate>();

        public Dictionary<int, DueDate> DueDateData
        {
            get { return dueDateData; }
            set { dueDateData = value; }
        }

        private Dictionary<int, CookieTracker> cookieTrackerData = new Dictionary<int, CookieTracker>();

        public Dictionary<int, CookieTracker> CookieTrackerData
        {
            get { return cookieTrackerData; }
            set { cookieTrackerData = value; }
        }
    }
}
