'use strict';

var ENTER_KEYCODE = 13;
var Y_MIN = 130;
var Y_MAX = 630;
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var MAIN_BUTTON_SIDE = 65;
var MAIN_PIN_HEIGHT = 22;
// пытался получить координаты, вместо константы, но getboundingclientrect() возвращает координаты только относительно окна браузера, а не абсолютную позицию. метод описанный в учебнике
// тоже не сработал (box.top + pageYOffset и box.left + pageXOffset)
var X_MAIN_PIN_POSITION = 570;
var Y_MAIN_PIN_POSITION = 375;
var maxX = document.querySelector('.map__overlay').clientWidth;
var AccommodationType = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};
var advertForm = document.querySelector('.ad-form');
var filters = document.querySelectorAll('.map__filter');
var advertElements = advertForm.getElementsByTagName('fieldset');
var mainPin = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('#address');
var guestsOptions = advertForm.querySelector('#capacity').getElementsByTagName('option');
var selectRoom = advertForm.querySelector('#room_number');
var selectGuest = advertForm.querySelector('#capacity');

// получаем координаты главного пина
var getMainPinCoordinates = function (pageState) {
  var address;

  if (pageState === 'active') {
    address = (X_MAIN_PIN_POSITION + Math.floor(MAIN_BUTTON_SIDE / 2)) + ', ' + (Y_MAIN_PIN_POSITION + MAIN_PIN_HEIGHT + Math.floor(MAIN_BUTTON_SIDE / 2));
  } else {
    address = (X_MAIN_PIN_POSITION + Math.floor(MAIN_BUTTON_SIDE / 2)) + ', ' + (Y_MAIN_PIN_POSITION + Math.floor(MAIN_BUTTON_SIDE / 2));
  }
  return address;
};

// делаем неактивную страницу
var deactivatePage = function () {
  document.querySelector('.map__filters').setAttribute('disabled', 'disabled');

  for (var i = 0; i < advertElements.length; i++) {
    advertElements[i].setAttribute('disabled', 'disabled');
  }

  for (i = 0; i < filters.length; i++) {
    filters[i].setAttribute('disabled', 'disabled');
  }
  addressInput.setAttribute('placeholder', getMainPinCoordinates());
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
  var featuresList = cardElement.querySelector('.popup__features');
  var photosGallery = cardElement.querySelector('.popup__photos');

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
  setElementTextContent(cardElement, '.popup__type', AccommodationType[advert.offer.type]);
  featuresList.innerHTML = '';
  photosGallery.innerHTML = '';

  for (var i = 0; i < advert.offer.features.length; i++) {
    var listItem = listItemTemplate.cloneNode(true);
    listItem.classList.add('popup__feature--' + advert.offer.features[i]);
    featuresList.appendChild(listItem);
  }

  for (i = 0; i < advert.offer.photos.length; i++) {
    var photoItem = photoItemTemplate.cloneNode(true);
    photoItem.setAttribute('src', advert.offer.photos[i]);
    photosGallery.appendChild(photoItem);
  }

  return cardElement;
};

// используем фрагмент
var similarListElement = document.querySelector('.map__pins');
var parentForCards = document.querySelector('.map');
var fragmentPins = document.createDocumentFragment();
var fragmentCards = document.createDocumentFragment();

// делаем активную страницу
var activatePageHandler = function () {
  document.querySelector('.map__filters').removeAttribute('disabled');
  document.querySelector('.map').classList.remove('map--faded');
  advertForm.classList.remove('ad-form--disabled');

  for (var i = 0; i < advertElements.length; i++) {
    advertElements[i].removeAttribute('disabled');
  }

  for (i = 0; i < filters.length; i++) {
    filters[i].removeAttribute('disabled');
  }

  for (i = 0; i < adverts.length; i++) {
    fragmentPins.appendChild(addPinToMap(adverts[i]));
  }

  similarListElement.appendChild(fragmentPins);
  fragmentCards.appendChild(createCardInfo(adverts[0]));
  parentForCards.insertBefore(fragmentCards, parentForCards.querySelector('.map__filters-container'));
  addressInput.setAttribute('placeholder', getMainPinCoordinates('active'));
};

var pressEnterOnPinHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePageHandler();
  }
  // здесь добавлен вызов для того, чтобы не было не соответствия вызванного дефолтными значениями выбранными (1 комната выбрана, 3 гостя выбрано).
  guestsValdationHandler();
};

mainPin.addEventListener('mousedown', activatePageHandler);

mainPin.addEventListener('keydown', pressEnterOnPinHandler);

// функция валидация:

var guestsValdationHandler = function () {
  for (var i = 0; i < guestsOptions.length; i++) {
    guestsOptions[i].removeAttribute('disabled');
  }

  // в итоге не смог придумать как это сделать красивым. выбрал такой путь вместо setCustomValidity, так как в текущий момент setCustomValidity выглядит методом хоть и кидающим
  // оповещение, но оставляющим возможность стрелять себе в ногу.
  if (selectRoom.selectedIndex === 0) {
    selectGuest.selectedIndex = 2;
    guestsOptions[0].setAttribute('disabled', 'disabled');
    guestsOptions[1].setAttribute('disabled', 'disabled');
    guestsOptions[3].setAttribute('disabled', 'disabled');
  } else if (selectRoom.selectedIndex === 1) {
    selectGuest.selectedIndex = 2;
    guestsOptions[0].setAttribute('disabled', 'disabled');
    guestsOptions[3].setAttribute('disabled', 'disabled');
  } else if (selectRoom.selectedIndex === 2) {
    selectGuest.selectedIndex = 2;
    guestsOptions[3].setAttribute('disabled', 'disabled');
  } else {
    selectGuest.selectedIndex = 3;
    for (i = 0; i < selectGuest.selectedIndex; i++) {
      guestsOptions[i].setAttribute('disabled', 'disabled');
    }
  }
};

selectRoom.addEventListener('input', guestsValdationHandler);
