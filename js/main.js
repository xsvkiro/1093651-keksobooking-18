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
// свойства DOM-элементов
var maxX = document.querySelector('.map__overlay').clientWidth;
var notForGuests = selectGuestElement.length - 1;
var defaultGuests = selectGuestElement.length - 2;

// получаем координаты главного пина
var getMainPinCoordinates = function (pageState) {
  var address;

  if (pageState) {
    address = (X_MAIN_PIN_POSITION + Math.floor(mainPinElement.offsetWidth / 2)) + ', ' + (Y_MAIN_PIN_POSITION + MAIN_PIN_HEIGHT + Math.floor(mainPinElement.offsetHeight / 2));
  } else {
    address = (X_MAIN_PIN_POSITION + Math.floor(mainPinElement.offsetWidth / 2)) + ', ' + (Y_MAIN_PIN_POSITION + Math.floor(mainPinElement.offsetHeight / 2));
  }
  return address;
};

var setAddress = function (pageState) {
  addressInputElement.value = getMainPinCoordinates(pageState);
};

// делаем неактивную страницу
var disableElement = function (element) {
  element.setAttribute('disabled', 'disabled');
};

var enableElement = function (element) {
  element.removeAttribute('disabled');
};

var deactivatePage = function () {
  setAddress();
  [].forEach.call(advertElements, disableElement);
  [].forEach.call(filtersElement, disableElement);
  disableElement(mapFiltersElement);
};

deactivatePage();

var setElementTextContent = function (parentElement, selector, value) {
  parentElement.querySelector(selector).textContent = value;
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
};

var getRandomItemOfArray = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};

function getMaxItemOfArray(arr) {
  return Math.max.apply(null, arr);
}

var enableElementInArray = function (array) {
  [].forEach.call(array, enableElement);
};

var removeClass = function (element, className) {
  element.classList.remove(className);
};

var addPinElements = function () {
  [].forEach.call(adverts, function (el) {
    fragmentPins.appendChild(addPinToMap(el));
  });
  mapPinsElement.appendChild(fragmentPins);
};

var addCardElement = function () {
  mapElement.insertBefore(fragmentCards, mapElement.querySelector('.map__filters-container'));
  fragmentCards.appendChild(createCardInfo(adverts[0]));
};

// перемешивание массива
var shuffleArray = function (array) {
  var j;
  var temp;

  for (var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }

  return array;
};

var getRandomSliceForArray = function (array) {
  var lastITem = getRandomNumber(1, array.length);
  return array.slice(0, lastITem);
};

// создаем массив объектов
var generateAdverts = function (number) {
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
};

var adverts = generateAdverts(8);

var addPinToMap = function (advert) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.setAttribute('style', 'left: ' + (advert.location.x - PIN_WIDTH / 2) + 'px; top: ' + (advert.location.y - PIN_HEIGHT) + 'px;');
  pinElement.querySelector('img').alt = advert.offer.title;
  pinElement.querySelector('img').src = advert.author.avatar;

  return pinElement;
};

var createCardInfo = function (advert) {
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
};

// используем фрагмент
var mapPinsElement = document.querySelector('.map__pins');
var mapElement = document.querySelector('.map');
var fragmentPins = document.createDocumentFragment();
var fragmentCards = document.createDocumentFragment();

// делаем активную страницу

var activatePageHandler = function () {
  setAddress(true);
  enableElement(mapFiltersElement);
  enableElementInArray(advertElements);
  enableElementInArray(filtersElement);
  removeClass(mapElement, 'map--faded');
  removeClass(advertFormElement, 'ad-form--disabled');
  addPinElements();
  mainPinElement.removeEventListener('mousedown', activatePageHandler);
};

var pressEnterOnPinHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePageHandler();
  }
  mainPinElement.removeEventListener('mousedown', pressEnterOnPinHandler);
};

mainPinElement.addEventListener('mousedown', activatePageHandler);

mainPinElement.addEventListener('keydown', pressEnterOnPinHandler);

var guestsValdationHandler = function () {
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
};

selectRoomElement.addEventListener('input', guestsValdationHandler);

var accPriceValdationHandler = function () {
  priceElement.setAttribute('min', AccommodationPrice[accTypeElement.value.toUpperCase()]);
  priceElement.setAttribute('placeholder', AccommodationPrice[accTypeElement.value.toUpperCase()]);
};

accTypeElement.addEventListener('input', accPriceValdationHandler);

timeinElement.addEventListener('input', function () {
  timeoutElement.value = timeinElement.value;
});

timeoutElement.addEventListener('input', function () {
  timeinElement.value = timeoutElement.value;
});

//  хитрые штуки для карточек

mainPinElement.addEventListener('click', addCardElement);

/**setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});
*/
