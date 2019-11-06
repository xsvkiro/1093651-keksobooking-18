'use strict';
(function () {
  window.showMessage = function (message) {
    var type = 'success';
    if (message.length) {
      type = 'error';
    }
    var requiredTemplate = document.querySelector('#' + type).content.querySelector('.' + type);
    var requiredElement = requiredTemplate.cloneNode(true);
    document.querySelector('main').appendChild(requiredElement);
    switch (type) {
      case 'error':
        requiredElement.querySelector('p').textContent = message;
        requiredElement.addEventListener('click', function () {
          document.querySelector('main').removeChild(requiredElement);
        });
        document.addEventListener('keydown', function (evt) {
          if (evt.keyCode === window.utils.ESC_KEYCODE) {
            document.querySelector('main').removeChild(requiredElement);
          }
        });
        break;
      default:
        requiredElement.addEventListener('click', function () {
          document.querySelector('main').removeChild(requiredElement);
          window.deactivatePage();
        });
        document.addEventListener('keydown', function (evt) {
          if (evt.keyCode === window.utils.ESC_KEYCODE) {
            document.querySelector('main').removeChild(requiredElement);
            window.deactivatePage();
          }
        });
    }
  };
})();
