import GrafView from '../view/graf-view';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.root = document.createElement('div');

    this._timer = null;
    this._timeAnswer = 0;

    this.updateHeader = this.updateHeader.bind(this);
    this.startGame = this.startGame.bind(this);
    this._tick = this._tick.bind(this);
    this.changeLevel = this.changeLevel.bind(this);
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

  startGame() {
    this.garf = new GrafView(this.model.tracePlan);

    this.root.appendChild(this.graf.element);

    this.content.onAnswer = this.onAnswer.bind(this);
    this.content.resizeImages();
    this._tick();
  }

  stopGame() {
    clearInterval(this._timer);
  }


  onAnswer(...answer) {
    this.stopGame();

    const questionBd = this.model.data[this.model.getCurrentLevel()];
    let isCorrectAnsw = false;
    let findElement;

    switch (questionBd.type) {
      case 'singleQuestion':
      case 'doubleQuestion':
        isCorrectAnsw = answer.every((el, index) => (questionBd.options[index].answer === el));
        break;

      case 'tripleQuestion':
        findElement = questionBd.options.find((el) => el.alt === answer[0].alt);
        isCorrectAnsw = (findElement.answer === 'paint');

        break;
      default: throw new Error('Could not process user response. Check database');
    }

    this.model.answer(isCorrectAnsw, this._timeAnswer);

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
