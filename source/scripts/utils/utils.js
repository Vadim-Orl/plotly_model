const mainNode = document.querySelector('.central');

const screenContainer = document.createElement('div');
screenContainer.classList.add('central__content');

// helperes
const clearMainElement = () => {
  mainNode.innerHTML = '';
};

//main
export default {
  showScreen: (element) => {
    clearMainElement();
    mainNode.append(element);
  },

  newCentralContainer(...listEl) {
    screenContainer.innerHTML = '';
    listEl.forEach((el) => {
      screenContainer.appendChild(el.element);
    });
    return screenContainer;
  },
};


