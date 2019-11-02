'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  /** var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features'); */

  var getHousingType = function (item) {
    if (housingType.value === 'any') {
      return true;
    }
    return item.offer.type === housingType.value;
  };

  /** var eyesColor;
  var coatColor;

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  }; */

  var filterAll = function (array) {
    return array
    .filter(function (item) {
      return (
        getHousingType(item)
      );
    })
    .slice(0, array.length);
  };

  var onHousingTypeChange = function () {
    window.cards.deleteCard();
    var pins = document.querySelectorAll('.added_pin');
    for (var i = 0; i < pins.length; i++) {
      window.mapPinsElement.removeChild(pins[i]);
    }
    window.pins.addPinElements(filterAll(window.adverts));
  };

  housingType.addEventListener('input', onHousingTypeChange);
})();

// window.adverts массив в глобальной области
