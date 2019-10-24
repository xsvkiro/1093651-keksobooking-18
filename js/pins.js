'use strict';
(function () {
  var X_MAIN_PIN_POSITION = 570;
  var Y_MAIN_PIN_POSITION = 375;
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var MAIN_PIN_HEIGHT = 22;
  var mapPinsElement = document.querySelector('.map__pins');
  var fragmentPins = document.createDocumentFragment();
  window.pins = {
    mainPinElement: document.querySelector('.map__pin--main'),
    getMainPinCoordinates: function (pageState) {
      var address;
      if (pageState) {
        address = (X_MAIN_PIN_POSITION + Math.floor(window.pins.mainPinElement.offsetWidth / 2)) + ', ' + (Y_MAIN_PIN_POSITION + MAIN_PIN_HEIGHT + Math.floor(window.pins.mainPinElement.offsetHeight / 2));
      } else {
        address = (X_MAIN_PIN_POSITION + Math.floor(window.pins.mainPinElement.offsetWidth / 2)) + ', ' + (Y_MAIN_PIN_POSITION + Math.floor(window.pins.mainPinElement.offsetHeight / 2));
      }
      return address;
    },
    addPinElements: function () {
      [].forEach.call(window.adverts, function (el) {
        fragmentPins.appendChild(window.pins.addPinToMap(el));
      });
      mapPinsElement.appendChild(fragmentPins);
    },
    addPinToMap: function (advert) {
      var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.setAttribute('style', 'left: ' + (advert.location.x - PIN_WIDTH / 2) + 'px; top: ' + (advert.location.y - PIN_HEIGHT) + 'px;');
      pinElement.setAttribute('onClick', 'window.pins.replyСlick(this)');
      pinElement.setAttribute('id', window.adverts.indexOf(advert));
      pinElement.setAttribute('tabindex', '0');
      pinElement.querySelector('img').alt = advert.offer.title;
      pinElement.querySelector('img').src = advert.author.avatar;
      return pinElement;
    },
    replyСlick: function (obj) {
      window.pinId = obj.id;
    }
  };
})();
