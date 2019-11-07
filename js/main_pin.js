'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 22;
  var Y_MIN = 76;
  var Y_MAX = 576;

  window.mainPinElement = document.querySelector('.map__pin--main');
  var halfWidth = Math.floor(window.mainPinElement.offsetWidth / 2);
  var halfHeight = Math.floor(window.mainPinElement.offsetHeight / 2);
  var defaultX = parseInt(window.mainPinElement.style.left, 10);
  var defaultY = parseInt(window.mainPinElement.style.top, 10);

  var addressInputElement = document.querySelector('#address');

  window.setAddress = function (pageState) {
    addressInputElement.value = getMainPinCoordinates(pageState);
  };

  var getMainPinCoordinates = function (pageState) {
    var xMainPin = parseInt(window.mainPinElement.style.left, 10) + halfWidth;
    var yMainPin = parseInt(window.mainPinElement.style.top, 10) + halfHeight;

    if (pageState) {
      return (xMainPin) + ', ' + (yMainPin + MAIN_PIN_HEIGHT);
    }

    window.mainPinElement.style.left = defaultX + 'px';
    window.mainPinElement.style.top = defaultY + 'px';

    return (defaultX + halfWidth) + ', ' + (defaultY + halfHeight);
  };

  var mouseMoveHandler = function (evt) {
    window.setAddress(true);

    var xMax = document.querySelector('.map__overlay').clientWidth - Math.floor(window.mainPinElement.offsetWidth / 2);
    var xMin = document.querySelector('.map__overlay').clientLeft - Math.floor(window.mainPinElement.offsetWidth / 2);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var zIndex = window.getComputedStyle(window.mainPinElement).zIndex;
    window.mainPinElement.style.zIndex = ++zIndex;

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

      if (window.mainPinElement.offsetTop - shift.y < Y_MIN) {
        window.mainPinElement.style.top = Y_MIN + 'px';
      } else if (window.mainPinElement.offsetTop - shift.y > Y_MAX) {
        window.mainPinElement.style.top = Y_MAX + 'px';
      } else {
        window.mainPinElement.style.top = (window.mainPinElement.offsetTop - shift.y) + 'px';
      }

      if (window.mainPinElement.offsetLeft - shift.x < xMin) {
        window.mainPinElement.style.left = xMin + 'px';
      } else if (window.mainPinElement.offsetLeft - shift.x > xMax) {
        window.mainPinElement.style.left = xMax + 'px';
      } else {
        window.mainPinElement.style.left = (window.mainPinElement.offsetLeft - shift.x) + 'px';
      }

      window.setAddress(true);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.mainPinElement.style.zIndex = --window.mainPinElement.style.zIndex;
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.mainPinElement.addEventListener('mousedown', mouseMoveHandler);
})();
