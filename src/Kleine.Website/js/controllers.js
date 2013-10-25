'use strict';

/* Controllers */

angular.module('Kleine.controllers', []).
  controller('Welcome', [function() {
      
      var rows = getRandom(5, 10);

      var columnNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

      var columns = 12;
      
      var contentArea = $("#contentTest");

      for (var i = 0; i < rows; i++)
      {
          var row = $('<div class="row"></div>');
          console.log("new row");
          var columnTotal = 0;
          while(columnTotal < columns)
          {
              var columnSize = getRandom(1, columns - columnTotal);

              console.log(columnTotal, columnSize);


              var name = columnNames[columnSize - 1 ];

              row.append('<div class="' + name + ' column"><div class="panel">column ' + name + '</div></div>');

              columnTotal += columnSize;
          }

          contentArea.append(row);
      }


  }])
  .controller('Guess', [function() {

  }]);

function getRandom(min, max)
{
    return Math.floor((Math.random() * max) + min);
}