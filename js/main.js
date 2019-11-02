'use strict';
(function () {
  // DOM-элементы
  var MAIN_PIN_DEFAULT_X = window.pins.mainPinElement.style.left;
  var MAIN_PIN_DEFAULT_Y = window.pins.mainPinElement.style.top;
  var advertFormElement = document.querySelector('.ad-form');
  var filtersElements = document.querySelectorAll('.map__filter');
  var advertElements = advertFormElement.getElementsByTagName('fieldset');
  var addressInputElement = document.querySelector('#address');
  var mapFiltersElement = document.querySelector('.map__filters');
  window.mapElement = document.querySelector('.map');
  window.setAddress = function (pageState) {
    addressInputElement.value = window.pins.getMainPinCoordinates(pageState);
  };

  var pressEnterOnPinHandler = function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      activatePageHandler();
    }
  };

  window.deactivatePage = function () {
    window.advertFormElement.reset();
    window.pins.mainPinElement.style.left = MAIN_PIN_DEFAULT_X;
    window.pins.mainPinElement.style.top = MAIN_PIN_DEFAULT_Y;
    window.setAddress();
    [].forEach.call(advertElements, window.utils.disableElement);
    [].forEach.call(filtersElements, window.utils.disableElement);
    window.utils.disableElement(mapFiltersElement);
    var pins = document.querySelectorAll('.added_pin');
    for (var i = 0; i < pins.length; i++) {
      window.mapPinsElement.removeChild(pins[i]);
    }
    window.cards.deleteCard();
    window.pins.mainPinElement.addEventListener('mousedown', activatePageHandler);
    window.pins.mainPinElement.addEventListener('keydown', pressEnterOnPinHandler);
  };

  window.disablePage = function () {
    window.advertFormElement.reset();
    window.pins.mainPinElement.style.left = MAIN_PIN_DEFAULT_X;
    window.pins.mainPinElement.style.top = MAIN_PIN_DEFAULT_Y;
    window.setAddress();
    [].forEach.call(advertElements, window.utils.disableElement);
    [].forEach.call(filtersElements, window.utils.disableElement);
    window.utils.disableElement(mapFiltersElement);
    window.pins.mainPinElement.addEventListener('mousedown', activatePageHandler);
    window.pins.mainPinElement.addEventListener('keydown', pressEnterOnPinHandler);
  };

  var activatePageHandler = function () {
    window.setAddress(true);
    window.utils.enableElement(mapFiltersElement);
    [].forEach.call(advertElements, window.utils.enableElement);
    [].forEach.call(filtersElements, window.utils.enableElement);
    window.utils.removeClass(window.mapElement, 'map--faded');
    window.utils.removeClass(advertFormElement, 'ad-form--disabled');
    window.backend.load(window.backend.onSuccessLoad, window.utils.showErrorMessage);
    window.form.guestsValdationHandler();
    window.form.accPriceValdationHandler();
    window.pins.mainPinElement.removeEventListener('mousedown', activatePageHandler);
    window.pins.mainPinElement.removeEventListener('keydown', pressEnterOnPinHandler);
  };

  window.disablePage();

})();
