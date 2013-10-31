(function() {
  var Test;



  Test = (function() {
    var vis, x, y;

    function Test() {}

    Test.prototype.test = function() {
      var data, h, max, w;
      data = [3, 7, 9, 1, 4, 6, 8, 2, 5];
      w = 700;
      h = 300;
      return max = d3.max(data);
    };

    x = d3.scale.linear().domain([0, data.length - 1]).range([0, w]);

    y = d3.scale.linear().domain([0, max]).range([h, 0]);

    vis = d3.select('#chart').append('svg:svg').attr('width', w).attr('height', h);

    vis.selectAll('path.line').data([data]).enter().append("svg:path").attr("d", d3.svg.line().x(function(d, i) {
      return x(i);
    }).y(y));

    return Test;

  })();

  console.log("test");

}).call(this);
