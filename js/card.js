'use strict';

(function () {

  var AccommodationType = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };
  var fragmentCard = document.createDocumentFragment();

  var createCardInfo = function (advert) {
    var checkinTime = 'Заезд после ' + advert.offer.checkin + ' выезд до ' + advert.offer.checkout;
    var capacity = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей.';
    var pricePerNight = advert.offer.price + '₽/ночь.';
    var cardTemplate = document.querySelector('#card').content.querySelector('article');
    var cardElement = cardTemplate.cloneNode(true);
    var featuresListElement = cardElement.querySelector('.popup__features');
    var photosGalleryElement = cardElement.querySelector('.popup__photos');
    var relatedPin = document.getElementById(window.pinId.toString());

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
    relatedPin.classList.add('map__pin--active');

    if (advert.offer.features.length) {
      featuresListElement.innerHTML = '';
      for (var i = 0; i < advert.offer.features.length; i++) {
        var listItem = listItemTemplate.cloneNode(true);
        listItem.classList.add('popup__feature--' + advert.offer.features[i]);
        featuresListElement.appendChild(listItem);
      }
    } else {
      featuresListElement.innerHTML = '';
      window.utils.hideElement(listItemTemplate);
    }

    if (advert.offer.photos.length) {
      for (i = 0; i < advert.offer.photos.length; i++) {
        photosGalleryElement.innerHTML = '';
        var photoItem = photoItemTemplate.cloneNode(true);
        photoItem.setAttribute('src', advert.offer.photos[i]);
        photosGalleryElement.appendChild(photoItem);
      }
    } else {
      window.utils.hideElement(photosGalleryElement);
      photosGalleryElement.innerHTML = '';
    }
    return cardElement;
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      window.cards.deleteCard();
    }
  };

  document.addEventListener('keydown', onPopupEscPress);

  window.cards = {
    addCard: function (card) {
      fragmentCard.appendChild(createCardInfo(card));
      window.mapElement.insertBefore(fragmentCard, window.mapElement.querySelector('.map__filters-container'));
    },
    openPopUpHandler: function () {
      window.cards.deleteCard();
      window.cards.addCard(window.adverts[window.pinId]);
      var cardClosure = document.querySelector('.popup__close');
      cardClosure.addEventListener('click', window.cards.deleteCard);
      window.pinId = null;
    },
    deleteCard: function () {
      var cardElement = document.querySelector('.map__card');
      var activePin = document.querySelector('.map__pin--active');
      if (cardElement && activePin) {
        window.utils.removeElement(window.mapElement, cardElement);
        activePin.classList.remove('map__pin--active');
      }
    }
  };

})();

