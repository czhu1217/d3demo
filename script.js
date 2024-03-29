
// set the dimensions and margins of the graph
var margin = { top: 20, right: 0, bottom: 40, left: 250 },
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#bar-graph")
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




d3.csv("./data.csv", function (data) {
    console.log(data);
    // sort data
    data.sort(function (b, a) {
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
            "translate(" + (width / 2) + " ," +
            (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Overall score");

    var y = d3.scaleBand()
        .range([0, height])
        .domain(data.map(d => d.school))
        .padding(.1);
    svg.append("g")
        .call(d3.axisLeft(y))
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("School");

    //Bars
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", x(50))
        .attr("y", function (d) { return y(d.school); })
        .attr("width", function (d) { return x(50); })
        .attr("height", y.bandwidth())
        .attr("fill", function (d) {
            if (d.school == "Carnegie Mellon University") return "red";
            else return "steelblue";
        })

    svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("x", x(50))
        .attr("width", function (d) { return x(d.score); })
        .delay(function (d, i) { return (i * 100) })

    var color = d3.scaleLinear()
        .range(["red", "yellow", "green", "blue", "purple", "red"])
        .domain([0, 10, 20, 30, 40, 50])
        .interpolate(d3.interpolateHsl);

    d3.timer(function (elapsed) {
        d3.selectAll("rect")
            .style("fill", function (d, i) {
                if (d.school == "Carnegie Mellon University") return color((elapsed / 100) % 50);
            })
    });

    svg.selectAll("rect")
        .on("click", handleClick)
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '.85');
        })
        .on("mouseout", function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1');
        })

    function handleClick(d, i) {
        console.log(d.website);
        window.open(d.website.toString());
    }



})


// set the dimensions and margins of the graph
var width2 = 1000
height2 = 450
margin2 = 40
labelHeight = 18;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width2, height2) / 2 - margin2

// append the svg object to the div called 'my_dataviz'
var svg2 = d3.select("#pie-chart")
    .append("svg")
    .attr("width", width2)
    .attr("height", height2)
    .append("g")
    .attr("transform", "translate(" + width2 / 2 + "," + height2 / 2 + ")");

svg2.append("text")
    .attr("x", (0))
    .attr("y", 0-height2/2+margin2/2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Attack on Titan Fan Distribution");



d3.csv("./aot.csv", function (data) {
    console.log(data);

    // set the color scale
    var color = d3.scaleOrdinal()
        .domain(data)
        .range(d3.schemeSet2);

    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .value(function (d) {
            console.log(d);
            return d.fans;
        })
    var data_ready = pie(data)
    // Now I know that group A goes from 0 degrees to x degrees and so on.
    console.log(data_ready);

    // shape helper to build arcs:
    var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius * 0.8)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg2
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function (d) {
            console.log(d);
            return (color(d.data.name))
        })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '.85');
        })
        .on("mouseout", function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1');
        })

    var outerArc = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

    // Add the polylines between chart and labels:
    svg2
        .selectAll('allPolylines')
        .data(data_ready)
        .enter()
        .append('polyline')
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', function (d) {
            var posA = arcGenerator.centroid(d) // line insertion in the slice
            var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
            var posC = outerArc.centroid(d); // Label position = almost the same as posB
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
            posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
            return [posA, posB, posC]
        })

    svg2
        .selectAll('allLabels')
        .data(data_ready)
        .enter()
        .append('text')
        .text(function (d) {
            console.log(d.data.name);
            return d.data.name
        })
        .attr('transform', function (d) {
            var pos = outerArc.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return 'translate(' + pos + ')';
        })
        .style('text-anchor', function (d) {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midangle < Math.PI ? 'start' : 'end')
        })


})

// set the dimensions and margins of the graph
var margin3 = {top: 30, right: 30, bottom: 30, left: 60},
    width3 = 600 - margin3.left - margin3.right,
    height3 = 400 - margin3.top - margin3.bottom;

// append the svg3 object to the body of the page
var svg3 = d3.select("#line-plot")
    .append("svg")
    .attr("width", width3 + margin3.left + margin3.right)
    .attr("height", height3 + margin3.top + margin3.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin3.left + "," + margin3.top + ")");

svg3
    .append('path')
    .attr('d', d3.line()([[0, 0], [width3, 0]]))
    .style("stroke-dasharray", ("15, 6"))
    .attr('stroke', 'black')
    .attr("stroke-width", "4")
    .attr('fill', 'none');


//Read the data
d3.csv("data3.csv", function(data) {

    // List of groups (here I have one group per column)
    var allGroup = ["valueA", "valueB", "valueC"]

    // add the options to the button
    d3.select("#selectButton")
        .selectAll('myOptions')
        .data(allGroup)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
        .domain(allGroup)
        .range(d3.schemeSet2);

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
        .domain([0,10])
        .range([ 0, width3 ]);
    svg3.append("g")
        .attr("transform", "translate(0," + height3 + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain( [0,20])
        .range([ height3, 0 ]);
    svg3.append("g")
        .call(d3.axisLeft(y));

    // Initialize line with group a
    var line = svg3
        .append('g')
        .append("path")
        .datum(data)
        .attr("d", d3.line()
            .x(function(d) { return x(+d.time) })
            .y(function(d) { return y(+d.valueA) })
        )
        .attr("stroke", function(d){ return myColor("valueA") })
        .style("stroke-width", 4)
        .style("fill", "none")

    // A function that update the chart
    function update(selectedGroup) {

        // Create new data with the selection?
        var dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} })

        // Give these new data to update line
        line
            .datum(dataFilter)
            .transition()
            .duration(1000)
            .attr("d", d3.line()
                .x(function(d) { return x(+d.time) })
                .y(function(d) { return y(+d.value) })
            )
            .attr("stroke", function(d){ return myColor(selectedGroup) })
    }

    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
    })

})







