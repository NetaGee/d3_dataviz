// setting the height and width
var padding = 100;
var svg_w = 1100;
var svg_h = 700;

var graph_w = svg_w - padding*2;
var graph_h = svg_h - padding*2;

// reading in the data file
d3.json(("cpsgen.json"), function(error, data) {
    if (error) {
      console.log("error");
    } else {
      makeScatterplot(data);
      makeGenderScatterplot(data);

      // console.log(data);

    };
  });

d3.select('button#occupation')
  .on('click', function(d){
    // const currentClass = d3.select('.box')
    d3.select('.box')
      .attr('class', 'box showplot1');

    //d3.selectAll transition

  })

d3.select('button#gender')
  .on('click', function(d){
    // const currentClass = d3.select('.box')
    d3.select('.box')
      .attr('class', 'box showplot2');

    d3.selectAll(".med_dot")
    .transition().delay(1000).duration(2000)
    .attr("r",2)
    .style("fill", "gray");

    d3.selectAll(".occ_labels")
    .transition().delay(1000).duration(2000)
    .style("opacity", 0);

    d3.selectAll(".fem_dot")
    .transition().delay(2000).duration(3000)
    // .attr("cx", function(d) { return xScale(d.X__7);})
    .style("opacity", 1);

    d3.selectAll(".male_dot")
    .transition().delay(2000).duration(3000)
    .style("opacity", 1);
    // .attr("r",2)
    // .style("fill", "gray");
      // .transition().delay(3000).duration(2000)
      // .attr("r",2)
      // .style("opacity", 0);

    d3.selectAll(".gen_labels")
    .transition().delay(2000).duration(3000)
    .style("opacity", 1);

    d3.selectAll(".gap")
    .transition().delay(2000).duration(3000)
    .style("opacity", 1);

  });
