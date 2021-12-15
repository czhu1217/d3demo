var groups, groups2 = [], ctx;
var dataFile;
dataFile = document.getElementById("data").value;
var path = ["./data", dataFile].join("/");

d3.csv(path)
    .then(process)
    .then(makeChart)

function process(data){
    new SlimSelect({
        select: '#data'
    });

    new SlimSelect({
        select: '#chartType'
    });

    new SlimSelect({
        select: '#colType',
        onChange: (info) => updateColumn(info)
    });


    nested_data  = data;

     groups = d3.map(nested_data, function(d) { return (d.name) }).keys();
     d3.map(nested_data, function(d) {  groups2.push(d.fans);})
}

function makeChart(){
    currentType = document.getElementById("colType").value;
// Default chart defined with type: 'line'
    Chart.defaults.global.defaultFontFamily = "monospace";
    ctx = document.getElementById('chart').getContext('2d');
    makeLine();


}

// Function runs on chart type select update
function updateChartType() {
    var selectedOption = document.getElementById("chartType").value;
    // Since you can't update chart type directly in Charts JS you must destroy original chart and rebuild
    chart.destroy();
    if(selectedOption=="pie"||selectedOption=="doughnut")   makePie(selectedOption)

    if(selectedOption=="line")  makeLine()

    if(selectedOption=="bar")     makeBar()

    if(selectedOption=="polarArea")     makePolar()

    if(selectedOption=="radar") makeRadar();
};

// Function runs on chart type select update
function updateColumn(info) {
    console.log(info);
    currentType = [];
    info.forEach(element => {
        currentType.push(element.value)
        
    });
    console.log(currentType)
    chart.destroy();
    if(currentType.length>1){
        console.log("2 data");
        groups = d3.map(nested_data, function(d) { return (d[currentType[0]]) }).keys();
        groups2 = [];
        d3.map(nested_data, function(d) {  groups2.push(d[currentType[1]]);})
        makeLine();
    }
    else{
          // Since you can't update chart type directly in Charts JS you must destroy original chart and rebuild
    groups = d3.map(nested_data, function(d) { return (d.name) }).keys();
    groups2 = [];
    d3.map(nested_data, function(d) {  groups2.push(d[currentType[0]]);})
    updateChartType();

    }

  
};

function updateData(){
    chart.destroy();
    dataFile = document.getElementById("data").value;
    var path = ["./data", dataFile].join("/");

    d3.csv(path)
        .then(process)
        .then(makeChart)

}


