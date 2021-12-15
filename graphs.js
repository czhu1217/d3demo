var currentType, nested_data;

function makePie(chartType){
    console.log(nested_data);
    // var color = CHART_COLORS;
    var mydata = {
        labels: groups,
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart'
                }
            }
        },
        datasets: [
            {
                data: groups2,
                backgroundColor: Object.values(CHART_COLORS2)


            }
        ],
    }
    var ctx = document.getElementById('chart').getContext('2d');

    chart = new Chart(ctx, {
        type: chartType,
        data: mydata
    });


}



function makePolar(){
    console.log(nested_data);
    // var color = CHART_COLORS;
    var polardata = {
        labels: groups,
        options: {
            maintainAspectRatio: false,
        },
        datasets: [
            {
                label: 'My First Dataset',
                data: groups2,
                backgroundColor: Object.values(CHART_COLORS)
            }
        ],
    }
    var ctx = document.getElementById('chart').getContext('2d');

    chart = new Chart(ctx, {
        type: "polarArea",
        data: polardata
    });


}




function makeBar(){
    console.log(groups2)
    var mydata = {
        labels: groups,
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart'
                }
            }
        },
        datasets: [
            {
                label: currentType,
                data: groups2,
                backgroundColor: 'rgb(190, 99, 255, 0.25)',
                borderColor: 'rgb(190, 99, 255)',
                borderWidth: 2

            }
        ],
    }
    chart = new Chart(ctx, {
        type: "horizontalBar",
        data: mydata
    });
}

function makeRadar(){
    console.log(groups2)
    var mydata = {
        labels: groups,
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Radar Chart'
                }
            }
        },
        datasets: [
            {
                label: currentType,
                data: groups2,
                backgroundColor: 'rgba(0, 128, 255, 0.25)',
                borderColor: 'rgb(0, 128, 255)',
                borderWidth: 2

            }
        ],
    }
    chart = new Chart(ctx, {
        type: "radar",
        data: mydata
    });
}



function makeLine(){
    var mydata  =  {
        labels: groups,
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Line Chart'
                }
            }
        },
        datasets: [
            {
                label: currentType,
                lineTension: 0,
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.25)',
                borderColor: 'rgb(255, 99, 132)',
                data: groups2,

            }
        ],
    }
    console.log(nested_data);
    chart = new Chart(ctx, {
        type: "line",
        // options: {
        //     maintainAspectRatio: false
        // },
        data: mydata

    });
    console.log(chart.data);
}

function makeLine2(){
    var mydata  =  {
        labels: groups,
        
        datasets: [
            {
                lineTension: 0,
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.25)',
                borderColor: 'rgb(255, 99, 132)',
                data: groups2,

            }
        ],
    }
    console.log(nested_data);
    chart = new Chart(ctx, {
        type: "line",
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Line Chart'
                }
            },
            scales: {
                y: {
                  type: 'linear',
                  display: true,
                  position: 'left',
                }
            }
        },
        // options: {
        //     maintainAspectRatio: false
        // },
        data: mydata

    });
    console.log(chart.data);
}

