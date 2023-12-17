
const INITIAL_GRAF = Object.freeze({
  tracePlan: {
    type: 'scatter',
    mode: 'lines',
    x: ['2018-01-01', '2018-01-02'],
    y: [93, 93],
    line: {color: '#17BECF'}
  },

  tracePoint: {
    x: ['2018-01-01 10:00','2018-01-01 20:00'],
    y: [70,80],
    type: 'bar',
    width: 1000000,
    hovertemplate:
              '%{x} <br>' +
              'Добыто (сутки): <b>%{y}<b> тыс.м',

  },
});

const changePlan = (state, planMax, planDate) => {
  let nexDayDate = new Date(planDate);
  nexDayDate.setDate(nexDayDate.getDate() + 1);
  nexDayDate = nexDayDate.toISOString().split('T')[0];

  const y = [Number(planMax), Number(planMax)];
  const x = [planDate, nexDayDate];
  const newGraf = { ...state};
  newGraf.tracePlan.x = x;
  newGraf.tracePlan.y = y;

  return newGraf;
};

const changePoint = (state, time, value) => {

}

export {INITIAL_GRAF, changePlan};
