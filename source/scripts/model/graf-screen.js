import GrafView from '../view/graf-view.js';
import PlanTabsView from '../view/plan-tabs-veiw.js';
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
    console.log('start');
    this.graf = new GrafView(this.model);

    this.grafTabs = new TabsView();
    this.grafPlan = new PlanTabsView(this.model);

    this.grafTabs.onAnswer = this.onAnswer.bind(this);
    this.grafPlan.changePlan = this.changePlan.bind(this);

    this.root.appendChild(this.graf.element);
    this.root.appendChild(this.grafTabs.element);
    this.root.appendChild(this.grafPlan.element);
  }

  changeGraf() {
    console.log('change graf');
    this.grafTabs = new TabsView();
    this.grafPlan = new PlanTabsView(this.model);

    this.grafTabs.onAnswer = this.onAnswer.bind(this);

    this.root.appendChild(this.graf.element);
    this.root.appendChild(this.grafTabs.element);
    this.root.appendChild(this.grafPlan.element);
  }

  restartGraf() {
    console.log('restart');
    console.log(this.model);
    const graf = new GrafView(this.model);
    this.root.replaceChild(graf.element, this.graf.element);
    this.graf = graf;
  }

  changePlan(value) {
    // this.model.planValue = value;
    this.model.changePlan(value);

    this.updateModel();
    this.restartGraf();
  }


  onAnswer(pointValue, pointTime) {
    this.model.addPoint(Number(pointValue), pointTime);
    // this.model.planValue = Number(planValue);
    this.updateModel();
    this.restartGraf();
  }

  updateModel() {
    // this.model.changePlan();
    this.model.changeObtained();
    this.model.changeForecast();
  }

}
