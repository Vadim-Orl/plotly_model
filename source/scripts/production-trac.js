
export default class ProductionTrace {
  constructor(x, y) {
    // this.map = new Map(x, y);
    this.x = x;
    this.y = y;
    this.type = 'bar';
    this.hovertemplate =
            '%{x} <br>' +
            'Добыто (сутки): <b>%{y}<b> тыс.м';
  }

  // push(x, y) {

  // }
}
