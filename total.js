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
  })

d3.select('button#gender')
  .on('click', function(d){
    // const currentClass = d3.select('.box')
    d3.select('.box')
      .attr('class', 'box showplot2');
  })
function testFunction(data){
console.log(data);
console.log("What is happening?")
console.log(d3.event);
};
