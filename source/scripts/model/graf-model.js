import {INITIAL_GRAF, changePlan, changePoint, changeObtained, changeForecast} from '../utils/bisnes-function.js';

export default class GrafModel {
  constructor(planValue = 0, planDate = new Date().toISOString().split('T')[0]) {
    this.planValue = planValue;
    this.planDate = planDate;
    this.restart();
    this.changePlan();
  }

  restart() {
    console.log('init');
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

  changePlan(value = 0) {
    this.planValue = value;
    this._state = changePlan(this._state, this.planValue, this.planDate);
  }

  addPoint(value, time) {
    this._state = changePoint(this._state, time, value, this.planDate);
  }

  changeObtained() {
    this._state = changeObtained(this._state);
  }

  changeForecast() {
    this._state = changeForecast(this._state, this.planDate, this.planValue);
  }
}
