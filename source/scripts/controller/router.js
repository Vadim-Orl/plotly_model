import utils from '../utils/utils.js';
import GrafView from '../view/graf-view.js';
import PlanTabsView from '../view/plan-tabs-veiw.js';
import TabsView from '../view/tabs-view.js';
import GrafModel from '../model/graf-model.js';

export default class Router {
  static getPlan() {
    const planTabsScreen = new PlanTabsView();
    utils.showScreen(utils.newCentralContainer(planTabsScreen));
  }

  static start(planMax) {
    const grafModel = new GrafModel(planMax);

    const grafScreen = new GrafView(grafModel);
    const grafTabsScreen = new TabsView();
    utils.showScreen(utils.newCentralContainer(grafScreen, grafTabsScreen));
  }

}
