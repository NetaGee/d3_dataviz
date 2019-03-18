
    function makeGenderScatterplot(scatter_data) {

       const yDomain = scatter_data.sort((a, b) => {
          return a.weekly_earn - b.weekly_earn;
        }).map(d => d.occupation);

        // creating the SVG element
        var svg = d3.select("#plot2")
              .append("svg")
              .attr("width", svg_w)
              .attr("height", svg_h);

        var g = svg.append('g')
              .attr("transform", "translate(" + padding + "," + padding +")");

        // setting up dynamic x and y scales
        var xScale = d3.scaleLinear()
                .domain([d3.min(scatter_data, function(d) { return d.X__7;})-100,
                        d3.max(scatter_data, function(d) { return d.X__5;})+100])
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
                .attr("x2", function(d) { return xScale(d.X__7);})
                .attr("y2", function(d) { return yScale(d.occupation);})
                .attr("stroke-width", 1)
                .style("stroke", "gray")
                .style("stroke-dasharray", ("1, 1.5"));

        var lines = g.selectAll("lines")
                .data(scatter_data)
                .enter()
                .append("line")
                .attr("x1", function(d) { return xScale(d.X__7);})
                .attr("y1", function(d) { return yScale(d.occupation);})
                .attr("x2", function(d) { return xScale(d.X__5);})
                .attr("y2", function(d) { return yScale(d.occupation);})
                .attr("stroke-width", 1)
                .style("stroke", "gray");

        // Define the div for the tooltip, citing source: http://bl.ocks.org/d3noob/a22c42db65eb00d4e369
        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

         var female_circles = g.selectAll()
                 .data(scatter_data)
                 .enter()
                 .append("circle")
                 .attr("cx", function(d) { return xScale(d.X__7);})
                 .attr("cy", function(d) { return yScale(d.occupation);})
                 .attr("r",function(d) { // to make the dot based on NW size
                      return Math.sqrt(d.X__6/60)
                   })
                 .style("fill", "#8f65bb")
                 .on("mouseover", function(d) {
                    div.transition()
                        .duration(200)
                        .style("opacity", 1)
                      d3.select(this)
                        .style("stroke", "black")
                        .style("opacity", 1);
                    div	.html("Female MWE: $" + d.X__7 + "<br/>" +
                              "# of Females: " + d.X__6 + "<br/>" +
                              "Below Median: $" + (d.weekly_earn-d.X__7))
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

         var male_circles = g.selectAll()
                 .data(scatter_data)
                 .enter()
                 .append("circle")
                 .attr("cx", function(d) { return xScale(d.X__5);})
                 .attr("cy", function(d) { return yScale(d.occupation);})
                 .attr("r",function(d) { // to make the dot based on NW size
                      return Math.sqrt(d.X__4/60)
                   })
                 .style("fill", "#ffc100")
                 .on("mouseover", function(d) {
                    div.transition()
                        .duration(200)
                        .style("opacity", 1)
                        d3.select(this)
                          .style("stroke", "black")
                          .style("opacity", 1);
                    div	.html("Male MWE: $" + d.X__5 + "<br/>" +
                              "# of Males: " + d.X__4 + "<br/>" +
                              "Above Median: $" + (d.X__5-d.weekly_earn))
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

         var circles = g.selectAll()
                 .data(scatter_data)
                 .enter()
                 .append("circle")
                 .attr("cx", function(d) { return xScale(d.weekly_earn);})
                 .attr("cy", function(d) { return yScale(d.occupation);})
                 .attr("r",2)
                 .style("fill", "gray");

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
          .attr("transform", "translate(" + padding + "," + (graph_h + padding) + ")")
          // .style("stroke", "gray")
          .style("stroke-dasharray", ("1, 1.5"));

        svg.append("g") // an invisible group element
          .call(yAxis)
          .attr("transform", "translate(" + padding + "," + padding + ")")
          .style("stroke-dasharray", ("0, 10"));


          }
          //
          // d3.select("#basic")
          // .on("click", function(d,i) {
          //   makeScatterplot(scatter_data);
          // })
          //
          // d3.select("#basic")
          // .on("click", makeScatterplot);
