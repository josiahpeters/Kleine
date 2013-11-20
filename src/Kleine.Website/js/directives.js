'use strict';

angular.module('kleine.directives', []).
  directive('slider', function ($document, $window, $parse)
  {
      return {
          restrict: 'E',
          //templateUrl: 'partials/slider.html',
          template: '<div class="range-slider"><input type="hidden" ng-model="value" />' +
          '    <div class="slider">' +
          '        <label class="min">{{ (name == \'time\' ? (minValue|hours) : minValue) }} {{label}}</label>' +
          '        <label class="max">{{ (name == \'time\' ? (maxValue|hours) : maxValue) }} {{label}}</label>' +
          //'        <label class="min">{{ (name == \'time\' ? minValue | hours : minValue) }} {{ label }}</label>' +
          //'        <label class="max">{{ (name == \'time\' ? maxValue | hours : maxValue) }} {{ label }}</label>' +
          '    </div></div>',
          scope: {
              name: '=',
              //update: '&',
              //bleh: '&',
              //targetvalue: '@',
          },
          //controller: function ($scope)
          //{
          //    //$scope.$parent.results.weight = 12
          //    //$scope.$parent
          //},
          link: function (scope, element, attr)
          {
              element = angular.element(element.children()[0]);

              //scope.bleh({ val: "der" } );

              var startX = 0, x = 0, y = 0;
              var minValue = parseFloat(attr.min);
              var maxValue = parseFloat(attr.max);
              var sliderMaxPx = 1140;
              var pixelPerValue = 100;
              var range = parseFloat(attr.range);
              var sliderElement = angular.element(element.children()[1]);

              angular.element($window).bind('resize', resize);

              var targetValue = $parse(attr.target);

              sliderElement.css({
                  position: 'absolute',
                  cursor: 'pointer',
                  left: '0px'
              });

              scope.name = attr.name;

              scope.label = attr.label || "";


              element.css({
                  position: 'relative',
                  cursor: 'pointer'
              });


              sliderElement.on('mousedown', function (event)
              {
                  // Prevent default dragging of selected content
                  event.preventDefault();
                  startX = event.pageX - x;
                  $document.on('mousemove', mousemove);
                  $document.on('mouseup', mouseup);
              });

              // call setup with a delay to prevent conflicting scope.$apply race condition
              setTimeout(setup, 1);
              // setup function
              function setup()
              {
                  resize();
                  scope.$apply(calculateValue(getTargetValue()));
              }

              function mousemove(event)
              {
                  x = event.pageX - startX;

                  var startingX = parseFloat(sliderElement.css("left"));

                  if (x < 0)
                      x = 0;
                  if (x > sliderMaxPx)
                      x = sliderMaxPx;

                  sliderElement.css({
                      left: x + 'px'
                  });

                  scope.$apply(calculateValue());
              }

              function calculateValue(value)
              {
                  
                  if (value !== undefined)
                  {
                      if (value < minValue)
                          value = minValue;

                      if (value > maxValue)
                          value = maxValue - range;

                      var leftValue = (value - minValue) * pixelPerValue;

                      sliderElement.css({
                          left: leftValue + 'px'
                      });

                      x = leftValue;
                  }

                  var left = parseFloat(sliderElement.css("left"));

                  var minimumValue = (left / pixelPerValue + minValue);
                  var maximumValue = (left / pixelPerValue + minValue + range);

                  if (scope.name == "time")
                  {
                      scope.minValue = convertHoursToDateTimeString(minimumValue);
                      scope.maxValue = convertHoursToDateTimeString(maximumValue);
                  }
                  else
                  {
                      scope.minValue = minimumValue.toFixed(1);
                      scope.maxValue = maximumValue.toFixed(1);
                  }
                  
                  setTargetValue([(scope.minValue), (scope.maxValue)]);
              }

              
              function convertHoursToDateTimeString(timeValue)
              {
                  timeValue = timeValue % 24;
                  var time = "am";

                  if (timeValue > 12)
                      time = "pm";

                  var hours = Math.floor(timeValue);

                  var minutes = Math.floor((timeValue % 1) * 60);

                  var date = new Date();
                  date.setHours(hours, minutes);

                  return date;
              }

              function setTargetValue(value)
              {
                  targetValue.assign(scope.$parent, value);
              }

              function getTargetValue()
              {
                  var value = targetValue(scope.$parent) || minValue;                                    

                  if (scope.name == "time")
                  {
                      value = value[0].getHours() + value[0].getMinutes() / 60;
                  }
                  else
                      if (value.length > 0)
                          value = value[0];
                  return value;
              }

              function get(target, properties)
              {
                  if (properties.length > 1)
                  {
                      return get(target[properties[0]], properties.slice(1));
                  }
                  return target[properties[0]];
              }

              function resize(event)
              {
                  var width = range / (maxValue - minValue);

                  sliderElement.css({ width: element[0].offsetWidth * width + 'px' });

                  sliderMaxPx = element[0].offsetWidth - sliderElement[0].offsetWidth;

                  pixelPerValue = sliderMaxPx / (maxValue - minValue);
              }

              function mouseup()
              {
                  $document.unbind('mousemove', mousemove);
                  $document.unbind('mouseup', mouseup);
              }
          }
      };

  })



.directive('calendar', function ($document, $window, $parse, $compile)
{
    return {
        restrict: 'E',
        //templateUrl: 'partials/slider.html',
        template: '<table class="calendar">' +
'    <thead>    ' +
'        <tr>' +
'            <th ng-repeat="day in weekdays">{{ day }}</th>' +
'        </tr>' +
'    </thead>' +
'    <tbody>' +
'        <tr ng-repeat="week in weeks">' +
'            <td ng-repeat="day in week.days" class="day" ng-click="setDate(day)">' +
'               <div  ng-class="{\'expected\':day.expected,\'active\':isSelected(day)}">' +
'        <span class="month">{{ getMonth(day) }}</span>' +
'        {{ getDate(day) }}' +
'               </div>' +
'            </td>' +
'        </tr>' +
'    </tbody>' +
'</table>',
        scope: {
            name: '=',
        },
        controller: function ($scope)
        {
        },
        link: function (scope, element, attr, $com)
        {
            var monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            var weeksBeforeExpectedDate = 3;
            var weeksAfterExpectedDate = 3;

            var expectedDate = new Date("12/16/2013");

            scope.selectedDate = new Date("1/1/2001");

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

            var targetValue = $parse(attr.target);

            var week;
            var month;

            var calendar = angular.element(element.children()[0]);

            setTimeout(setup,1);

            scope.getDate = function (day)
            {
                return day.date.getDate();
            }
            scope.getMonth = function (day)
            {
                return monthNamesShort[day.date.getMonth()];
            }
            scope.setDate = function (day)
            {                
                scope.selectedDate = day.date;

                var value = (day.date.getMonth() + 1) + '/' + day.date.getDate() + '/' + day.date.getFullYear();
                setTargetValue(value);
            }
            scope.isSelected = function (day)
            {
                return scope.selectedDate.valueOf() == day.date.valueOf();
            }

            function setup()
            {
                scope.$apply(function ()
                {
                    scope.selectedDate = new Date(getTargetValue());
                });
            }

            var weeks = [];

            var dayIndex = 0;

            for (var i = 0; i < 6; i++)
            {
                var week = { days: [] };

                for (var j = 0; j < 7; j++)
                {
                    var newDate = new Date(expectedYear, expectedMonth, calendarStartDay + dayIndex);

                    var day = { date: newDate, expected: false };

                    if (newDate.getTime() == expectedDate.getTime())
                        day.expected = true;

                    week.days.push(day);

                    dayIndex++;
                }
                weeks.push(week);
            }

            scope.weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            scope.weeks = weeks;
            

            function setTargetValue(value)
            {
                targetValue.assign(scope.$parent, value);
                //scope.$emit(attr.target);
            }

            function getTargetValue()
            {
                var value = targetValue(scope.$parent) || '1/1/2001';
                return value;
            }
        }
    };

});