import AbstractView from '../view/abstract-view.js';

export default class GrafView extends AbstractView {
  constructor(data) {
    super('div', { classes: ['graf'] });
    this.model = data;
  }

  get template() {
    return '<div id=\'graf\'> </div>';
  }

  bind() {
    const graf = this.element.querySelector('#graf');
    console.log(this.model.state.tracePlan)
    const data = [this.model.state.tracePlan];

    const layout = {
      title: 'Скважина 1',
      font: {size: 18},
      xaxis: {
        title: 'Distance travelled along x-axis',
        titlefont: {
          color: 'black',
          size: 12
        },
      },
      yaxis: {
        title: 'Distance travelled along y-axis',
        titlefont: {
          color: 'black',
          size: 12
        },
        dtick: 10,
      },
      bargap :200,
    };

    const config = {responsive: true};

    Plotly.newPlot(graf, data, layout, config);
  }
}
