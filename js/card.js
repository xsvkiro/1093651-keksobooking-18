'use strict';

(function () {

  var AccommodationType = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };
  var fragmentCards = document.createDocumentFragment();
  var mapPins = document.querySelector('.map__pins');
  window.cards = {
    addCards: function (array) {
      [].forEach.call(array, function (el) {
        fragmentCards.appendChild(window.cards.createCardInfo(el));
      });
      window.mapElement.insertBefore(fragmentCards, window.mapElement.querySelector('.map__filters-container'));
    },
    createCardInfo: function (advert) {
      var checkinTime = 'Заезд после ' + advert.offer.checkin + ' выезд до ' + advert.offer.checkout;
      var capacity = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей.';
      var pricePerNight = advert.offer.price + '₽/ночь.';
      var cardTemplate = document.querySelector('#card').content.querySelector('article');
      var cardElement = cardTemplate.cloneNode(true);
      var featuresListElement = cardElement.querySelector('.popup__features');
      var photosGalleryElement = cardElement.querySelector('.popup__photos');

      var listItemTemplate = document.createElement('li');
      listItemTemplate.classList.add('popup__feature');

      var photoItemTemplate = document.createElement('img');
      photoItemTemplate.setAttribute('class', 'popup-photo');
      photoItemTemplate.setAttribute('height', '40');
      photoItemTemplate.setAttribute('width', '45');

      cardElement.querySelector('.popup__avatar').src = advert.author.avatar;
      window.utils.setElementTextContent(cardElement, '.popup__title', advert.offer.title);
      window.utils.setElementTextContent(cardElement, '.popup__description', advert.offer.description);
      window.utils.setElementTextContent(cardElement, '.popup__text--time', checkinTime);
      window.utils.setElementTextContent(cardElement, '.popup__text--capacity', capacity);
      window.utils.setElementTextContent(cardElement, '.popup__text--address', advert.offer.address);
      window.utils.setElementTextContent(cardElement, '.popup__text--price', pricePerNight);
      window.utils.setElementTextContent(cardElement, '.popup__type', AccommodationType[advert.offer.type.toUpperCase()]);
      cardElement.setAttribute('id', 'card' + window.adverts.indexOf(advert));
      window.utils.hideElement(cardElement);
      featuresListElement.innerHTML = '';
      photosGalleryElement.innerHTML = '';

      for (var i = 0; i < advert.offer.features.length; i++) {
        var listItem = listItemTemplate.cloneNode(true);
        listItem.classList.add('popup__feature--' + advert.offer.features[i]);
        featuresListElement.appendChild(listItem);
      }

      for (i = 0; i < advert.offer.photos.length; i++) {
        var photoItem = photoItemTemplate.cloneNode(true);
        photoItem.setAttribute('src', advert.offer.photos[i]);
        photosGalleryElement.appendChild(photoItem);
      }

      return cardElement;
    },
    // абыр
    openPopUpHandler: function () {
      hideCards();
      var popUpElement = document.getElementById('card' + window.pinId);
      window.utils.showElement(popUpElement);
      var cardClosure = popUpElement.querySelector('.popup__close');
      cardClosure.addEventListener('click', hideCards);
      window.pinId = null;
    }
  };
  mapPins.addEventListener('click', window.cards.openPopUpHandler);

  mapPins.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      window.cards.openPopUpHandler();
    }
  });
  var hideCards = function () {
    var allCards = document.querySelectorAll('.map__card ');
    [].forEach.call(allCards, window.utils.hideElement);
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      hideCards();
    }
  };
  document.addEventListener('keydown', onPopupEscPress);
})();

