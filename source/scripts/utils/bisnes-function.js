
const INITIAL_GRAF = Object.freeze({
  tracePlan: {
    type: 'scatter',
    mode: 'lines',
    x: ['2018-01-01', '2018-01-02'],
    y: [100, 100],
    line: {color: '#17BECF'}
  },

});

// const changePlan = (graf, planMax) => {

//   const newGraf = { ...graf, x: [planMax,planMax] };
//   return newGraf;
// };

export default INITIAL_GRAF;
