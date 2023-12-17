import {INITIAL_GRAF, changePlan} from '../utils/bisnes-function.js';

export default class GrafModel {
  constructor(planValue) {
    this.planValue = planValue;
    this.restart();
    this.changePlan();
    console.log('create');
  }

  restart() {
    this._state = INITIAL_GRAF;
  }

  get state() {
    return Object.freeze(this._state);
  }

  getTracePlan() {
    return this._state.tracePlan;
  }

  changePlan() {
    return changePlan(this._state.tracePlan, this.planValue);
  }
}
