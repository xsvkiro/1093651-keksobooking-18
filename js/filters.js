'use strict';

(function () {
  var filtersElement = document.querySelector('.map__filters');
  var filtersChildElements = filtersElement.getElementsByTagName('*');
  var PriceProperties = {
    LOW_TYPE: 'low',
    MID_TYPE: 'middle',
    HIGH_TYPE: 'high',
    MIN: 10000,
    MAX: 50000
  };
  var features = document.querySelector('.map__features');
  var filters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var resetButton = document.querySelector('.ad-form__reset');

  var onEnterFeature = function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      var feature = evt.target;
      feature.checked = !feature.checked;
      onFilterChange();
    }
  };

  var filterHouse = function (item) {
    if (housingType.value === 'any') {
      return true;
    }
    return item.offer.type === housingType.value;
  };

  var filterRooms = function (item) {
    if (housingRooms.value === 'any') {
      return true;
    }
    return parseInt(housingRooms.value, 10) === item.offer.rooms;
  };

  var filtergGuests = function (item) {
    if (housingGuests.value === 'any') {
      return true;
    }
    return parseInt(housingGuests.value, 10) >= item.offer.guests;
  };

  var filterPrice = function (item) {
    switch (housingPrice.value) {
      case PriceProperties.LOW_TYPE:
        return item.offer.price < PriceProperties.MIN;
      case PriceProperties.MID_TYPE:
        return item.offer.price >= PriceProperties.MIN && item.offer.price <= PriceProperties.MAX;
      case PriceProperties.HIGH_TYPE:
        return item.offer.price > PriceProperties.MAX;
      default:
        return true;
    }
  };

  var filterFeatures = function (item) {
    return Array.from(housingFeatures.children)
      .filter(function (feature) {
        return feature.checked === true;
      })
      .map(function (feature) {
        return feature.value;
      })
      .every(function (feature) {
        return item.offer.features.indexOf(feature) !== -1;
      });
  };

  var filterPins = function (array) {
    return array.filter(function (element) {
      return (
        filterHouse(element) &&
        filterRooms(element) &&
        filtergGuests(element) &&
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
