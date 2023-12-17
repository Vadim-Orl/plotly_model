import GrafView from '../view/graf-view.js';
import TabsView from '../view/tabs-view.js';

export default class GrafScreen {
  constructor(model) {
    this.model = model;
    this.root = document.createElement('div');
    // this.updateHeader = this.updateHeader.bind(this);
    this.resetGraf = this.resetGraf.bind(this);
    this.resetGraf();
  }

  get element() {
    return this.root;
  }

  // changeLevel() {
  //   this._timeAnswer = 0;
  //   this.updateHeader();
  //   this.updateStatistic();
  //   const levelData = this.model.data[this.model.getCurrentLevel()];
  //   const level = new GameView(levelData, this.model.getCurrentLevel());

  //   this.changeContentView(level);
  //   level.onAnswer = this.onAnswer.bind(this);
  //   level.resizeImages();
  // }

  resetGraf() {
    console.log('reset');
    this.model.changePlan();
    this.graf = new GrafView(this.model);
    this.grafTabs = new TabsView();

    // const tabs = new PlanTabsView();
    this.grafTabs.onAnswer = this.onAnswer.bind(this);
    console.log(this.grafTabs)

    this.root.appendChild(this.graf.element);
    this.root.appendChild(this.grafTabs.element);
  }

  resetGraf2() {

  }


  onAnswer(pointValue, pointDate) {
    console.log('hello');
    
    if (this.model.isGameOver()) {
      this.endGame(true);
    } else if (this.model.hasNextLevel()) {
      this.model.nextLevel();
      this.changeLevel();
    } else {
      this.endGame(false);
    }
  }

  updateHeader() {
    const header = new HeaderView(this.model.state, showPlayerHeader);
    this.root.replaceChild(header.element, this.header.element);
    header.onClick = () => {
      this.stopGame();
      Router.showWellcom();
    };
    this.header = header;
  }

  changeContentView(view) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
  }
}
