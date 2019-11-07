'use strict';
(function () {
  window.utils = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,

    enableElementInPseudoArray: function (array) {
      [].forEach.call(array, window.utils.enableElement);
    },

    disableElementInPseudoArray: function (array) {
      [].forEach.call(array, window.utils.disableElement);
    },

    disableElement: function (element) {
      element.setAttribute('disabled', 'disabled');
    },

    enableElement: function (element) {
      element.removeAttribute('disabled');
    },

    setElementTextContent: function (parentElement, selector, value) {
      if (value.length === 0) {
        window.utils.hideElement(parentElement);
      } else {
        parentElement.querySelector(selector).textContent = value;
      }
    },

    showElement: function (element) {
      element.classList.remove('hidden');
    },

    hideElement: function (element) {
      element.classList.add('hidden');
    },

    removeClass: function (element, className) {
      element.classList.remove(className);
    },

    removeElement: function (parentElement, element) {
      parentElement.removeChild(element);
    }
  };
})();

