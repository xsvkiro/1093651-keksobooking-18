/* eslint-disable no-invalid-this */
'use strict';

// Анхайдим карту.
var removeClass = function (selector, clas) {
  document.querySelector(selector).classList.remove(clas);
};

removeClass('.map', 'map--faded');

// случайное число;

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
};

// случайный айтем массива:
var getRandomItemOfArray = function (arr) {
  return arr[getRandomNumber(arr.length)];
};

// Получаем самый большой элемент массива новым споособом
function getMaxItemOfArray(arr) {
  return Math.max.apply(null, arr);
}

// Перемешивание массива

var shuffleArray = function (array) {

  var j;
  var temp;

  for (var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random()*(i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }

  return array;
};

// создаем массив объектов
var generateAdverts = function (number) {
  var controlHours = ['12:00', '13:00', '14:00'];
  var yAxis = [130, 630];
  var prices = [1, 75000];
  var maxX = document.querySelector('.map__overlay').clientWidth;
  var titles = ['заголовок1', 'заголовок 2', 'заголовок 3'];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var adverts = [];
  var rooms = [1, 2, 3];
  var guests = [0, 1, 2];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var getRandomSizeForArray = function (array) {
    var lastITem = getRandomNumber(0, array.length);
    return array.slice(0, lastITem);
  };

  for (var i = 0; i < number; i++) {

    var tmpAdvert = {
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
        features: getRandomSizeForArray(shuffleArray(features)),
        photos: getRandomSizeForArray(shuffleArray(photos))
      },
      location: {
        x: getRandomNumber(0, maxX),
        y: getRandomNumber(yAxis[0], yAxis[1])
      }
    };
    tmpAdvert.offer.address = tmpAdvert.location.x + ', ' + tmpAdvert.location.y + '.';
    tmpAdvert.offer.description = 'Замечательный ' + tmpAdvert.offer.type + ' для вашего отдыха всего за ' + tmpAdvert.offer.prices;
    adverts.push(tmpAdvert);
  }

  return adverts;
};

var adverts = generateAdverts(8);

// странное колдунство и манипуляции с домом
var addPinToMap = function (advert) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.setAttribute('style', 'left: ' + advert.location.x + 'px; top: ' + advert.location.y + 'px;');;
  pinElement.querySelector('img').alt = advert.offer.title;
  pinElement.querySelector('img').src = advert.author.avatar;

  return pinElement;
};

// используем фрагмент
var similarListElement = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

for (var i = 0; i < adverts.length; i++) {
  fragment.appendChild(addPinToMap(adverts[i]));
}

similarListElement.appendChild(fragment);
