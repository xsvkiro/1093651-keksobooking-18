'use strict';
(function () {
  var mapPinsElement = document.querySelector('.map__pins');
  var fragmentPins = document.createDocumentFragment();
  window.pins = {
    mainPinElement: document.querySelector('.map__pin--main'),
    getMainPinCoordinates: function (pageState) {
      var xMainPin = parseInt(window.pins.mainPinElement.style.left, 10); // .substring(0, window.pins.mainPinElement.style.left.length - 2);
      var yMainPin = parseInt(window.pins.mainPinElement.style.top, 10); // .substring(0, window.pins.mainPinElement.style.top.length - 2);
      var MAIN_PIN_HEIGHT = 22;
      var address;
      if (pageState) {
        address = (xMainPin + Math.floor(window.pins.mainPinElement.offsetWidth / 2)) + ', ' + (yMainPin + MAIN_PIN_HEIGHT + Math.floor(window.pins.mainPinElement.offsetHeight / 2));
      } else {
        address = (xMainPin + Math.floor(window.pins.mainPinElement.offsetWidth / 2)) + ', ' + (yMainPin + Math.floor(window.pins.mainPinElement.offsetHeight / 2));
      }
      return address;
    },
    addPinElements: function () {
      [].forEach.call(window.adverts, function (el) {
        fragmentPins.appendChild(window.pins.addPinToMap(el));
      });
      // mapPinsElement.insertBefore(fragmentPins, window.pins.mainPinElement);
      mapPinsElement.appendChild(fragmentPins);
    },
    addPinToMap: function (advert) {
      var PIN_HEIGHT = 70;
      var PIN_WIDTH = 50;
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
  // huinya
  window.pins.mainPinElement.addEventListener('mousedown', function (evt) {

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var zIndex = window.getComputedStyle(window.pins.mainPinElement).zIndex;
    window.pins.mainPinElement.style.zIndex = ++zIndex;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.pins.mainPinElement.style.top = (window.pins.mainPinElement.offsetTop - shift.y) + 'px';
      window.pins.mainPinElement.style.left = (window.pins.mainPinElement.offsetLeft - shift.x) + 'px';
      window.setAddress(true);
    };

    var onMouseUp = function () {
      window.pins.mainPinElement.removeEventListener('mousemove', onMouseMove);
      window.pins.mainPinElement.removeEventListener('mouseup', onMouseUp);
      mapPinsElement.removeEventListener('mouseout', onMouseOut);
      window.pins.mainPinElement.style.zIndex = --window.pins.mainPinElement.style.zIndex;
    };

    var onMouseOut = function () {
      window.pins.mainPinElement.removeEventListener('mousemove', onMouseMove);
      window.pins.mainPinElement.removeEventListener('mouseup', onMouseUp);
      mapPinsElement.removeEventListener('mouseout', onMouseOut);
      window.pins.mainPinElement.style.zIndex = --window.pins.mainPinElement.style.zIndex;
    };


    window.pins.mainPinElement.addEventListener('mousemove', onMouseMove);
    window.pins.mainPinElement.addEventListener('mouseup', onMouseUp);
    mapPinsElement.addEventListener('mouseout', onMouseOut);
  });
})();

