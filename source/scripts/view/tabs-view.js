import { th } from 'plotly.js-locales';
import AbstractView from './abstract-view.js';

export default class TabsView extends AbstractView {
  constructor() {
    super('div', { classes: ['graf-tabs'] });
    // this.planValue = model.planValue;
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
    // console.log('state');
    const pointValue = this._element.querySelector('.point__value');
    const pointTime = this._element.querySelector('.point__time');


    this._element.querySelector('.form__tabs-add-bar').addEventListener('submit', (evt) => {
      evt.preventDefault();

      this.onAnswer(pointValue.value, pointTime.value);
    });



    // const planValue = this._element.querySelector('.plan-value');
    // const formPlan = this._element.querySelector('.form__change-plan');

    // formPlan.addEventListener('submit', (evt) => {
    //   console.log(planValue.value)
    //   evt.preventDefault();
    //   const date = new Date();
    //   this.onAnswer(Number(planValue.value), date.toISOString().split('T')[0]);
    // });

  }
}
