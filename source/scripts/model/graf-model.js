import {INITIAL_GRAF, changePlan} from '../utils/bisnes-function.js';

export default class GrafModel {
  constructor(planValue, planDate) {
    this.planValue = planValue;
    this.planDate = planDate;
    this.restart();
    // this.changePlan();
  }

  restart() {
    console.log(this.planDate)
    this._state = INITIAL_GRAF;
  }

  get state() {
    return Object.freeze(this._state);
  }

  getDataTrace() {
    return [this.getTracePlan(), this.getTracePoint()];
  }

  getTracePlan() {
    return this._state.tracePlan;
  }

  getTracePoint() {
    return this._state.tracePoint;
  }

  changePlan() {
    this._state = changePlan(this._state, this.planValue, this.planDate);
  }
}
