
import AbstractView from './abstract-view.js';
import { TGrafModel } from '../../type/t-model.js';

export default class GrafView extends AbstractView {
  state: TGrafModel;

  constructor(state: TGrafModel) {
    super('div', ['graf'] );
    this.state = state;
    // this.bind= this.bind;
  };

  get template() {
    return '<div id=\'graf\'> </div>';
  };

  bind():void {

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
  };
};
