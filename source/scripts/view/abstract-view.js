const render = (template, tag, classes) => {
  const newNode = document.createElement(tag);
  classes.forEach((el) => {
    newNode.classList.add(el);
  });

  newNode.innerHTML = template;
  return newNode;
};

class AbstractView {
  constructor(tag = 'div', { classes } = { classes: [] }) {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one');
    }
    this.tag = tag;
    this.classes = classes;
  }

  get template() {
    throw new Error('Template is required');
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }

  render() {
    return render(this.template, this.tag, this.classes);
  }

  bind() {}
}

export default AbstractView;
