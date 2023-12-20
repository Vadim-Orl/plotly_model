// source/scripts/еьз/abstact-trac.js
var AbstacTrace = class {
  constructor(x, y) {
    this.x = [x];
    this.y = [y];
  }
  addPoint(x, y) {
    this.x.push(x);
    this.y.push(y);
  }
  transformDate(date) {
    const tmp = new Date(date);
    const day = tmp.toLocaleString("ru", { day: "numeric" });
    const month = tmp.toLocaleString("ru", { month: "long" });
    const weekday = tmp.toLocaleString("ru", { weekday: "long" });
    const time = tmp.toLocaleString("ru", { hour: "numeric", minute: "numeric" });
    return `${weekday}. ${month} ${day} - ${time}`;
  }
};

// source/scripts/еьз/plan.js
var PlanLine = class extends AbstacTrace {
  constructor(x, y) {
    super(x, y);
    this.addPoint(this.nextDate(), y);
    this.type = "scatter";
    this.mode = "lines";
    this.line = { color: "#17BECF" };
  }
  nextDate() {
    const today = /* @__PURE__ */ new Date();
    return new Date(this.transformDate(today.setDate(today.getDate() + 1)));
  }
};

// source/scripts/tmp.js
var planLine = new PlanLine("2018-01-01", 100);
var traceA = {
  type: "scatter",
  mode: "lines",
  x: ["2018-01-01", "2018-01-02"],
  y: [100, 100],
  line: { color: "#17BECF" }
};
var transformDate = (date) => {
  console.log(date);
  const tmp = new Date(date);
  const day = tmp.toLocaleString("ru", { day: "numeric" });
  const month = tmp.toLocaleString("ru", { month: "long" });
  const weekday = tmp.toLocaleString("ru", { weekday: "long" });
  const time = tmp.toLocaleString("ru", { hour: "numeric", minute: "numeric" });
  return `${weekday}. ${month} ${day} - ${time}`;
};
var traceB = {
  x: ["2018-01-01 10:00", "2018-01-01 20:00"],
  y: [70, 80],
  type: "bar",
  // base: 1,
  width: 1e6,
  // minreducedwidth: 20,
  // line:{
  //   width:1
  // },
  // base: [-40, 10, 50, -45, 0, 15, 60, -20],
  // width: 23,
  // marker: {
  //   color: 'rgba(55,128,191,0.6)',
  //   width: 1
  // },
  // text: ['A', 'B', 'C'],
  // texttemplate: '%{text}<br>hhhhh',
  // textposition: 'bottom center',
  hovertemplate: "%{x} <br>\u0414\u043E\u0431\u044B\u0442\u043E (\u0441\u0443\u0442\u043A\u0438): <b>%{y}<b> \u0442\u044B\u0441.\u043C",
  getDate() {
    return transformDate(this.x[0]);
  }
};
var data = [traceA, traceB];
var layout = {
  title: "\u0421\u043A\u0432\u0430\u0436\u0438\u043D\u0430 1",
  font: { size: 18 },
  xaxis: {
    title: "Distance travelled along x-axis",
    titlefont: {
      color: "black",
      size: 12
    }
    // dtick: '2018-01-01 02:00',
    // rangemode: 'tozero'
  },
  yaxis: {
    title: "Distance travelled along y-axis",
    titlefont: {
      color: "black",
      size: 12
    },
    dtick: 10
    // rangemode: 'tozero'
  },
  bargap: 200
};
var config = { responsive: true };
Plotly.newPlot("myDiv", data, layout, config);
//# sourceMappingURL=tmp.js.map
