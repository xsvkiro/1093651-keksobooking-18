'use strict';

(function () {
  var AccommodationType = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };
  var fragmentCard = document.createDocumentFragment();

  var setTextFields = function (cardElement, advert) {
    var checkinTime = 'Заезд после ' + advert.offer.checkin + ' выезд до ' + advert.offer.checkout;
    var capacity = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей.';
    var pricePerNight = advert.offer.price + '₽/ночь.';

    window.utils.setElementTextContent(cardElement, '.popup__title', advert.offer.title);
    window.utils.setElementTextContent(cardElement, '.popup__description', advert.offer.description);
    window.utils.setElementTextContent(cardElement, '.popup__text--time', checkinTime);
    window.utils.setElementTextContent(cardElement, '.popup__text--capacity', capacity);
    window.utils.setElementTextContent(cardElement, '.popup__text--address', advert.offer.address);
    window.utils.setElementTextContent(cardElement, '.popup__text--price', pricePerNight);
    window.utils.setElementTextContent(cardElement, '.popup__type', AccommodationType[advert.offer.type.toUpperCase()]);
  };

  var renderPhotos = function (cardElement, advert) {
    var photosGalleryElement = cardElement.querySelector('.popup__photos');
    var photoItemTemplate = document.createElement('img');

    photoItemTemplate.setAttribute('class', 'popup-photo');
    photoItemTemplate.setAttribute('height', '40');
    photoItemTemplate.setAttribute('width', '45');

    photosGalleryElement.innerHTML = '';

    advert.offer.photos.forEach(function (it) {
      var photoItem = photoItemTemplate.cloneNode(true);
      photoItem.setAttribute('src', it);
      photosGalleryElement.appendChild(photoItem);
    });

    if (!advert.offer.photos.length) {
      window.utils.hideElement(photosGalleryElement);
    }
  };

  var renderFeatures = function (cardElement, advert) {
    var listItemTemplate = document.createElement('li');
    listItemTemplate.classList.add('popup__feature');
    var featuresListElement = cardElement.querySelector('.popup__features');

    featuresListElement.innerHTML = '';

    advert.offer.features.forEach(function (it) {
      var listItem = listItemTemplate.cloneNode(true);
      listItem.classList.add('popup__feature--' + it);
      featuresListElement.appendChild(listItem);
    });

    if (!advert.offer.features.length) {
      window.utils.hideElement(featuresListElement);
    }
  };

  var createCardInfo = function (advert) {

    var cardTemplate = document.querySelector('#card').content.querySelector('article');
    var cardElement = cardTemplate.cloneNode(true);
    var relatedPin = document.getElementById(window.pinId.toString());

    cardElement.querySelector('.popup__avatar').src = advert.author.avatar;
    cardElement.setAttribute('id', 'card' + window.adverts.indexOf(advert));

    renderPhotos(cardElement, advert);
    setTextFields(cardElement, advert);
    renderFeatures(cardElement, advert);

    relatedPin.classList.add('map__pin--active');

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
