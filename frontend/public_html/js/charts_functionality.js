var xValuesCPD = ["Wing1", "Wing2", "Wing3"];
var xValuesCPH = ["Lodging", "Per Diem", "Meals"];
var dataLodge = [55, 49, 44];
var dataDiem = [20,30,40];
var dataMeals = [0,10,20];
var barColors = ["red", "green","blue"];

function main(){
    registerHandlers();
    generateCharts();
}

function registerHandlers() {
    console.log("Registering handlers");
    document.getElementById("LogoutButton").addEventListener("click", logout);
    document.getElementById("genChartButton").addEventListener("click", updateChart);
}
function updateChart(){

}
function generateCharts(){
    const plugin = {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart, args, options) => {
          const {ctx} = chart;
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = options.color || '#99ffff';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      };
    var cpd = new Chart("cpdChart", {
        type: "bar",
        data: {
          labels: xValuesCPD,
          datasets: [{
            label: "Lodging",
            backgroundColor: barColors[0],
            data: dataLodge
          },
          {
            label: "Per Diem",
            backgroundColor: barColors[1],
            data: dataDiem
          },
          {
            label: "Meals",
            backgroundColor: barColors[2],
            data: dataMeals
          },
        ]
        },
        options: {
            legend: {display: false},
            title: {display: true, text: "Cost per day"},
            plugins: {
                customCanvasBackgroundColor: {
                  color: '#FFB1C1',
                }
              },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
              },
          },
        plugins: [plugin]
          
      });
      var cph = new Chart("cphChart", {
        type: "bar",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
            legend: {display: false},
            title: {display: true, text: "Cost per head"},
            plugins: {
                customCanvasBackgroundColor: {
                  color: '#FFB1C1',
                }
              }
          },
        plugins: [plugin]
      });
}
function logout() {
    console.log("Logging user out...");
    document.cookie = "";
    window.location.href = "http://127.0.0.1:3000/index.html";
  }
document.addEventListener("DOMContentLoaded", main);