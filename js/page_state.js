'use strict';
(function () {
  window.mapElement = document.querySelector('.map');

  var activatePageHandler = function () {
    window.mapElement.classList.remove('map--faded');
    window.backend.load(window.backend.onSuccessLoad, window.showMessage);
    window.form.enableForm();
    window.form.validateAdForms();
    window.mainPinElement.removeEventListener('mousedown', activatePageHandler);
    window.mainPinElement.removeEventListener('keydown', pressEnterOnPinHandler);
  };

  var pressEnterOnPinHandler = function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      activatePageHandler();
    }
  };

  window.deactivatePage = function () {
    window.setAddress();
    window.filters.disableFilters();
    window.form.disableForm();
    window.mapElement.classList.add('map--faded');
    window.mainPinElement.addEventListener('mousedown', activatePageHandler);
    window.mainPinElement.addEventListener('keydown', pressEnterOnPinHandler);
    if (document.querySelector('.added_pin')) {
      window.cards.deleteCard();
      window.pins.removePins();
    }
  };

  window.deactivatePage();

})();
