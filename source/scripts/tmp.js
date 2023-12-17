import PlanLine from './еьз/plan';
import ProductionTrace from './еьз/production-trac';

const planLine = new PlanLine('2018-01-01', 100);

const traceA = {
  type: 'scatter',
  mode: 'lines',
  x: ['2018-01-01', '2018-01-02'],
  y: [100, 100],
  line: {color: '#17BECF'}
};

const transformDate = (date) => {
  console.log(date);
  const tmp = new Date(date);

  const day = tmp.toLocaleString('ru', {day: 'numeric'});
  const month = tmp.toLocaleString('ru', {month: 'long'});
  const weekday = tmp.toLocaleString('ru', {weekday: 'long'});
  const time = tmp.toLocaleString('ru', {hour: 'numeric', minute: 'numeric',});

  return `${weekday}. ${month} ${day} - ${time}`;
};

// const traceB = new ProductionTrace('2018-01-01 10:00', 10);

const traceB = {
  x: ['2018-01-01 10:00','2018-01-01 20:00'],
  y: [70,80],
  type: 'bar',
  // base: 1,
  width: 1000000,
  // minreducedwidth: 20,
  // line:{
  //   width:1
  // },
  // base: [-40, 10, 50, -45, 0, 15, 60, -20],
  // width: 23,
  // marker: {
  //   color: 'rgba(55,128,191,0.6)',
  //   width: 1
  // },
  // text: ['A', 'B', 'C'],
  // texttemplate: '%{text}<br>hhhhh',
  // textposition: 'bottom center',
  hovertemplate:
            '%{x} <br>' +
            'Добыто (сутки): <b>%{y}<b> тыс.м',
  getDate() {
    return transformDate(this.x[0]);
  }

};

const traceC = {
  x: ['2018-01-01 10:00','2018-01-01 15:00', '2018-01-01 16:00'],
  y: [10,40, 50],
  type: 'scatter'

};

const traceD = {
  x: ['2018-01-01 16:00', '2018-01-02'],
  y: [50,120],
  type: 'line',
  name: 'dash: dot',
  line: {
    width: 3,
    dash: 'dot',
    color: 'rgb(157, 255, 98)'
  }
};

const data = [ traceA, traceB,];

// const data = [ trace1 ];

const layout = {
  title: 'Скважина 1',
  font: {size: 18},
  xaxis: {
    title: 'Distance travelled along x-axis',
    titlefont: {
      color: 'black',
      size: 12
    },
    // dtick: '2018-01-01 02:00',

    // rangemode: 'tozero'
  },
  yaxis: {
    title: 'Distance travelled along y-axis',
    titlefont: {
      color: 'black',
      size: 12
    },
    dtick: 10,
    // rangemode: 'tozero'
  },
  bargap :200,
};

const config = {responsive: true};

Plotly.newPlot('myDiv', data, layout, config);
