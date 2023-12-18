import NUMBER_OF_MINUTES from '../const';

const INITIAL_GRAF = Object.freeze({
  options: {
    productionNow: 0,

  },

  tracePlan: {
    type: 'scatter',
    mode: 'lines',
    name: 'Нлан на день',
    x: [],
    y: [],
    line: {color: '#17BECF'}
  },

  tracePoint: {
    tmp(){
      return console.log(this.x);

    },
    x: [],
    y: [],
    type: 'bar',
    name: 'Поинт добычи',
    width: 5000000,
    // texttemplate: 'Day: %{x|%A. %b %d. %H-%M}',
    hovertemplate:
              `%{x|%A. %b %d. %H-%M} <br>Добыто (сутки): <b>%{y}</b> тыс.м`,

  },

  traceObtained: {
    x: [],
    y: [],
    type: 'scatter',
    name: 'График добычи',

  },

  traceForecast: {
    x: [],
    y: [],
    type: 'line',
    name: 'Прогноз добычи',
    line: {
      width: 3,
      dash: 'dot',
      color: 'rgb(157, 255, 98)'
    },
    hovertemplate:
    '%{x} <br>' +
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

const changeObtained = (state, planValue) => {
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

  if(newState.options.productionNow >= Number(planValue)) {
    newState.tracePlan.line.color = '#14b814';
  }
  newState.options.productionNow = acc;
  return newState;
};

const changeForecast = (state, date) => {
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
  return newState;
};

function getNextDate(date){
  let nexDayDate = new Date(date);
  nexDayDate.setDate(nexDayDate.getDate() + 1);
  nexDayDate = nexDayDate.toISOString().split('T')[0];
  return nexDayDate;
}

export {INITIAL_GRAF, changePlan, changePoint, changeObtained, changeForecast};
