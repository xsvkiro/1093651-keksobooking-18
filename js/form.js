'use strict';

(function () {
  var MAX_ROOM = '100';
  var MAX_PRICE = '1000000';
  var submitButton = document.querySelector('.ad-form__submit');
  var resetButton = document.querySelector('.ad-form__reset');
  var AccommodationPrice = {
    FLAT: '1000',
    BUNGALO: '0',
    HOUSE: '5000',
    PALACE: '10000'
  };
  var advertFormElement = document.querySelector('.ad-form');
  var advertElements = advertFormElement.getElementsByTagName('fieldset');
  var priceElement = advertFormElement.querySelector('#price');
  var accTypeElement = advertFormElement.querySelector('#type');
  var timeinElement = advertFormElement.querySelector('#timein');
  var titleElement = advertFormElement.querySelector('#title');
  var timeoutElement = advertFormElement.querySelector('#timeout');
  var selectRoomElement = advertFormElement.querySelector('#room_number');
  var selectGuestElement = advertFormElement.querySelector('#capacity');
  var notForGuests = selectGuestElement.length - 1;
  var defaultGuests = selectGuestElement.length - 2;

  var guestsValdationHandler = function () {
    window.utils.enableElementInPseudoArray(selectGuestElement);

    if (selectRoomElement.value === MAX_ROOM) {
      selectGuestElement.selectedIndex = notForGuests;
      window.utils.disableElementInPseudoArray(selectGuestElement);
    } else {
      window.utils.disableElement(selectGuestElement[notForGuests]);
      selectGuestElement.selectedIndex = defaultGuests;
      [].forEach.call(selectGuestElement, function (el) {
        if (el.value > selectRoomElement.value) {
          window.utils.disableElement(el);
        }
      });
    }
  };

  var accomodationValdationHandler = function () {
    priceElement.setAttribute('max', MAX_PRICE);
    priceElement.setAttribute('min', AccommodationPrice[accTypeElement.value.toUpperCase()]);
    priceElement.setAttribute('placeholder', AccommodationPrice[accTypeElement.value.toUpperCase()]);
  };

  var priceValidationHandler = function () {
    if (!priceElement.reportValidity()) {
      priceElement.classList.add('ad-form__invalid');
    } else {
      priceElement.classList.remove('ad-form__invalid');
    }
  };

  var titleValidationHandler = function () {
    if (!titleElement.reportValidity()) {
      titleElement.classList.add('ad-form__invalid');
    } else {
      titleElement.classList.remove('ad-form__invalid');
    }
  };

  var onSubmitButton = function (evt) {
    evt.preventDefault();
    if (priceElement.reportValidity() && titleElement.reportValidity()) {
      window.backend.save(new FormData(advertFormElement), window.showMessage, window.showMessage);
    } else {
      titleValidationHandler();
      priceValidationHandler();
    }
  };

  titleElement.addEventListener('input', titleValidationHandler);
  priceElement.addEventListener('input', priceValidationHandler);

  selectRoomElement.addEventListener('input', guestsValdationHandler);

  accTypeElement.addEventListener('input', accomodationValdationHandler);

  timeinElement.addEventListener('input', function () {
    timeoutElement.value = timeinElement.value;
  });

  timeoutElement.addEventListener('input', function () {
    timeinElement.value = timeoutElement.value;
  });

  submitButton.addEventListener('click', onSubmitButton);

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.deactivatePage();
  });

  window.form = {
    validateAdForms: function () {
      guestsValdationHandler();
      accomodationValdationHandler();
    },
    disableForm: function () {
      advertFormElement.reset();
      advertFormElement.classList.add('ad-form--disabled');
      window.utils.disableElementInPseudoArray(advertElements);
    },
    enableForm: function () {
      advertFormElement.classList.remove('ad-form--disabled');
      window.utils.enableElementInPseudoArray(advertElements);
    }
  };
})();
