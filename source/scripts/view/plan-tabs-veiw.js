import AbstractView from './abstract-view.js';
import Router from '../controller/router.js';

export default class PlanTabsView extends AbstractView {
  constructor() {
    super('div', { classes: ['plan-tabs'] });
  }

  get template() {
    return `
    <form>
     <label>
         <input type="number" step="10" min="1" max="300" value="100" class="plan-value" name="plan-value" />
      </label>
      <label>
         <input type="date" value="2018-01-01" min="2018-01-01" max="2018-12-31" class="plan-date" name="plan-data" />
      </label>
     <input type="button" class="button button__plan" value="Добавить">
   </form>`;
  }

  onAnswer(planValue, planDate) {
    Router.start(planValue, planDate);
  }

  bind() {
    const planValue = this._element.querySelector('.plan-value');
    const planDate = this._element.querySelector('.plan-date');

    this._element.querySelector('.button__plan').addEventListener('click', (evt) => {
      evt.preventDefault();
      console.log(planDate.value)
      this.onAnswer(planValue.value, planDate.value);
    });
  }
}
