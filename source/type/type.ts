type TColor = {
  tracePlan: string;
  tracePlanFill: string;
  tracePoint: string;
  traceObtained: string;
  traceForecastDone: string;
  traceForecast: string;
}

type T_GRAF_STYLE = {
  color: TColor;
};

type TTraceLine = {
  width?: number;
  dash?: string;
  color: string;
};

type TTraceForecast = {
  x: string[];
  y: number[];
  text: string[];
  type: string;
  name: string;
  mode: string;
  textposition: string;
  line: TTraceLine;
  hovertemplate: string;
};

type T_tracePlan = {
  x: string[];
  y: number[];
  type: string;
  name: string;
  mode: string;
  fill: string,
  fillcolor: string,
  line: TTraceLine,
};

type TTracePoint = {
  x: string[];
  y: number[];
  type: string;
  name: string;
  width: number,
  hovertemplate: string;
  marker: {color: string};
};

type TTraceObtained = {
  x: string[];
  y: number[];
  text: string[];
  type: string;
  name: string;
  mode: string;
  textposition: string;
  hovertemplate: string;
  line: TTraceLine;
};

type T_INITIAL_GRAF = {
  options: {
    productionNow: number,
  };
  tracePlan: T_tracePlan;
  traceObtained: TTraceObtained;
  tracePoint: TTracePoint;
  traceForecast: TTraceForecast
};

export type {T_INITIAL_GRAF, TTraceObtained, TTracePoint, T_tracePlan, TTraceForecast, TTraceLine, T_GRAF_STYLE};
