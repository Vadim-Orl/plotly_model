import AbstractView from './abstract-view.js';

export default class TabsView extends AbstractView {
  constructor() {
    super('div', { classes: ['graf-tabs'] });
  }

  get template() {
    return `
    <form action="" class="form form__tabs-add-bar">

     <label>
     Время:
       <input type="time" class="point point__time" value="02:00">
     </label>
     <label>
     Количество (км.м.):
         <input type="number" step="1" min="1" max="300" value="10" id="age" name="age" class="point point__value"/>
       </label>
    <input type="submit" value="Добавить" class="button button__point"/>
   </form>
   `;
  }

  bind() {
    const pointValue = this._element.querySelector('.point__value');
    const pointTime = this._element.querySelector('.point__time');

    this._element.querySelector('.form__tabs-add-bar').addEventListener('submit', (evt) => {
      evt.preventDefault();

      this.onAnswer(pointValue.value, pointTime.value);
    });

  }
}
