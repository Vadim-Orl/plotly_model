import utils from '../utils/utils.js';
import GrafScreen from '../model/graf-screen.js';
import PlanTabsView from '../view/plan-tabs-veiw.js';
import TabsView from '../view/tabs-view.js';
import GrafModel from '../model/graf-model.js';

export default class Router {
  static getPlan() {
    const planTabsScreen = new PlanTabsView();
    utils.showScreen(utils.newCentralContainer(planTabsScreen));
  }

  static start(planValue, planDate) {
    const grafModel = new GrafModel(planValue, planDate);

    const grafScreen = new GrafScreen(grafModel);
    // const grafTabsScreen = new TabsView();
    utils.showScreen(utils.newCentralContainer(grafScreen));
  }

}
