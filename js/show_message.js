'use strict';
(function () {

  var MessageType = {
    SUCCESS: 'success',
    ERROR: 'error'
  };

  window.showMessage = function (message) {
    var type = MessageType.SUCCESS;

    if (message.length) {
      type = MessageType.ERROR;
    }

    var requiredTemplate = document.querySelector('#' + type).content.querySelector('.' + type);
    var requiredElement = requiredTemplate.cloneNode(true);

    document.querySelector('main').appendChild(requiredElement);

    switch (type) {
      case MessageType.ERROR:
        requiredElement.querySelector('p').textContent = message;
        document.addEventListener('click', onErrorClose);
        document.addEventListener('keydown', onErrorCloseEsc);
        break;

      default:
        document.addEventListener('click', onSuccessClose);
        document.addEventListener('keydown', onSuccessCloseEsc);
    }
  };

  var onSuccessClose = function () {
    var successMessage = document.querySelector('.success');
    document.querySelector('main').removeChild(successMessage);
    window.deactivatePage();

    document.removeEventListener('click', onSuccessClose);
    document.removeEventListener('keydown', onSuccessCloseEsc);
  };

  var onSuccessCloseEsc = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      onSuccessClose();
    }
  };

  var onErrorClose = function () {
    var errorMessage = document.querySelector('.error');
    document.querySelector('main').removeChild(errorMessage);

    document.removeEventListener('click', onErrorClose);
    document.removeEventListener('keydown', onErrorCloseEsc);
  };

  var onErrorCloseEsc = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      onErrorClose();
    }
  };
})();
