class Test
    test: () ->
        data  = [3,7,9,1,4,6,8,2,5]
        w     = 700
        h     = 300
        max   = d3.max(data)
  
# Scales
    x  = d3.scale.linear().domain([0, data.length - 1]).range [0, w]
    y  = d3.scale.linear().domain([0, max]).range [h, 0]
  
# Base vis layer
    vis = d3.select('#chart')
    .append('svg:svg')
    .attr('width', w)
    .attr('height', h)

    # Add path layer
    vis.selectAll('path.line')
    .data([data])
    .enter().append("svg:path")
    .attr("d", d3.svg.line()
    .x((d,i) -> x(i))
    .y(y))

console.log("test");