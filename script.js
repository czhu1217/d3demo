
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

d3.csv("./data.csv", function(data){
    var x = d3.scaleLinear()
        .domain([50, 100])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")

    var y = d3.scaleBand()
        .range([ 0, height ])
        .domain(data.map(d => d.school))
        .padding(.1);
    svg.append("g")
        .call(d3.axisLeft(y))
    //Bars
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", x(50) )
        .attr("y", function(d) { return y(d.school); })
        .attr("width", function(d) { return x(50); })
        .attr("height", y.bandwidth() )
        .attr("fill", "#4973c5")
    svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("x", x(50))
        .attr("width", function(d) { return x(d.score); })
        .delay(function(d,i){console.log(i) ; return(i*100)})


})