'use strict';

var Y_MIN = 130;
var Y_MAX = 630;
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var maxX = document.querySelector('.map__overlay').clientWidth;
var TypeDict = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};

var removeClass = function (selector, className) {
  document.querySelector(selector).classList.remove(className);
};

removeClass('.map', 'map--faded');

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

// В комментариях к пулл-реквесту расписал почему не стал делать функцию по текст.котент.
var createCardInfo = function (advert) {

  var cardTemplate = document.querySelector('#card').content.querySelector('article');
  var cardElement = cardTemplate.cloneNode(true);
  var featuresList = cardElement.querySelector('.popup__features');
  var photosGallery = cardElement.querySelector('.popup__photos');
  var listItemTemplate = document.createElement('li');
  var photoItemTemplate = document.createElement('IMG');

  cardElement.querySelector('.popup__title').textContent = advert.offer.title;
  cardElement.querySelector('.popup__avatar').src = advert.author.avatar;
  cardElement.querySelector('.popup__description').textContent = advert.offer.description;
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ' выезд до ' + advert.offer.checkout;
  cardElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей.';
  cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь.';
  cardElement.querySelector('.popup__type').textContent = TypeDict[advert.offer.type];
  listItemTemplate.classList.add('popup__feature');
  photoItemTemplate.setAttribute('class', 'popup-photo');
  photoItemTemplate.setAttribute('height', '40');
  photoItemTemplate.setAttribute('width', '45');
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


for (var i = 0; i < adverts.length; i++) {
  fragmentPins.appendChild(addPinToMap(adverts[i]));
}

fragmentCards.appendChild(createCardInfo(adverts[0]));
similarListElement.appendChild(fragmentPins);
parentForCards.insertBefore(fragmentCards, parentForCards.querySelector('.map__filters-container'));
