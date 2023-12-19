import GrafView from '../view/graf-view.js';
import TabsView from '../view/tabs-view.js';

export default class GrafScreen {
  constructor(model) {
    this.model = model;
    this.root = document.createElement('div');
    this.startGraf = this.startGraf.bind(this);
    this.restartGraf = this.restartGraf.bind(this);

    this.startGraf();
  }

  get element() {
    return this.root;
  }

  startGraf() {
    console.log('reset');
    this.model.changePlan();
    this.graf = new GrafView(this.model);
    this.grafTabs = new TabsView();

    this.grafTabs.onAnswer = this.onAnswer.bind(this);

    this.root.appendChild(this.graf.element);
    this.root.appendChild(this.grafTabs.element);
  }

  restartGraf() {
    const graf = new GrafView(this.model);
    this.root.replaceChild(graf.element, this.graf.element);
    this.graf = graf;
  }


  onAnswer(pointValue, pointTime) {
    this.model.addPoint(Number(pointValue), pointTime);
    this.model.changeObtained();
    this.model.changeForecast();
    this.restartGraf();
  }
}
