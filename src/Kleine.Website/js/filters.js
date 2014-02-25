angular.module('kleine.filters', [])
.filter('hours', function ()
{
    return function (input, uppercase)
    {
        if (typeof (input) == "string")
        {
            input = new Date(parseInt(input.substr(6)));
        }

        if (typeof (input) == "object")
        {
            var hours = input.getHours();
            var time = "am";

            if (hours > 12)
                time = "pm";

            var hour = Math.floor(hours % 12);

            if (hour == 0)
                hour = 12;

            var minutes = input.getMinutes();

            if (minutes < 10)
                minutes = '0' + minutes;

            return hour + ':' + minutes + ' ' + time;
        }
        return input;
    }
})
.filter('hoursFour', function ()
{
    return function (input)
    {

        if (typeof (input) == "object")
        {
            input.setHours(input.getHours() + 4);
            return input;
        }
    }
})
.filter('ssDate', function ()
{
    return function (input)
    {
        if (typeof (input) == "string")
        {
            return new Date(parseInt(input.substr(6)));
        }
        else
            return input;
    }
})
.filter('date', function ()
{
    return function (input)
    {
        if (typeof (input) == "object")
        {
            return (input.getMonth() + 1) + '/' + input.getDate() + '/' + input.getFullYear();

        }
        return input;
    }
})
.filter('day', function ()
{
    return function (input, uppercase)
    {
        if (typeof (input) == "object")
        {
            var m_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            var d = new Date(input);
            var curr_date = d.getDate();
            var sup = "";
            if (curr_date == 1 || curr_date == 21 || curr_date == 31)
            {
                sup = "st";
            }
            else if (curr_date == 2 || curr_date == 22)
            {
                sup = "nd";
            }
            else if (curr_date == 3 || curr_date == 23)
            {
                sup = "rd";
            }
            else
            {
                sup = "th";
            }

            var curr_month = d.getMonth();
            var curr_year = d.getFullYear();

            return (m_names[curr_month] + " " + curr_date + sup + ", " + curr_year);
        }
        return input;
    }
});