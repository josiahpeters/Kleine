var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // Names of months for drop-down and formatting
var monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; // For formatting
var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; // For formatting
var dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // For formatting
var dayNamesMin = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]; // Column headings for days starting at Sunday

$(document).ready(function () {
    createCalendar();

    createHours();

    // custom eval function to convert our range numbers into pounds
    $("#weightSlider").rangeSlider({ min: 16, max: 208, range: 16, unitConversion: function (value) { return (value / 16).toFixed(1) + " lbs"; } });
    $("#lengthSlider").rangeSlider({ min: 15, max: 41, range: 2, unitConversion: function (value) { return (value).toFixed(1) + " in"; } });


    $(window).resize(function () {
        $("#weightSlider").rangeSlider("resize");
        $("#lengthSlider").rangeSlider("resize");
    });

    $("a.section").click(function () {
        var id = $(this).attr("href");

        $(".sections .panel:not(" + id + ")").hide();

        $(id).fadeIn();

        //$(".sections > .panel")

        //.fadeOut({
        //    done: function ()
        //    {
        //        $(id).fadeIn();

        //    }
        //});

    });

});


function createCalendar() {
    var weeksBeforeExpectedDate = 3;
    var weeksAfterExpectedDate = 3;

    var expectedDate = new Date("12/16/2013");

    var expectedYear = expectedDate.getFullYear();
    var expectedMonth = expectedDate.getMonth();
    var expectedMonthDate = expectedDate.getDate();
    var expectedDayOfWeek = expectedDate.getDay();

    var calendarStartDay = expectedMonthDate;

    if (expectedDayOfWeek > 0)
        calendarStartDay = expectedMonthDate - expectedDayOfWeek;

    // start the calendar 2 weeks before the expected date
    calendarStartDay -= weeksBeforeExpectedDate * 7;

    var calendarStartDate = new Date(expectedYear, expectedMonth, calendarStartDay);

    var week;
    var month;

    var calendar = $("#calendar");

    var days = $('<div class="days"></div>')

    for (var i = 0; i < 7; i++) {
        days.append('<div class="day">' + dayNamesShort[i] + '</div>');
    }

    calendar.append(days);

    for (var i = 0; i < (weeksBeforeExpectedDate * 7 + weeksAfterExpectedDate * 7) ; i++) {
        var newDate = new Date(expectedYear, expectedMonth, calendarStartDay + i);
        var item = $('<div class="day"></div>');

        var prefix = "";

        if (month != newDate.getMonth()) {
            prefix = monthNamesShort[newDate.getMonth()];
            month = newDate.getMonth();
        }

        item.append(getHtml(prefix, newDate));

        if (newDate.getTime() == expectedDate.getTime())
            item.addClass("expected");

        if (newDate.getDay() == 0) {
            calendar.append(week);
            week = $('<div class="week"></div>');
        }

        week.append(item);
    }

    calendar.append(week);
}

function getHtml(prefix, date) {
    if (prefix.length > 0)
        return $('<a href="#"><span class="prefix">' + prefix + '</span> ' + date.getDate() + '</a>');
    else
        return $('<a href="#">' + date.getDate() + '</a>');
}


function createHours() {
    var hours = $("#hours");

    var amHours = $('<div class="am-hours list-group col-lg-6"><p>Morning</p></div>');

    for (var i = 0; i < 12; i++) {
        var hour = i;

        if (i == 0)
            hour = 12;
        amHours.append($('<a href="#" class="hours list-group-item">' + hour + 'am to ' + (i + 1) + 'am</a>'));
    }

    hours.append(amHours);

    var pmHours = $('<div class="pm-hours list-group col-lg-6"><p>Afternoon / Evening</p></div>');

    for (var i = 0; i < 12; i++) {
        var hour = i + 1;

        if (i == 0)
            hour = 12;
        pmHours.append($('<a href="#" class="hours list-group-item">' + hour + 'pm</a>'));
    }

    hours.append(pmHours);


}