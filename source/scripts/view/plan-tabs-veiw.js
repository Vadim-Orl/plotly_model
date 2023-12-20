import AbstractView from './abstract-view.js';
import Router from '../controller/router.js';

export default class PlanTabsView extends AbstractView {
  constructor(model) {
    super('div', { classes: ['plan-tabs'] });
    this.model = model;
    this.planValue = model.planValue;
  }

  get template() {
    return `
    <div class="modal-form modal-form--opened">
      <button class="form-toggle" disabled="disabled">
        <span class="visually-hidden">Закрыть</span>
      </button>
      <form action=""  class="form form__plan" >

      <fieldset>
      <legend>Введите план на день</legend>
       <label>
       <p>
          План (тыс.м):
           <input type="number" step="10" min="100" max="200" value="100" class="plan-value" name="plan-value" />
        </label>
        </p>
        <p>
       <input type="submit" class="button button__plan" value="Добавить">
       <p/>
       </fieldset>
      </form>
    </div>
    <div class="btns-plan-wrapper">
      <button class="button button__plan--change hidden">Изменить плаан</button>
      <button class="button button__plan--reset hidden">Сбросить график</button>
    </div>
    <div class="milk-shadow shadow__true"></div>
    `;
  }

  onAnswer(planValue) {
    this.changePlan(planValue);
  }

  bind() {
    const planValue = this._element.querySelector('.plan-value');
    const formPlan = this._element.querySelector('.form__plan');
    const modalForm = this._element.querySelector('.modal-form');
    const btnResetPlan = this._element.querySelector('.button__plan--reset');
    const btnChangePlan = this._element.querySelector('.button__plan--change');
    const btnClose = this._element.querySelector('.form-toggle');
    const shadowDiv = this._element.querySelector('.milk-shadow');

    formPlan.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.onAnswer(planValue.value);

      modalForm.classList.add('hidden');
      modalForm.classList.remove('form__plan--opened');

      btnResetPlan.classList.remove('hidden');
      btnChangePlan.classList.remove('hidden');

      shadowDiv.classList.toggle('shadow__false');
      shadowDiv.classList.toggle('shadow__true');
    });


    btnChangePlan.addEventListener('click', (evt) => {
      btnClose.disabled = false;
      evt.preventDefault();
      modalForm.classList.remove('hidden');
      modalForm.classList.add('form__plan--opened');

      shadowDiv.classList.toggle('shadow__false');
      shadowDiv.classList.toggle('shadow__true');
    });

    btnResetPlan.addEventListener('click', (evt) => {
      evt.preventDefault();
      Router.start(planValue, this.model);
    });

    btnClose.addEventListener('click', (evt) => {
      evt.preventDefault();
      modalForm.classList.add('hidden');
      modalForm.classList.remove('form__plan--opened');
    });

  }
}
