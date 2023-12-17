import AbstractView from './abstract-view.js';

export default class TabsView extends AbstractView {
  constructor() {
    super('div', { classes: ['graf-tabs'] });
  }

  get template() {
    return `
    <form>
     <label>
       <input type="time">
     </label>
     <label>
         <input type="number" step="1" min="1" max="300" value="100" id="age" name="age" />
       </label><button type="button">Добавить </button>
   </form>`;
  }
}
