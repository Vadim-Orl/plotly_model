
import AbstractView from '../view/abstract-view.js';
import * as localeDictionary from 'plotly.js/lib/locales/pt-br.js';

export default class GrafView extends AbstractView {
  constructor(state) {
    super('div', { classes: ['graf'] });
    this.state = state;
  }

  get template() {
    return '<div id=\'graf\'> </div>';
  }

  bind() {
    const graf = this.element.querySelector('#graf');
    console.log('state - ---- ');
    console.log(this.state);
    const data = this.state.getDataTrace();

    const layout = {
      // showlegend: false,
      width: '100%',
      legend: {'orientation': 'h',
        x: 0,
        y: 100,
        traceorder: 'normal',
        font: {
          family: 'sans-serif',
          size: 8,
          color: '#000'
        }},
      title: 'Скважина 1',
      font: {size: 18},
      xaxis: {
        // title: 'Distance travelled along x-axis',
        titlefont: {
          color: 'black',
          size: 12
        },
      },
      yaxis: {
        title: 'Дебит',
        titlefont: {
          color: 'black',
          size: 18
        },
        dtick: 20,
      },
      bargap :200,
    };
    // locale.setlocale(locale.LC_TIME, 'de_DE')
    console.log('1111111111111111111111111111');
    const config = {responsive: true};
    console.log(config);

    Plotly.newPlot(graf, data, layout, config);
  }
}
