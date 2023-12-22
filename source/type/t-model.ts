import { T_INITIAL_GRAF } from './type.ts'

type TGrafModel = {
  planValue: number;
  planDate: string;
  _state?: T_INITIAL_GRAF | null| undefined;

  changePlan: Function;
  addPoint: Function;
  changeObtained: Function;
  changeForecast: Function;
  getDataTrace: Function;
};

type TState = {
  // model: TGrafModel;
  // root: HTMLDivElement;
  // graf: any;
  // grafTabs: any;
  // grafPlan: any;

}


export type {TGrafModel, TState};

