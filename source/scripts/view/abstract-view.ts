const render = (template: string, tag: string, classes: string[]) => {
  const newNode = document.createElement(tag);
  
  classes.forEach((el) => {
    newNode.classList.add(el);
  });

  newNode.innerHTML = template;
  return newNode;
};


class AbstractView {
   tag: string;
  classes: string[] | never[];
  _element: HTMLElement | undefined;

  bind(_element: HTMLElement) {
    throw new Error("Method not implemented.");
  };

  constructor(tag = 'div', classes: string[]) {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one');
    }
    this.tag = tag;
    this.classes = classes;
  };

  get template() {
    throw new Error('Template is required');
    return '';
  };

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    if (this.bind !== undefined )this.bind(this._element);
    return this._element;
  };

  render() {
    return render(this.template, this.tag, this.classes);
  };
}

export default AbstractView;
