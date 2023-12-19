import {INITIAL_GRAF, changePlan, changePoint, changeObtained, changeForecast} from '../utils/bisnes-function.js';

export default class GrafModel {
  constructor(planValue, planDate) {
    this.planValue = Number(planValue);
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
    return [
      this.getTracePlan(),
      this.getTraceForecast(),
      this.getTraceObtained(),
      this.getTracePoint(),

    ];
  }

  getTracePlan() {
    return this._state.tracePlan;
  }

  getTracePoint() {
    return this._state.tracePoint;
  }

  getTraceObtained() {
    return this._state.traceObtained;
  }

  getTraceForecast() {
    return this._state.traceForecast;
  }

  changePlan() {
    this._state = changePlan(this._state, this.planValue, this.planDate);
  }

  addPoint(value,time) {
    this._state = changePoint(this._state, time, value, this.planDate);
  }

  changeObtained() {
    changeObtained(this._state);
  }

  changeForecast() {
    changeForecast(this._state, this.planDate, this.planValue);
  }
}
