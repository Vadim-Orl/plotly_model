import INITIAL_GRAF from '../utils/bisnes-function.js';

export default class GrafModel {
  constructor(planValue) {
    this.planValue = planValue;
    this.restart();
    console.log('create');
  }

  restart() {
    this._state = INITIAL_GRAF;
  }

  get state() {
    return Object.freeze(this._state);
  }

  getracePlan() {
    return this._state.INITIAL_GRAF.tracePlan;
  }
}
