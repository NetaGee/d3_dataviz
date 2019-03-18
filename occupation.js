

    function makeScatterplot(scatter_data) {
      // console.log(scatter_data)
      // const yDomain = Object.keys(scatter_data.reduce((acc, {occupation}) => {
      //   acc[occupation] = true;
      //   return acc;
      // }, {}));

      const yDomain = scatter_data.sort((a, b) => {
        return a.weekly_earn - b.weekly_earn;
      }).map(d => d.occupation);

      // creating the SVG element
      var svg = d3.select("#plot1")
            .append("svg")
            .attr("width", svg_w)
            .attr("height", svg_h);

      var g = svg.append('g')
            .attr("transform", "translate(" + (padding + 150) + "," + padding +")");
            console.log('insanity')
      // setting up dynamic x and y scales
      var xScale = d3.scaleLinear()
              .domain([d3.min(scatter_data, function(d) { return d.weekly_earn;})-100,
                      d3.max(scatter_data, function(d) { return d.weekly_earn;})+100])
              .range([0, graph_w]);

      var yScale = d3.scaleBand()
              .domain(yDomain)
              .range([graph_h, 0])
              .padding([1]);

      var gridlines = g.selectAll("line")
              .data(scatter_data)
              .enter()
              .append("line")
              .attr("x1", 0)
              .attr("y1", function(d) { return yScale(d.occupation);})
              .attr("x2", function(d) { return xScale(d.weekly_earn);})
              .attr("y2", function(d) { return yScale(d.occupation);})
              .attr("stroke-width", 1)
              .style("stroke", "gray")
              .style("stroke-dasharray", ("1, 1.5"));

      // Define the div for the tooltip, citing source: http://bl.ocks.org/d3noob/a22c42db65eb00d4e369
      var div = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

      var join_circles = g.selectAll("circle")
              .data(scatter_data)
              .enter()
              .append("circle")
              .attr("cx", function(d) { return xScale(d.weekly_earn);})
              .attr("cy", function(d) { return yScale(d.occupation);})
              .attr("r",function(d) { // to make the dot based on NW size
                  return Math.sqrt(d.workers/60)
                })
              .style("fill", function(d){
               if(d.occupation == "Service"){
                 return "#19a0e1"
               }if(d.occupation == "Natural Resources, Construction, and Maintenance"){
                 return "#19a0e1"
               }if(d.occupation == "Production, Transportation, and Material Moving"){
                 return "#19a0e1"
               }if(d.occupation == "Sales and Office"){
                 return "#19a0e1"
               }
               else {
                 return "#ffc100" }
               })
               .on("mouseover", function(d) {
                  div.transition()
                      .duration(200)
                      .style("opacity", 1)
                    d3.select(this)
                      .style("stroke", "black")
                      .style("opacity", 1);
                  div	.html("MWE: $" + d.weekly_earn + "<br/>" + "<br/>" +
                            "# of Workers: " + d.workers)
                      .style("left", (d3.event.pageX + 10) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                  })
               .on("mouseout", function(d) {
                  div.transition()
                      .duration(500)
                      .style("opacity", 0)
                    d3.select(this)
                      .style("stroke", "none")
                      .style("opacity", 0.9);
              });



        // setting up the x and y axis
        var xAxis = d3.axisBottom()
                      .scale(xScale)
                      .ticks(8)
                      .tickSizeOuter(0)
                      .tickSize(0);

        var yAxis = d3.axisLeft()
                      .scale(yScale)
                      .ticks(14)
                      .tickSizeOuter(0)
                      .tickSize(0);

        // calling the axis to put it "on top" of the SVG
        svg.append("g") // an invisible group element
          .call(xAxis)
          .attr("transform", "translate(" + (padding + 150) + "," + (graph_h + padding) + ")")
          .style("stroke-dasharray", ("1, 1.5"));

        svg.append("text") // an invisible group element
          .attr("text-anchor", "middle")
          .attr("class", "axes")
          .attr("transform", "translate("+ (padding + svg_w/2) +","+(svg_h-(padding/1.5))+")")
          .text("Median Weekly Earnings ($)");

        svg.append("g") // an invisible group element
          .call(yAxis)
          .attr("transform", "translate(" + (150 + padding) + "," + padding + ")")
          .style("stroke-dasharray", ("0, 10"));

        svg.append("text") // an invisible group element
          .attr("text-anchor", "middle")
          .attr("class", "occ_labels")
          .attr("transform", "translate("+ (svg_w/2-20) +","+(svg_h-padding-163)+")")
          .text("Professional")
          .style("fill", "#ffc100");

        svg.append("text") // an invisible group element
          .attr("text-anchor", "middle")
          .attr("class", "occ_labels")
          .attr("transform", "translate("+ (svg_w/2-43) +","+(svg_h-padding-131)+")")
          .text("Non-Professional")
          .style("fill", "#19a0e1");



      }
