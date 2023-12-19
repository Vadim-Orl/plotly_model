import {NUMBER_OF_MINUTES, WIDTH_BAR, GRAF_STYLE} from '../const';

const INITIAL_GRAF = Object.freeze({
  options: {
    productionNow: 0,

  },

  tracePlan: {
    type: 'scatter',
    mode: 'lines',
    name: 'План Добычи',
    fill: 'tozeroy',
    fillcolor: GRAF_STYLE.color.tracePlanFill,
    x: [],
    y: [],
    line: {color: GRAF_STYLE.color.tracePlan},
  },

  tracePoint: {
    x: [],
    y: [],
    type: 'bar',
    name: 'Добыто (час)',
    width: WIDTH_BAR,
    // texttemplate: 'Day: %{x|%A. %b %d. %H-%M}',
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
    hovertemplate:
    '%{x|%A. %b %d. %H-%M} <br>' +
    'Добыто: <b>%{y}</b> тыс.м',
    line: {color: GRAF_STYLE.color.traceObtained}
  },

  traceForecast: {
    x: [],
    y: [],
    type: 'line',
    name: 'Прогноз добычи',
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
  const nexDayDate = getNextDate(planDate);

  const y = [Number(planMax), Number(planMax)];
  const x = [planDate, nexDayDate];
  const newState = { ...state};
  newState.tracePlan.x = x;
  newState.tracePlan.y = y;

  return newState;
};

const changePoint = (state, time, value, date) => {
  if (time.length === 4) {
    time.unshift('0');
  }

  const newState = {...state};
  newState.tracePoint.x.push(`${date} ${time}`);
  newState.tracePoint.y.push(Number(value));
  return newState;
};

const changeObtained = (state) => {
  const newState = {...state};
  const mapPoint = [];

  newState.tracePoint.x.forEach((el, index) => {
    mapPoint.push({name: el, value: state.tracePoint.y[index]});
  });

  mapPoint.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  let acc = 0;

  mapPoint.forEach((el, index) => {
    acc += el.value;
    newState.traceObtained.x[index] = el.name;
    newState.traceObtained.y[index] = acc;
  });

  // newState.tracePoint.text.fill('1');

  newState.options.productionNow = acc;
  return newState;
};

const changeForecast = (state, date, planValue) => {
  const newState = {...state};
  const arrObtained_x = newState.traceObtained.x;
  const arrObtained_y = newState.traceObtained.y;
  newState.traceForecast.x[0] = arrObtained_x[arrObtained_x.length - 1];
  newState.traceForecast.y[0] = arrObtained_y[arrObtained_x.length - 1];

  const dateTmp = new Date(newState.traceForecast.x[0]);
  const minutesNow = (dateTmp.getHours() * 60) + dateTmp.getMinutes();
  console.log(minutesNow);
  // debugger
  const nexDayDate = getNextDate(date);

  newState.traceForecast.x[1] = nexDayDate;
  newState.traceForecast.y[1] = (newState.options.productionNow / minutesNow) * NUMBER_OF_MINUTES;
  console.log('forecast');
  console.log(newState.traceForecast);


  if(newState.traceForecast.y[1] && (newState.traceForecast.y[1] >= Number(planValue))) {
    newState.traceForecast.line.color = GRAF_STYLE.color.traceForecastDone;
  }

  return newState;
};

function getNextDate(date){
  let nexDayDate = new Date(date);
  nexDayDate.setDate(nexDayDate.getDate() + 1);
  nexDayDate = nexDayDate.toISOString().split('T')[0];
  return nexDayDate;
}

export {INITIAL_GRAF, changePlan, changePoint, changeObtained, changeForecast};
