
// set the dimensions and margins of the graph
var margin = {top: 20, right: 0, bottom: 40, left: 250},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Top 10 CS School scores");

d3.csv("./data.csv", function(data){
    // sort data
    data.sort(function(b, a) {
        return a.score - b.score;
    });
    var x = d3.scaleLinear()
        .domain([50, 100])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
    // text label for the x axis
    svg.append("text")
        .attr("transform",
            "translate(" + (width/2) + " ," +
            (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Overall score");

    var y = d3.scaleBand()
        .range([ 0, height ])
        .domain(data.map(d => d.school))
        .padding(.1);
    svg.append("g")
        .call(d3.axisLeft(y))
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("School");

    //Bars
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", x(50) )
        .attr("y", function(d) { return y(d.school); })
        .attr("width", function(d) { return x(50); })
        .attr("height", y.bandwidth() )
        .attr("fill", function (d){
            if(d.school=="Carnegie Mellon University") return "red";
            else return "steelblue";
        })

    svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("x", x(50))
        .attr("width", function(d) { return x(d.score); })
        .delay(function(d,i){return(i*100)})

    var color = d3.scaleLinear()
        .range(["red", "yellow", "green", "blue", "purple", "red"])
        .domain([0, 10, 20, 30, 40, 50])
        .interpolate(d3.interpolateHsl);

    d3.timer(function(elapsed) {
        d3.selectAll("rect")
            .style("fill", function(d,i) { if(d.school=="Carnegie Mellon University") return color((elapsed/100) % 50);
            else return "steelblue";})
    });

    svg.selectAll("rect")
        .on("click", handleClick)

})



