'use strict';
(function () {
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var mapPinsElement = document.querySelector('.map__pins');

  var addPinToMap = function (advert) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.setAttribute('style', 'left: ' + (advert.location.x - PIN_WIDTH / 2) + 'px; top: ' + (advert.location.y - PIN_HEIGHT) + 'px;');
    pinElement.setAttribute('id', window.adverts.indexOf(advert));
    pinElement.setAttribute('tabindex', '0');

    pinElement.querySelector('img').alt = advert.offer.title;
    pinElement.querySelector('img').src = advert.author.avatar;

    pinElement.classList.add('added_pin');

    pinElement.addEventListener('click', replyClick);

    pinElement.addEventListener('click', window.cards.openPopUpHandler);

    pinElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ENTER_KEYCODE) {
        window.cards.openPopUpHandler();
      }
    });

    return pinElement;
  };

  var replyClick = function (evt) {
    window.pinId = evt.target.parentElement.id;
    if (evt.target.id) {
      window.pinId = evt.target.id;
    }
  };

  window.pins = {
    addPinElements: function (array) {
      var takeNumber = array.length > 5 ? 5 : array.length;
      var fragmentPins = document.createDocumentFragment();

      for (var i = 0; i < takeNumber; i++) {
        fragmentPins.appendChild(addPinToMap(array[i]));
      }

      mapPinsElement.appendChild(fragmentPins);
    },

    removePins: function () {
      var pins = document.querySelectorAll('.added_pin');

      for (var i = 0; i < pins.length; i++) {
        mapPinsElement.removeChild(pins[i]);
      }
    }
  };
})();

