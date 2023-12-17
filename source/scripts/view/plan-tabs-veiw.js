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
         <input type="number" step="1" min="1" max="300" value="100" class="plan-tabs" name="plan-tabs" />
       </label>
       <button type="button" class="button button__plan">Добавить </button>
   </form>`;
  }

  onAnswer(value) {
    Router.start(value);
  }

  bind() {
    const valueInput = this._element.querySelector('.plan-tabs');

    this._element.querySelector('.button__plan').addEventListener('click', (evt) => {
      evt.preventDefault();
      this.onAnswer(valueInput.value);
    });
  }
}
