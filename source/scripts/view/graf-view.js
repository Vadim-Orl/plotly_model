
import AbstractView from '../view/abstract-view.js';

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
    const data = this.state.getDataTrace();

    const layout = {
      width: document.documentElement.clientWidth - 20,
      selections:{opacity: 0.2},
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

    const config = {responsive: true};

    Plotly.newPlot(graf, data, layout, config);
  }
}
