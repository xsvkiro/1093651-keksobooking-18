'use strict';

(function () {
  var MAX_ROOM = '100';
  var submitButton = document.querySelector('.ad-form__submit');
  // var resetButton = document.querySelector('.ad-form__reset');
  var AccommodationPrice = {
    FLAT: '1000',
    BUNGALO: '0',
    HOUSE: '5000',
    PALACE: '10000'
  };
  window.advertFormElement = document.querySelector('.ad-form');
  var priceElement = window.advertFormElement.querySelector('#price');
  var accTypeElement = window.advertFormElement.querySelector('#type');
  var timeinElement = window.advertFormElement.querySelector('#timein');
  var timeoutElement = window.advertFormElement.querySelector('#timeout');
  var selectRoomElement = window.advertFormElement.querySelector('#room_number');
  var selectGuestElement = window.advertFormElement.querySelector('#capacity');
  var notForGuests = selectGuestElement.length - 1;
  var defaultGuests = selectGuestElement.length - 2;
  window.form = {
    guestsValdationHandler: function () {
      [].forEach.call(selectGuestElement, function (el) {
        el.removeAttribute('disabled');
      });

      if (selectRoomElement.value === MAX_ROOM) {
        selectGuestElement.selectedIndex = notForGuests;
        [].forEach.call(selectGuestElement, window.utils.disableElement);
      } else {
        window.utils.disableElement(selectGuestElement[notForGuests]);
        selectGuestElement.selectedIndex = defaultGuests;
        [].forEach.call(selectGuestElement, function (el) {
          if (el.value > selectRoomElement.value) {
            window.utils.disableElement(el);
          }
        });
      }
    },

    accPriceValdationHandler: function () {
      priceElement.setAttribute('min', AccommodationPrice[accTypeElement.value.toUpperCase()]);
      priceElement.setAttribute('placeholder', AccommodationPrice[accTypeElement.value.toUpperCase()]);
    }
  };

  selectRoomElement.addEventListener('input', window.form.guestsValdationHandler);

  accTypeElement.addEventListener('input', window.form.accPriceValdationHandler);

  timeinElement.addEventListener('input', function () {
    timeoutElement.value = timeinElement.value;
  });

  timeoutElement.addEventListener('input', function () {
    timeinElement.value = timeoutElement.value;
  });

  submitButton.addEventListener('click', function (evt) {
    window.backend.save(new FormData(window.advertFormElement), window.utils.showSuccessMessage, window.utils.showErrorMessage);
    evt.preventDefault();
  });

})();
