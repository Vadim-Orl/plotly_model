import {INITIAL_GRAF, changePlan, changePoint, changeObtained, changeForecast} from '../utils/bisnes-function.js';
import { T_INITIAL_GRAF } from '../../type/type.js';

export default class GrafModel {
  planValue: number;
  planDate: string;
  _state: T_INITIAL_GRAF | null;

  constructor(planValue = 0, planDate = new Date().toISOString().split('T')[0]) {
    this.planValue = planValue ;
    this.planDate = planDate;
    this._state = null;
    this.restart();
    this.changePlan();
  }

  restart() {
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
     if (this._state !== null)  return this._state.tracePlan;
  }

  getTracePoint() {
    if (this._state !== null) return this._state.tracePoint;
  }

  getTraceObtained() {
    if (this._state !== null)  return this._state.traceObtained;
  }

  getTraceForecast() {
    if (this._state !== null) return this._state.traceForecast;
  }

  changePlan(value = 0):void {
    this.planValue = value;
    this._state = changePlan(this._state, this.planValue, this.planDate);
  }

  addPoint(value : number, time : string):void {
    this._state = changePoint(this._state, time, value, this.planDate);
  }

  changeObtained():void {
    this._state = changeObtained(this._state);
  }

  changeForecast():void {
    this._state = changeForecast(this._state, this.planDate, this.planValue);
  }
}
