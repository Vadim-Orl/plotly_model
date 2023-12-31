// source/scripts/utils/utils.js
var mainNode = document.querySelector(".central");
var screenContainer = document.createElement("div");
screenContainer.classList.add("central__content");
var clearMainElement = () => {
  mainNode.innerHTML = "";
};
var utils_default = {
  showScreen: (element) => {
    clearMainElement();
    mainNode.append(element);
  },
  newCentralContainer(...listEl) {
    screenContainer.innerHTML = "";
    listEl.forEach((el) => {
      screenContainer.appendChild(el.element);
    });
    return screenContainer;
  }
};

// source/scripts/view/abstract-view.ts
var render = (template, tag, classes) => {
  const newNode = document.createElement(tag);
  classes.forEach((el) => {
    newNode.classList.add(el);
  });
  newNode.innerHTML = template;
  return newNode;
};
var AbstractView = class _AbstractView {
  bind(_element) {
    throw new Error("Method not implemented.");
  }
  constructor(tag = "div", classes) {
    if (new.target === _AbstractView) {
      throw new Error("Can't instantiate AbstractView, only concrete one");
    }
    this.tag = tag;
    this.classes = classes;
  }
  get template() {
    throw new Error("Template is required");
    return "";
  }
  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    if (this.bind !== void 0)
      this.bind(this._element);
    return this._element;
  }
  render() {
    return render(this.template, this.tag, this.classes);
  }
};
var abstract_view_default = AbstractView;

// source/scripts/view/graf-view.ts
var GrafView = class extends abstract_view_default {
  constructor(state) {
    super("div", ["graf"]);
    this.state = state;
  }
  get template() {
    return "<div id='graf'> </div>";
  }
  bind() {
    const graf = this.element.querySelector("#graf");
    const data = this.state.getDataTrace();
    const layout = {
      width: document.documentElement.clientWidth - 20,
      selections: { opacity: 0.2 },
      legend: {
        "orientation": "h",
        x: 0,
        y: 100,
        traceorder: "normal",
        font: {
          family: "sans-serif",
          size: 8,
          color: "#000"
        }
      },
      title: "\u0421\u043A\u0432\u0430\u0436\u0438\u043D\u0430 1",
      font: { size: 18 },
      xaxis: {
        titlefont: {
          color: "black",
          size: 12
        }
      },
      yaxis: {
        title: "\u0414\u0435\u0431\u0438\u0442",
        titlefont: {
          color: "black",
          size: 18
        },
        dtick: 20
      },
      bargap: 200
    };
    const config = { responsive: true };
    Plotly.newPlot(graf, data, layout, config);
  }
};

// source/scripts/view/plan-tabs-veiw.ts
var PlanTabsView = class extends abstract_view_default {
  constructor(model) {
    super("div", ["plan-tabs"]);
    this.model = model;
    this.planValue = model.planValue;
  }
  get template() {
    return `
    <div class="modal-form modal-form--opened">
      <button class="form-toggle" disabled="disabled">
        <span class="visually-hidden">\u0417\u0430\u043A\u0440\u044B\u0442\u044C</span>
      </button>
      <form action=""  class="form form__plan" >

      <fieldset>
      <legend>\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u043B\u0430\u043D \u043D\u0430 \u0434\u0435\u043D\u044C</legend>
       <label>
       <p>
          \u041F\u043B\u0430\u043D (\u0442\u044B\u0441.\u043C):
           <input type="number" step="10" min="100" max="200" value="100" class="plan-value" name="plan-value" />
        </label>
        </p>
        <p>
       <input type="submit" class="button button__plan" value="\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C">
       <p/>
       </fieldset>
      </form>
    </div>
    <div class="btns-plan-wrapper">
      <button class="button button__plan--change hidden">\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u043B\u0430\u0430\u043D</button>
      <button class="button button__plan--reset hidden">\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0433\u0440\u0430\u0444\u0438\u043A</button>
    </div>
    <div class="milk-shadow shadow__true"></div>
    `;
  }
  onAnswer(planValue) {
    if (this.changePlan !== void 0) {
      this.changePlan(planValue);
    }
  }
  bind() {
    if (this._element !== void 0) {
      const planValue = this._element.querySelector(".plan-value");
      const formPlan = this._element.querySelector(".form__plan");
      const modalForm = this._element.querySelector(".modal-form");
      const btnClose = this._element.querySelector(".form-toggle");
      const btnResetPlan = this._element.querySelector(".button__plan--reset");
      const btnChangePlan = this._element.querySelector(".button__plan--change");
      const shadowDiv = this._element.querySelector(".milk-shadow");
      formPlan?.addEventListener("submit", (evt) => {
        evt.preventDefault();
        if (planValue !== null) {
          this.onAnswer(Number(planValue.value));
        }
        modalForm?.classList.add("hidden");
        modalForm?.classList.remove("form__plan--opened");
        btnResetPlan?.classList.remove("hidden");
        btnChangePlan?.classList.remove("hidden");
        shadowDiv?.classList.toggle("shadow__false");
        shadowDiv?.classList.toggle("shadow__true");
      });
      btnChangePlan?.addEventListener("click", (evt) => {
        evt.preventDefault();
        if (btnClose !== null) {
          btnClose.disabled = false;
        }
        modalForm?.classList.remove("hidden");
        modalForm?.classList.add("form__plan--opened");
        shadowDiv?.classList.toggle("shadow__false");
        shadowDiv?.classList.toggle("shadow__true");
      });
      btnResetPlan?.addEventListener("click", (evt) => {
        evt.preventDefault();
        Router.start(Number(planValue));
      });
      btnClose?.addEventListener("click", (evt) => {
        evt.preventDefault();
        modalForm?.classList.add("hidden");
        modalForm?.classList.remove("form__plan--opened");
        shadowDiv?.classList.toggle("shadow__false");
        shadowDiv?.classList.toggle("shadow__true");
      });
    }
  }
};

// source/scripts/view/tabs-view.ts
var TabsView = class extends abstract_view_default {
  constructor() {
    super("div", ["graf-tabs"]);
  }
  get template() {
    return `
    <form action="" class="form form__tabs-add-bar">

     <label>
     \u0412\u0440\u0435\u043C\u044F:
       <input type="time" class="point point__time" value="02:00">
     </label>
     <label>
     \u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E (\u043A\u043C.\u043C.):
         <input type="number" step="1" min="1" max="300" value="10" id="age" name="age" class="point point__value"/>
       </label>
    <input type="submit" value="\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C" class="button button__point"/>
   </form>
   `;
  }
  bind() {
    if (this._element !== void 0) {
      const pointValue = this._element.querySelector(".point__value");
      const pointTime = this._element.querySelector(".point__time");
      const formAddBar = this._element.querySelector(".form__tabs-add-bar");
      formAddBar?.addEventListener("submit", (evt) => {
        evt.preventDefault();
        if (pointValue && pointTime) {
          this.onAnswer(Number(pointValue.value), pointTime.value);
        }
      });
    }
  }
  onAnswer(value, value1) {
    throw new Error("Method not implemented.");
  }
};

// source/scripts/model/graf-screen.ts
var GrafScreen = class {
  constructor(model) {
    this.model = model;
    this.root = document.createElement("div");
    this.startGraf = this.startGraf.bind(this);
    this.restartGraf = this.restartGraf.bind(this);
    this.startGraf();
  }
  get element() {
    return this.root;
  }
  startGraf() {
    this.graf = new GrafView(this.model);
    this.grafTabs = new TabsView();
    this.grafPlan = new PlanTabsView(this.model);
    this.grafTabs.onAnswer = this.onAnswer.bind(this);
    this.grafPlan.changePlan = this.changePlan.bind(this);
    this.root.appendChild(this.graf.element);
    this.root.appendChild(this.grafTabs.element);
    this.root.appendChild(this.grafPlan.element);
  }
  changeGraf() {
    this.grafTabs = new TabsView();
    this.grafPlan = new PlanTabsView(this.model);
    this.grafTabs.onAnswer = this.onAnswer.bind(this);
    this.root.appendChild(this.graf.element);
    this.root.appendChild(this.grafTabs.element);
    this.root.appendChild(this.grafPlan.element);
  }
  restartGraf() {
    const graf = new GrafView(this.model);
    this.root.replaceChild(graf.element, this.graf.element);
    this.graf = graf;
  }
  changePlan(value) {
    this.model.changePlan(value);
    this.updateModel();
    this.restartGraf();
  }
  onAnswer(pointValue, pointTime) {
    this.model.addPoint(Number(pointValue), pointTime);
    this.updateModel();
    this.restartGraf();
  }
  updateModel() {
    this.model.changeObtained();
    this.model.changeForecast();
  }
};

// source/scripts/const.ts
var NUMBER_OF_MINUTES = 1440;
var WIDTH_BAR = 5e6;
var GRAF_STYLE = {
  color: {
    tracePlan: "#17BECF",
    tracePlanFill: "rgba(0,255,255,0.1)",
    tracePoint: "#32CD32",
    traceObtained: "#8B008B",
    traceForecastDone: "#32CD32",
    traceForecast: "#B22222"
  }
};

// source/scripts/utils/bisnes-function.ts
var INITIAL_GRAF = Object.freeze({
  options: {
    productionNow: 0
  },
  tracePlan: {
    x: [],
    y: [],
    type: "scatter",
    mode: "lines",
    name: "\u041F\u043B\u0430\u043D \u0414\u043E\u0431\u044B\u0447\u0438",
    fill: "tozeroy",
    fillcolor: GRAF_STYLE.color.tracePlanFill,
    line: { color: GRAF_STYLE.color.tracePlan }
  },
  tracePoint: {
    x: [],
    y: [],
    type: "bar",
    name: "\u0414\u043E\u0431\u044B\u0442\u043E (\u0447\u0430\u0441)",
    width: WIDTH_BAR,
    hovertemplate: "%{x|%A. %b %d. %H-%M} <br>\u0414\u043E\u0431\u044B\u0442\u043E (\u0441\u0443\u0442\u043A\u0438): <b>%{y}</b> \u0442\u044B\u0441.\u043C",
    marker: { color: GRAF_STYLE.color.tracePoint }
  },
  traceObtained: {
    x: [],
    y: [],
    text: [],
    type: "scatter",
    name: "\u0414\u043E\u0431\u044B\u0442\u043E (\u0441\u0443\u0442\u043A\u0438)",
    mode: "lines+markers+text",
    textposition: "top center",
    hovertemplate: "%{x|%A. %b %d. %H-%M} <br>\u0414\u043E\u0431\u044B\u0442\u043E: <b>%{y}</b> \u0442\u044B\u0441.\u043C",
    line: {
      color: GRAF_STYLE.color.traceObtained
    }
  },
  traceForecast: {
    x: [],
    y: [],
    text: [],
    type: "line",
    name: "\u041F\u0440\u043E\u0433\u043D\u043E\u0437 \u0434\u043E\u0431\u044B\u0447\u0438",
    mode: "lines+markers+text",
    textposition: "center left",
    line: {
      width: 3,
      dash: "dot",
      color: GRAF_STYLE.color.traceForecast
    },
    hovertemplate: "%{x|%A. %b %d. %H-%M} <br>\u041F\u0440\u043E\u0433\u043D\u043E\u0437 \u0434\u043E\u0431\u044B\u0447\u0438: <b>%{y}</b> \u0442\u044B\u0441.\u043C"
  }
});
var changePlan = (state, planMax, planDate) => {
  const newState = JSON.parse(JSON.stringify(state));
  const nexDayDate = getNextDate(planDate);
  const y = [planMax, planMax];
  const x = [planDate, nexDayDate];
  newState.tracePlan.x = x;
  newState.tracePlan.y = y;
  return newState;
};
var changePoint = (state, time, value, date) => {
  if (time.length === 4) {
    time.unshift("0");
  }
  const newState = JSON.parse(JSON.stringify(state));
  newState.tracePoint.x.push(`${date} ${time}`);
  newState.tracePoint.y.push(value);
  return newState;
};
var changeObtained = (state) => {
  const newState = JSON.parse(JSON.stringify(state));
  const mapBar = [];
  const { tracePoint, traceObtained } = newState;
  if (tracePoint.x.length === 0) {
    return newState;
  }
  tracePoint.x.forEach((el, index) => {
    mapBar.push({ time: el, value: tracePoint.y[index] });
  });
  mapBar.sort((a, b) => {
    if (a.time > b.time) {
      return 1;
    }
    if (a.time < b.time) {
      return -1;
    }
    return 0;
  });
  let acc = 0;
  mapBar.forEach((el, index) => {
    acc += el.value;
    traceObtained.x[index] = el.time;
    traceObtained.y[index] = acc;
  });
  traceObtained.text.length = mapBar.length - 1;
  traceObtained.text.fill("");
  traceObtained.text.push(traceObtained.y[traceObtained.y.length - 1]);
  newState.options.productionNow = acc;
  return newState;
};
var changeForecast = (state, date, planValue) => {
  const newState = JSON.parse(JSON.stringify(state));
  const { traceObtained, traceForecast } = newState;
  traceForecast.x[0] = traceObtained.x[traceObtained.x.length - 1];
  traceForecast.y[0] = traceObtained.y[traceObtained.y.length - 1];
  const dateTmp = new Date(newState.traceForecast.x[0]);
  const minutesNow = dateTmp.getHours() * 60 + dateTmp.getMinutes();
  const nexDayDate = getNextDate(date);
  traceForecast.y[1] = newState.options.productionNow / minutesNow * NUMBER_OF_MINUTES;
  traceForecast.x[1] = nexDayDate;
  if (traceForecast.y[1] && traceForecast.y[1] >= planValue) {
    traceForecast.line.color = GRAF_STYLE.color.traceForecastDone;
  } else {
    traceForecast.line.color = GRAF_STYLE.color.traceForecast;
  }
  traceForecast.text = ["", traceForecast.y[1]];
  return newState;
};
function getNextDate(date) {
  let nexDayDate = new Date(date);
  nexDayDate.setDate(nexDayDate.getDate() + 1);
  return nexDayDate.toISOString().split("T")[0];
}

// source/scripts/model/graf-model.ts
var GrafModel = class {
  constructor(planValue = 0, planDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0]) {
    this.planValue = planValue;
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
      this.getTracePoint()
    ];
  }
  getTracePlan() {
    if (this._state !== null)
      return this._state.tracePlan;
  }
  getTracePoint() {
    if (this._state !== null)
      return this._state.tracePoint;
  }
  getTraceObtained() {
    if (this._state !== null)
      return this._state.traceObtained;
  }
  getTraceForecast() {
    if (this._state !== null)
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
};

// source/scripts/controller/router.ts
var Router = class {
  static reset() {
    const grafModel = new GrafModel();
    const planTabsScreen = new PlanTabsView(grafModel);
    utils_default.showScreen(utils_default.newCentralContainer(planTabsScreen));
  }
  static start(planValue) {
    const grafModel = new GrafModel(planValue);
    const grafScreen = new GrafScreen(grafModel);
    utils_default.showScreen(utils_default.newCentralContainer(grafScreen));
  }
};

// source/scripts/index.ts
Router.start();
//# sourceMappingURL=index.js.map
