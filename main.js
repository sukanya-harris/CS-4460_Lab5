var width = 500;
var height = 500;

d3.csv("cereals.csv", function (csv) {
  for (var i = 0; i < csv.length; ++i) {
    csv[i].Calories = Number(csv[i].Calories)
    csv[i].Fat = Number(csv[i].Fat);
    csv[i].Carb = Number(csv[i].Carb);
    csv[i].Fiber = Number(csv[i].Fiber);
    csv[i].Protein = Number(csv[i].Protein);
  }

  console.log(csv);

  // Functions used for scaling axes +++++++++++++++
  var fatExtent = d3.extent(csv, function (row) {
      return row.Fat;
  });
  var carbExtent = d3.extent(csv, function (row) {
	  return row.Carb;
  });
  var fiberExtent = d3.extent(csv, function (row) {
    return row.Fiber;
  });
  var proteinExtent = d3.extent(csv, function (row) {
    return row.Protein;
  });

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  // Axis setup
  var xScale = d3.scaleLinear().domain(fatExtent).range([50, 470]);
  var yScale = d3.scaleLinear().domain(carbExtent).range([470, 30]);

  var xScale2 = d3.scaleLinear().domain(fiberExtent).range([50, 470]);
  var yScale2 = d3.scaleLinear().domain(proteinExtent).range([470, 30]);

  var xAxis = d3.axisBottom().scale(xScale);
  var yAxis = d3.axisLeft().scale(yScale);

  var xAxis2 = d3.axisBottom().scale(xScale2);
  var yAxis2 = d3.axisLeft().scale(yScale2);

  //Legend
  //Hint: Append circrcles to each selection to represent the calorie level
  d3.select("#LowCalorie").append("circle").attr("r", 5).classed("lowCalorie", true).attr("cx", 10).attr("cy", 6);
  d3.select("#MedCalorie").append("circle").attr("r", 5).classed("medCalorie", true).attr("cx", 10).attr("cy", 6);
  d3.select("#HighCalorie").append("circle").attr("r", 5).classed("highCalorie", true).attr("cx", 10).attr("cy", 6);

  //Create SVGs for charts
  var chart1 = d3
    .select("#chart1")
    .append("svg:svg")
    .attr("id", "svg1")
    .attr("width", width)
    .attr("height", height);

  var chart2 = d3
    .select("#chart2")
    .append("svg:svg")
    .attr("id", "svg2")
    .attr("width", width)
    .attr("height", height);

  //Labels for Charts
  var title1 = d3
    .select("#svg1")
    .append("text")
    .attr("x", width/2)
    .attr("y", 12)
    .attr("font-size", "12px")
    .text("Fat vs Carb");

  var title2 = d3
    .select("#svg2")
    .append("text")
    .attr("x", width/2)
    .attr("y", 12)
    .attr("font-size", "12px")
    .text("Fiber vs Protein");

  //Labels for Axes
    var fatLabel = d3
    .select("#svg1")
    .append("text")
    .attr("x", width/2)
    .attr("y", height)
    .attr("font-size", "12px")
    .text("Fat");

    var carbLabel = d3
    .select("#svg1")
    .append("text")
    .attr("x", -width/2)
    .attr("y", 20)
    .attr("font-size", "12px")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .text("Carb");

    var fiberLabel = d3
    .select("#svg2")
    .append("text")
    .attr("x", width/2)
    .attr("y", height)
    .attr("font-size", "12px")
    .text("Fiber");

    var proteinLabel = d3
    .select("#svg2")
    .append("text")
    .attr("x", -width/2)
    .attr("y", 20)
    .attr("font-size", "12px")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .text("Protein");

  /******************************************
		
		Create Circles for Each Scatterplot

	 ******************************************/
    
  chart1 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(0," + (width - 30) + ")")
    .call(xAxis) // call the axis generator
    .append("text")
    .attr("class", "label")
    .attr("x", width - 16)
    .attr("y", -6)
    .style("text-anchor", "end");

  chart1 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(50, 0)")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");

  chart2 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(0," + (width - 30) + ")")
    .call(xAxis2)
    .append("text")
    .attr("class", "label")
    .attr("x", width - 16)
    .attr("y", -6)
    .style("text-anchor", "end");

  chart2 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(50, 0)")
    .call(yAxis2)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");

    var legendValues = d3.select("#chart3").append("p");
    legendValues.append("strong").text("Cereal: ").attr("class", "cerealName").append('br');
    legendValues.append("strong").text("Calories: ").append("br").attr("class", "calorieNum");
    legendValues.append("strong").text("Fat Value: ").append("br").attr("class", "fatValue");
    legendValues.append("strong").text("Carb Value: ").append("br").attr("class", "carbValue");
    legendValues.append("strong").text("Fiber Value: ").append("br").attr("class", "fiberValue");
    legendValues.append("strong").text("Protein Value: ").append("br").attr("class", "proteinValue");

    var chart1Data = chart1.selectAll("circle").data(csv).enter().append("circle").attr("r", 5).attr("cx", function (d) {
      return xScale(d.Fat);
    }).attr("cy", function (d) {
      return yScale(d.Carb);
    }).attr("class", function (d) {
      if (d.Calories <= 100) {
        return "lowCalorie";
      } else if (d.Calories > 100 && d.Calories <= 130) {
        return "medCalorie";
      } else {
        return "highCalorie";
      }
    });

    var chart2Data = chart2.selectAll("circle").data(csv).enter().append("circle").attr("r", 5).attr("cx", function (d) {
      return xScale2(d.Fiber);
    }).attr("cy", function (d) {
      return yScale2(d.Protein);
    }).attr("class", function (d) {
      if (d.Calories <= 100) {
        return "lowCalorie";
      } else if (d.Calories > 100 && d.Calories <= 130) {
        return "medCalorie";
      } else {
        return "highCalorie";
      }
    });

    //instantiate brush
    var brush = d3.brush()
    .extent([[0, 0], [width, height]])
    .on("start", brushstart)
    .on("brush", highlightBrushedCircles)
    .on("end", displayValues);

    chart1.append("g").call(brush);
    chart2.append("g").call(brush);


    function brushstart() {
      d3.select("#chart").selectAll("circle").attr("class", "non_brushed");
      d3.select("#brush").call(brush.move, null); //using `.call()` to call the brush function on each elements
    }
    
    function highlightBrushedCircles() {
    
        // Get the extent or bounding box of the brush event, this is a 2x2 array
        var e = d3.event.selection;
        if(e) {
            //Revert circles to initial style
            chart1Data.attr("class", "non_brushed");
            chart2Data.attr("class", "non_brushed");
    
            //Select the instance of brush selection (access coordinates of the selection area)
            var coords = d3.brushSelection(this);
    
            // Select all chart1Data, and add the color gradient classes if the data for that circle
            // lies outside of the brush-filter applied for this x and y attributes
    
          //  var selected = chart1Data.filter(function (d) {
          //   return (coords[0][0] < xScale(d.Fat) && xScale(d.Fat) < coords[1][0] && coords[0][1] < yScale(d.Carb) && yScale(d.Carb) < coords[1][1]);
          //  }).attr("class", function (d) {
          //   if (d.Calories <= 100) {
          //     return "lowCalorie";
          //   } else if (d.Calories > 100 && d.Calories <= 130) {
          //     return "medCalorie";
          //   } else {
          //     return "highCalorie";
          //   }
          //  });

          var selected = [];
          var non_selected = [];

          chart1Data.filter(function (d) {
            if (coords[0][0] < xScale(d.Fat) && xScale(d.Fat) < coords[1][0] && coords[0][1] < yScale(d.Carb) && yScale(d.Carb) < coords[1][1]) {
              selected.push(d);
            } else {
              non_selected.push(d);
            }
          });

          console.log(selected);

          if (selected.length == 1) {
            d3.select(".cerealName").append('text').text(selected[0]['CerealName']);
          }

           var selected2 = chart2Data.filter(function (d) {
            return (coords[0][0] < xScale2(d.Fiber) && xScale2(d.Fiber) < coords[1][0] && coords[0][1] < yScale2(d.Protein) && yScale2(d.Protein) < coords[1][1]);
           }).attr("class", function (d) {
            if (d.Calories <= 100) {
              return "lowCalorie";
            } else if (d.Calories > 100 && d.Calories <= 130) {
              return "medCalorie";
            } else {
              return "highCalorie";
            }
           });
        }
    }
    
    function displayValues() {
        // If there is no longer an extent or bounding box then the brush has been removed
        if(!d3.event.selection) {
            // Bring back all non brushed circle elements to original color gradient
            d3.selectAll(".non_brushed").attr("class", function (d) {
              if (d.Calories <= 100) {
                return "lowCalorie";
              } else if (d.Calories > 100 && d.Calories <= 130) {
                return "medCalorie";
              } else {
                return "highCalorie";
              }
             });
          }
        // In Activity 3: Write the code to display tooltip only if one circle is selected in here
    }
});
