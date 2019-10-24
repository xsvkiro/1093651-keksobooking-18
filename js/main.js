'use strict';
(function () {
  // DOM-элементы
  var advertFormElement = document.querySelector('.ad-form');
  var filtersElement = document.querySelectorAll('.map__filter');
  var advertElements = advertFormElement.getElementsByTagName('fieldset');
  var addressInputElement = document.querySelector('#address');
  var mapFiltersElement = document.querySelector('.map__filters');
  window.mapElement = document.querySelector('.map');

  window.setAddress = function (pageState) {
    addressInputElement.value = window.pins.getMainPinCoordinates(pageState);
  };

  // делаем неактивную страницу
  var deactivatePage = function () {
    window.setAddress();
    [].forEach.call(advertElements, window.utils.disableElement);
    [].forEach.call(filtersElement, window.utils.disableElement);
    window.utils.disableElement(mapFiltersElement);
  };

  deactivatePage();

  // eslint-disable-next-line no-unused-vars

  var activatePageHandler = function () {
    window.setAddress(true);
    window.utils.enableElement(mapFiltersElement);
    window.utils.enableElementInArray(advertElements);
    window.utils.enableElementInArray(filtersElement);
    window.utils.removeClass(window.mapElement, 'map--faded');
    window.utils.removeClass(advertFormElement, 'ad-form--disabled');
    window.pins.addPinElements();
    window.pins.mainPinElement.removeEventListener('mousedown', activatePageHandler);
    window.pins.mainPinElement.removeEventListener('keydown', pressEnterOnPinHandler);
    window.cards.addCards();
  };

  var pressEnterOnPinHandler = function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      activatePageHandler();
    }
  };

  // listeners.
  window.pins.mainPinElement.addEventListener('mousedown', activatePageHandler);

  window.pins.mainPinElement.addEventListener('keydown', pressEnterOnPinHandler);
})();
