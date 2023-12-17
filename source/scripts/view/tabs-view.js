import AbstractView from './abstract-view.js';

export default class TabsView extends AbstractView {
  constructor() {
    super('div', { classes: ['graf-tabs'] });
  }

  get template() {
    return `
    <form>
     <label>
       <input type="time" class="point point__time" value="10:00">
     </label>
     <label>
         <input type="number" step="1" min="1" max="300" value="100" id="age" name="age" class="point point__value"/>
       </label>
    <input type="button" value="Добавить" class="button button__point"/>
   </form>`;
  }

  // onAnswer(pointValue, pointTime){
  // }

  bind() {
    // console.log('state');
    const pointValue = this._element.querySelector('.point__value');
    const pointTime = this._element.querySelector('.point__time');
    console.log(pointValue, pointTime);

    this._element.querySelector('.button__point').addEventListener('click', (evt) => {
      evt.preventDefault();

      this.onAnswer(pointValue.value, pointTime.value);
    });
  }
}
