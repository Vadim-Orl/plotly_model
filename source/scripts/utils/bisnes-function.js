import {NUMBER_OF_MINUTES, WIDTH_BAR, GRAF_STYLE} from '../const';

const INITIAL_GRAF = Object.freeze({
  options: {
    productionNow: 0,
  },

  tracePlan: {
    x: [],
    y: [],
    type: 'scatter',
    mode: 'lines',
    name: 'План Добычи',
    fill: 'tozeroy',
    fillcolor: GRAF_STYLE.color.tracePlanFill,
    line: {color: GRAF_STYLE.color.tracePlan},
  },

  tracePoint: {
    x: [],
    y: [],
    type: 'bar',
    name: 'Добыто (час)',
    width: WIDTH_BAR,
    hovertemplate:
              '%{x|%A. %b %d. %H-%M} <br>' +
              'Добыто (сутки): <b>%{y}</b> тыс.м',
    marker: {color: GRAF_STYLE.color.tracePoint}
  },

  traceObtained: {
    x: [],
    y: [],
    text:[],
    type: 'scatter',
    name: 'Добыто (сутки)',
    mode: 'lines+markers+text',
    textposition: 'top center',
    hovertemplate:
    '%{x|%A. %b %d. %H-%M} <br>' +
    'Добыто: <b>%{y}</b> тыс.м',
    line: {
      color: GRAF_STYLE.color.traceObtained
    }
  },

  traceForecast: {
    x: [],
    y: [],
    text: [],
    type: 'line',
    name: 'Прогноз добычи',
    mode: 'lines+markers+text',
    textposition: 'center left',
    line: {
      width: 3,
      dash: 'dot',
      color: GRAF_STYLE.color.traceForecast,
    },
    hovertemplate:
    '%{x|%A. %b %d. %H-%M} <br>' +
    'Прогноз добычи: <b>%{y}</b> тыс.м',
  },
});

const changePlan = (state, planMax, planDate) => {
  const newState = JSON.parse(JSON.stringify(state));

  const nexDayDate = getNextDate(planDate);

  const y = [planMax, planMax];
  const x = [planDate, nexDayDate];

  newState.tracePlan.x = x;
  newState.tracePlan.y = y;

  return newState;
};

const changePoint = (state, time, value, date) => {
  if (time.length === 4) {
    time.unshift('0');
  }

  const newState = JSON.parse(JSON.stringify(state));

  newState.tracePoint.x.push(`${date} ${time}`);
  newState.tracePoint.y.push(value);
  return newState;
};

const changeObtained = (state) => {
  const newState = JSON.parse(JSON.stringify(state));
  const mapBar = [];
  const { tracePoint, traceObtained} = newState;

  if(tracePoint.x.length === 0) {
    return newState;
  }

  tracePoint.x.forEach((el, index) => {
    mapBar.push({name: el, value: tracePoint.y[index]});
  });

  mapBar.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  let acc = 0;

  mapBar.forEach((el, index) => {
    acc += el.value;
    traceObtained.x[index] = el.name;
    traceObtained.y[index] = acc;
  });

  traceObtained.text.length = mapBar.length - 1;
  traceObtained.text.fill('');
  traceObtained.text.push(traceObtained.y[traceObtained.y.length - 1]);

  newState.options.productionNow = acc;


  return newState;
};

const changeForecast = (state, date, planValue) => {
  const newState = JSON.parse(JSON.stringify(state));

  const {traceObtained, traceForecast} = newState;

  traceForecast.x[0] = traceObtained.x[traceObtained.x.length - 1];
  traceForecast.y[0] = traceObtained.y[traceObtained.y.length - 1];

  const dateTmp = new Date(newState.traceForecast.x[0]);
  const minutesNow = (dateTmp.getHours() * 60) + dateTmp.getMinutes();
  const nexDayDate = getNextDate(date);

  traceForecast.y[1] = (newState.options.productionNow / minutesNow) * NUMBER_OF_MINUTES;
  traceForecast.x[1] = nexDayDate;

  if(traceForecast.y[1] && (traceForecast.y[1] >= planValue)) {
    traceForecast.line.color = GRAF_STYLE.color.traceForecastDone;
  }else {
    traceForecast.line.color = GRAF_STYLE.color.traceForecast;
  }

  traceForecast.text = ['', traceForecast.y[1]];

  return newState;
};

function getNextDate(date){
  let nexDayDate = new Date(date);
  nexDayDate.setDate(nexDayDate.getDate() + 1);
  nexDayDate = nexDayDate.toISOString().split('T')[0];
  return nexDayDate;
}

export {INITIAL_GRAF, changePlan, changePoint, changeObtained, changeForecast};
