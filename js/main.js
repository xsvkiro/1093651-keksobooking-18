'use strict';
// константы
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var Y_MIN = 130;
var Y_MAX = 630;
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var MAIN_PIN_HEIGHT = 22;
var MAX_ROOM = '100';
var notForGuests = selectGuestElement.length - 1;
var defaultGuests = selectGuestElement.length - 2;
// пытался получить координаты, вместо константы, но getboundingclientrect() возвращает координаты только относительно окна браузера, а не абсолютную позицию. метод описанный в учебнике
// тоже не сработал (box.top + pageYOffset и box.left + pageXOffset)
var X_MAIN_PIN_POSITION = 570;
var Y_MAIN_PIN_POSITION = 375;
// Перечисления
var AccommodationType = {
  FLAT: 'Квартира',
  BUNGALO: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец'
};
var AccommodationPrice = {
  FLAT: '1000',
  BUNGALO: '0',
  HOUSE: '5000',
  PALACE: '10000'
};
// DOM-элементы
var advertFormElement = document.querySelector('.ad-form');
var filtersElement = document.querySelectorAll('.map__filter');
var advertElements = advertFormElement.getElementsByTagName('fieldset');
var mainPinElement = document.querySelector('.map__pin--main');
var addressInputElement = document.querySelector('#address');
var selectRoomElement = advertFormElement.querySelector('#room_number');
var selectGuestElement = advertFormElement.querySelector('#capacity');
var mapFiltersElement = document.querySelector('.map__filters');
var priceElement = advertFormElement.querySelector('#price');
var accTypeElement = advertFormElement.querySelector('#type');
var timeinElement = advertFormElement.querySelector('#timein');
var timeoutElement = advertFormElement.querySelector('#timeout');
var mapPins = document.querySelector('.map__pins');
// свойства DOM-элементов
var maxX = document.querySelector('.map__overlay').clientWidth;
// используем фрагмент
var mapPinsElement = document.querySelector('.map__pins');
var mapElement = document.querySelector('.map');
var fragmentPins = document.createDocumentFragment();
var fragmentCards = document.createDocumentFragment();
var pinId;

// функции
// получаем координаты главного пина
function getMainPinCoordinates(pageState) {
  var address;

  if (pageState) {
    address = (X_MAIN_PIN_POSITION + Math.floor(mainPinElement.offsetWidth / 2)) + ', ' + (Y_MAIN_PIN_POSITION + MAIN_PIN_HEIGHT + Math.floor(mainPinElement.offsetHeight / 2));
  } else {
    address = (X_MAIN_PIN_POSITION + Math.floor(mainPinElement.offsetWidth / 2)) + ', ' + (Y_MAIN_PIN_POSITION + Math.floor(mainPinElement.offsetHeight / 2));
  }
  return address;
}

function showElement(element) {
  element.classList.remove('hidden');
}

function hideElement(element) {
  element.classList.add('hidden');
}

function setAddress(pageState) {
  addressInputElement.value = getMainPinCoordinates(pageState);
}

// делаем неактивную страницу
function disableElement(element) {
  element.setAttribute('disabled', 'disabled');
}

function enableElement(element) {
  element.removeAttribute('disabled');
}

function deactivatePage() {
  setAddress();
  [].forEach.call(advertElements, disableElement);
  [].forEach.call(filtersElement, disableElement);
  disableElement(mapFiltersElement);
}

deactivatePage();

function setElementTextContent(parentElement, selector, value) {
  parentElement.querySelector(selector).textContent = value;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
}

function getRandomItemOfArray(arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
}

function getMaxItemOfArray(arr) {
  return Math.max.apply(null, arr);
}

function enableElementInArray(array) {
  [].forEach.call(array, enableElement);
}

function removeClass(element, className) {
  element.classList.remove(className);
}

function addPinElements() {
  [].forEach.call(adverts, function (el) {
    fragmentPins.appendChild(addPinToMap(el));
  });
  mapPinsElement.appendChild(fragmentPins);
}

function addCards() {
  [].forEach.call(adverts, function (el) {
    fragmentCards.appendChild(createCardInfo(el));
  });
  mapElement.insertBefore(fragmentCards, mapElement.querySelector('.map__filters-container'));
}

// перемешивание массива
function shuffleArray(array) {
  var j;
  var temp;

  for (var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }

  return array;
}

function getRandomSliceForArray(array) {
  var lastITem = getRandomNumber(1, array.length);
  return array.slice(0, lastITem);
}

// создаем массив объектов
function generateAdverts(number) {
  var controlHours = ['12:00', '13:00', '14:00'];
  var prices = [1, 75000];
  var titles = ['заголовок1', 'заголовок 2', 'заголовок 3'];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var adverts = [];
  var rooms = [1, 2, 3];
  var guests = [0, 1, 2];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  for (var i = 0; i < number; i++) {
    var advert = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: getRandomItemOfArray(titles),
        price: getRandomNumber(prices[0], getMaxItemOfArray(prices)),
        type: getRandomItemOfArray(types),
        rooms: getRandomItemOfArray(rooms),
        guests: getRandomItemOfArray(guests),
        checkin: getRandomItemOfArray(controlHours),
        checkout: getRandomItemOfArray(controlHours),
        features: getRandomSliceForArray(shuffleArray(features)),
        photos: getRandomSliceForArray(shuffleArray(photos))
      },
      location: {
        x: getRandomNumber(0, maxX),
        y: getRandomNumber(Y_MIN, Y_MAX)
      }
    };
    advert.offer.address = advert.location.x + ', ' + advert.location.y + '.';
    advert.offer.description = 'Замечательный ' + advert.offer.type + ' для вашего отдыха всего за ' + advert.offer.price;
    adverts.push(advert);
  }

  return adverts;
}

var adverts = generateAdverts(8);

function addPinToMap(advert) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.setAttribute('style', 'left: ' + (advert.location.x - PIN_WIDTH / 2) + 'px; top: ' + (advert.location.y - PIN_HEIGHT) + 'px;');
  pinElement.setAttribute('onClick', 'replyСlick(this)');
  pinElement.setAttribute('id', adverts.indexOf(advert));
  pinElement.setAttribute('tabindex', '0');
  pinElement.querySelector('img').alt = advert.offer.title;
  pinElement.querySelector('img').src = advert.author.avatar;
  return pinElement;
}

// eslint-disable-next-line no-unused-vars
function replyСlick(obj) {
  pinId = obj.id;
}

function createCardInfo(advert) {
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
  setElementTextContent(cardElement, '.popup__title', advert.offer.title);
  setElementTextContent(cardElement, '.popup__description', advert.offer.description);
  setElementTextContent(cardElement, '.popup__text--time', checkinTime);
  setElementTextContent(cardElement, '.popup__text--capacity', capacity);
  setElementTextContent(cardElement, '.popup__text--address', advert.offer.address);
  setElementTextContent(cardElement, '.popup__text--price', pricePerNight);
  setElementTextContent(cardElement, '.popup__type', AccommodationType[advert.offer.type.toUpperCase()]);
  cardElement.setAttribute('id', 'card' + adverts.indexOf(advert));
  hideElement(cardElement);
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
}

function activatePageHandler() {
  setAddress(true);
  enableElement(mapFiltersElement);
  enableElementInArray(advertElements);
  enableElementInArray(filtersElement);
  removeClass(mapElement, 'map--faded');
  removeClass(advertFormElement, 'ad-form--disabled');
  addPinElements();
  mainPinElement.removeEventListener('mousedown', activatePageHandler);
  mainPinElement.removeEventListener('keydown', pressEnterOnPinHandler);
  addCards();
}

function pressEnterOnPinHandler(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePageHandler();
  }
}

function guestsValdationHandler() {
  [].forEach.call(selectGuestElement, function (el) {
    el.removeAttribute('disabled');
  });

  if (selectRoomElement.value === MAX_ROOM) {
    selectGuestElement.selectedIndex = notForGuests;
    [].forEach.call(selectGuestElement, disableElement);
  } else {
    disableElement(selectGuestElement[notForGuests]);
    selectGuestElement.selectedIndex = defaultGuests;
    [].forEach.call(selectGuestElement, function (el) {
      if (el.value > selectRoomElement.value) {
        disableElement(el);
      }
    });
  }
}

function accPriceValdationHandler() {
  priceElement.setAttribute('min', AccommodationPrice[accTypeElement.value.toUpperCase()]);
  priceElement.setAttribute('placeholder', AccommodationPrice[accTypeElement.value.toUpperCase()]);
}

function hideCards() {
  var allCards = document.querySelectorAll('.map__card ');
  [].forEach.call(allCards, hideElement);
}

function openPopUpHandler() {
  hideCards();
  var popUpElement = document.getElementById('card' + pinId);
  showElement(popUpElement);
  var cardClosure = popUpElement.querySelector('.popup__close');
  cardClosure.addEventListener('click', hideCards);
  pinId = null;
}

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    hideCards();
  }
}

// listeners.
mainPinElement.addEventListener('mousedown', activatePageHandler);

mainPinElement.addEventListener('keydown', pressEnterOnPinHandler);

selectRoomElement.addEventListener('input', guestsValdationHandler);

accTypeElement.addEventListener('input', accPriceValdationHandler);

timeinElement.addEventListener('input', function () {
  timeoutElement.value = timeinElement.value;
});

timeoutElement.addEventListener('input', function () {
  timeinElement.value = timeoutElement.value;
});

mapPins.addEventListener('click', openPopUpHandler);

mapPins.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopUpHandler();
  }
});

document.addEventListener('keydown', onPopupEscPress);
