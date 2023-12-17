
const INITIAL_GRAF = Object.freeze({
  tracePlan: {
    type: 'scatter',
    mode: 'lines',
    x: ['2018-01-01', '2018-01-02'],
    y: [120, 120],
    line: {color: '#17BECF'}
  },

});

const changePlan = (graf, planMax) => {
  console.log(graf)
  const newGraf = { ...graf, y: [Number(planMax), Number(planMax)] };
  console.log(newGraf)
  return newGraf;
};

export {INITIAL_GRAF, changePlan};
