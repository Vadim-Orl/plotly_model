import utils from '../utils/utils.js';
import GrafScreen from '../model/graf-screen.js';
import PlanTabsView from '../view/plan-tabs-veiw.js';
import TabsView from '../view/tabs-view.js';
import GrafModel from '../model/graf-model.js';

export default class Router {
  static reset() {
    const grafModel = new GrafModel();
    const planTabsScreen = new PlanTabsView(grafModel);
    utils.showScreen(utils.newCentralContainer(planTabsScreen));
  }

  static start(planValue) {
    console.log('router')
    const grafModel = new GrafModel(planValue);
    console.log(grafModel)
    const grafScreen = new GrafScreen(grafModel);
    // const grafTabsScreen = new TabsView();
    utils.showScreen(utils.newCentralContainer(grafScreen));
  }





}
