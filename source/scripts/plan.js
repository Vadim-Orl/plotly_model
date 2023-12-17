import AbstacTrace from './abstact-trac';

export default class PlanLine extends AbstacTrace{
  constructor(x, y) {
    super(x,y);
    this.addPoint(this.nextDate(), y);
    this.type = 'scatter';
    this.mode = 'lines';
    this.line = {color: '#17BECF'};
  }

  nextDate() {
    const today = new Date();
    return new Date(this.transformDate(today.setDate(today.getDate() + 1)));
  }
}
