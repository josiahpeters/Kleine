define(["controllers"], function (controllers)
{


    angular.module('Kleine.controllers', [])
          .controller('Welcome', [function ()
          {

              var rows = getRandom(5, 10);

              var columnNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

              var columns = 12;

              var contentArea = $("#contentTest");

              for (var i = 0; i < rows; i++)
              {
                  var row = $('<div class="row"></div>');
                  //console.log("new row");
                  var columnTotal = 0;
                  while (columnTotal < columns)
                  {
                      var columnSize = getRandom(1, columns - columnTotal);

                      //console.log(columnTotal, columnSize);


                      var name = columnNames[columnSize - 1];

                      row.append('<div class="' + name + ' column"><div class="panel">column ' + name + '</div></div>');

                      columnTotal += columnSize;
                  }

                  contentArea.append(row);
              }


          }])

      .controller('Guess', [function ()
      {


          var dataset = [[3, 2.355451],
              [5, 2.526904],
              [10, 2.773802],
              [25, 3.150611],
              [50, 3.530203],
              [75, 3.879077],
              [90, 4.172493],
              [95, 4.340293],
              [97, 4.446488], ];

          var line = d3.svg.line()
            .x(function (d, i) { return i * 600 / 9; })
            .y(function (d, i) { return d[1] * 35; })
            .interpolate("monotone");

          // An area generator, for the light fill.
          var area = d3.svg.area()
              .interpolate("monotone")
              .x(function (d) { return x(d.date); })
              .y0(height)
              .y1(function (d) { return y(d.price); });


          var height = 200;
          var width = 600;

          var svg = d3.select("#viz").append("svg")
              .attr("width", 600)
              .attr("height", 200)

          // Add the clip path.
          svg.append("clipPath")
              .attr("id", "clip")
            .append("rect")
              .attr("width", width)
              .attr("height", height);

          // Add the area path.
          svg.append("path")
              .attr("class", "area")
              .attr("clip-path", "url(#clip)")
              .attr("d", area(dataset));

          // Add the line path.
          svg.append("path")
              .attr("class", "line")
              .attr("clip-path", "url(#clip)")
              .attr("d", line(dataset));

          svg.append("path")
          .attr("d", line(dataset));



      }]);

    function getRandom(min, max)
    {
        return Math.floor((Math.random() * max) + min);
    }
});