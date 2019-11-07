'use strict';

(function () {
  var ANY_VALUE = 'any';
  var PriceProperties = {
    LOW_TYPE: 'low',
    MID_TYPE: 'middle',
    HIGH_TYPE: 'high',
    MIN: 10000,
    MAX: 50000
  };

  var filtersElement = document.querySelector('.map__filters');
  var filtersChildElements = filtersElement.getElementsByTagName('*');
  var features = document.querySelector('.map__features');
  var filters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var resetButton = document.querySelector('.ad-form__reset');

  var onEnterFeature = function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      var feature = evt.target;
      feature.checked = !feature.checked;
      onFilterChange();
    }
  };

  var filterHouse = function (pin) {
    return housingType.value === ANY_VALUE || pin.offer.type === housingType.value;
  };

  var filterRooms = function (pin) {
    return housingRooms.value === ANY_VALUE || parseInt(housingRooms.value, 10) === pin.offer.rooms;
  };

  var filterGuests = function (pin) {
    return housingGuests.value === ANY_VALUE || parseInt(housingGuests.value, 10) >= pin.offer.guests;
  };

  var filterPrice = function (pin) {
    switch (housingPrice.value) {
      case PriceProperties.LOW_TYPE:
        return pin.offer.price < PriceProperties.MIN;
      case PriceProperties.MID_TYPE:
        return pin.offer.price >= PriceProperties.MIN && pin.offer.price <= PriceProperties.MAX;
      case PriceProperties.HIGH_TYPE:
        return pin.offer.price > PriceProperties.MAX;
      default:
        return true;
    }
  };

  var filterFeatures = function (pin) {
    var checkedFeatures = document.querySelectorAll('input:checked');
    return Array.from(checkedFeatures)
      .every(function (feature) {
        return pin.offer.features.includes(feature.value);
      });
  };

  var filterPins = function (pins) {
    return pins.filter(function (element) {
      return (
        filterHouse(element) &&
        filterRooms(element) &&
        filterGuests(element) &&
        filterPrice(element) &&
        filterFeatures(element)
      );
    });
  };

  var onFilterChange = window.debounce(function () {
    window.cards.deleteCard();
    window.pins.removePins();
    window.pins.addPinElements(filterPins(window.adverts));
  });

  filters.addEventListener('input', onFilterChange);
  features.addEventListener('keydown', onEnterFeature);
  resetButton.addEventListener('click', window.deactivatePage);

  window.filters = {
    enableFilters: function () {
      window.utils.enableElement(filtersElement);
      window.utils.enableElementInPseudoArray(filtersChildElements);
    },

    disableFilters: function () {
      filtersElement.reset();
      window.utils.disableElement(filtersElement);
      window.utils.disableElementInPseudoArray(filtersChildElements);
    }
  };
})();
