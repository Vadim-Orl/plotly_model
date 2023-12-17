import {INITIAL_GRAF, changePlan, changePoint} from '../utils/bisnes-function.js';

export default class GrafModel {
  constructor(planValue, planDate) {
    this.planValue = planValue;
    this.planDate = planDate;
    this.start();
    // this.changePlan();
  }

  start() {
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

  addPoint(value,time) {
    console.log('addpoint' + time + value);
    this._state = changePoint(this._state, time, value, this.planDate);
  }
}
