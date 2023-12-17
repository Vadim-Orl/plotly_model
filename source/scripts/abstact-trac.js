export default class AbstacTrace {
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

    const day = tmp.toLocaleString('ru', {day: 'numeric'});
    const month = tmp.toLocaleString('ru', {month: 'long'});
    const weekday = tmp.toLocaleString('ru', {weekday: 'long'});
    const time = tmp.toLocaleString('ru', {hour: 'numeric', minute: 'numeric',});

    return `${weekday}. ${month} ${day} - ${time}`;
  }
}
