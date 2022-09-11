function setmbgraph(){
//plotly mass & balance graph
//first declare each variable and empty it
let xvaluesnormalcategory =[];
let yvaluesnormalcategory = [];
let xvaluesutilitycategory = [];
let yvaluesutilitycategory = [];

let zfmmarkerx = [];
let zfmmarkery = [];
let takeoffmarkerx = [];
let takeoffmarkery = [];
let landingmarkerx = [];
let landingmarkery = [];

//get current values for each graph variable
Object.assign(xvaluesnormalcategory, JSON.parse(getValueForVariable('xnormalcat')));
console.log(xvaluesnormalcategory);
Object.assign(yvaluesnormalcategory, JSON.parse(getValueForVariable('ynormalcat')));
Object.assign(xvaluesutilitycategory, JSON.parse(getValueForVariable('xutilitycat')));
Object.assign(yvaluesutilitycategory, JSON.parse(getValueForVariable('yutilitycat')));
zfmmarkerx.push(getValueForVariable('zfmx'));
zfmmarkery.push(getValueForVariable('zfmy'));
takeoffmarkerx.push(getValueForVariable('takeoffmassx'));
takeoffmarkery.push(getValueForVariable('takeoffmassy'));
landingmarkerx.push(getValueForVariable('landingmassx'));
landingmarkery.push(getValueForVariable('landingmassy'));
console.log(zfmmarkerx);
console.log(zfmmarkery);

//draw graphlines with above stated values
var graphlines = [
  {
    //normal category line
    x: xvaluesnormalcategory,
    y: yvaluesnormalcategory,
    fill: 'toself',
      type: 'scatter',
    fillcolor: 'rgba(3, 3, 252, 0.2)',
    hoveron: 'points+fills',
    line: {
      color: 'rgba(31, 31, 31, 0.5)',
      width: 1.5
    },
    showlegend: false,
    text: "Normal category",
    hoverinfo: 'text'
  },{
    //utility category line
    x: xvaluesutilitycategory,
    y: yvaluesutilitycategory,
    fill: 'toself',
      type: 'scatter+text',
    fillcolor: 'rgba(84, 84, 255, 0.2)',
    hoveron: 'points+fills',
    line: {
      color: 'rgba(31, 31, 31, 0.5)',
      width: 1.5
    },
    showlegend: false,
    text: "Utility category",
    textposition: 'center',
    hoverinfo: 'text'
  }];

var markers =[
  //ZFM marker
  {
    x: zfmmarkerx,
    y: zfmmarkery,
    type: 'scatter+text',
    mode: 'markers+text',
    marker: {
      color: 'rgb(255, 255, 255)',
      size: 15,
      line: {
        color: 'rgb(18, 18, 18)',
        width: 2
      }},
    showlegend: false,
    hoveron: 'points+fills',
    text: "Zero Fuel Mass",
    textposition: 'bottom',
    hoverinfo: 'text'
  },{
    //take-off mass marker
    x: takeoffmarkerx,
    y: takeoffmarkery,
    type: 'scatter',
    mode: 'markers+text',
    marker: {
      color: 'rgb(237, 76, 36)',
      size: 15,
      line: {
        color: 'rgb(18, 18, 18)',
        width: 2
      }},
    showlegend: false,
    hoveron: 'points+fills',
    text: "Take off mass",
    textposition: 'bottom',
    hoverinfo: 'text'
  },{
    //Landing mass marker
    x: landingmarkerx,
    y: landingmarkery,
    type: 'scatter',
    mode: 'markers+text',
    marker: {
      color: 'rgba(255, 234, 0, 1)',
      size: 15,
      line: {
        color: 'rgba(18, 18, 18, 1)',
        width: 2
      }},
    showlegend: false,
    hoveron: 'points+fills',
    text: "Landing mass",
    textposition: 'bottom',
    hoverinfo: 'text',
  }
]

var layout = {
  xaxis: {
    title: 'Loaded aircraft moment/1000 (pound-inches)',
    showgrid: true,
    zeroline: true,
    showline: true,
    linewidth: 3,
  },
  yaxis: {
    title: 'Aircraft weight (pounds)',
    showgrid: true,
    zeroline: true,
    showline: true,
    linewidth: 3,
  }}

var data = graphlines.concat(markers);

Plotly.newPlot('mbgraph', data, layout, {displayModeBar: false})
}
