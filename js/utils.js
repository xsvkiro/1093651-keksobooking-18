'use strict';
(function () {
  window.utils = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    setElementTextContent: function (parentElement, selector, value) {
      parentElement.querySelector(selector).textContent = value;
    },
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
    },
    getRandomItemOfArray: function (arr) {
      return arr[window.utils.getRandomNumber(0, arr.length - 1)];
    },
    getMaxItemOfArray: function (arr) {
      return Math.max.apply(null, arr);
    },
    enableElementInArray: function (array) {
      [].forEach.call(array, window.utils.enableElement);
    },
    removeClass: function (element, className) {
      element.classList.remove(className);
    },
    shuffleArray: function (array) {
      var j;
      var temp;

      for (var i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }

      return array;
    },
    getRandomSliceForArray: function (array) {
      var lastITem = window.utils.getRandomNumber(1, array.length);
      return array.slice(0, lastITem);
    },
    showElement: function (element) {
      element.classList.remove('hidden');
    },
    hideElement: function (element) {
      element.classList.add('hidden');
    },
    disableElement: function (element) {
      element.setAttribute('disabled', 'disabled');
    },
    enableElement: function (element) {
      element.removeAttribute('disabled');
    },
    removeElement: function (parentElement, element) {
      parentElement.removeChild(element);
    },
    showSuccessMessage: function () {
      var successTemplate = document.querySelector('#success').content.querySelector('.success');
      var successElement = successTemplate.cloneNode(true);
      document.querySelector('main').appendChild(successElement);
      successElement.addEventListener('click', function () {
        document.querySelector('main').removeChild(successElement);
        window.deactivatePage();
      });
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.utils.ESC_KEYCODE) {
          document.querySelector('main').removeChild(successElement);
          window.deactivatePage();
        }
      });
    },
    showErrorMessage: function (message) {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorElement = errorTemplate.cloneNode(true);
      errorElement.querySelector('p').textContent = message;
      document.querySelector('main').appendChild(errorElement);
      errorElement.addEventListener('click', function () {
        document.querySelector('main').removeChild(errorElement);
      });
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.utils.ESC_KEYCODE) {
          document.querySelector('main').removeChild(errorElement);
        }
      });
    }
  };
})();
