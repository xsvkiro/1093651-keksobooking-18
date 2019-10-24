'use strict';
(function () {
  var Y_MIN = 130;
  var Y_MAX = 630;
  var maxX = document.querySelector('.map__overlay').clientWidth;
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
          title: window.utils.getRandomItemOfArray(titles),
          price: window.utils.getRandomNumber(prices[0], window.utils.getMaxItemOfArray(prices)),
          type: window.utils.getRandomItemOfArray(types),
          rooms: window.utils.getRandomItemOfArray(rooms),
          guests: window.utils.getRandomItemOfArray(guests),
          checkin: window.utils.getRandomItemOfArray(controlHours),
          checkout: window.utils.getRandomItemOfArray(controlHours),
          features: window.utils.getRandomSliceForArray(window.utils.shuffleArray(features)),
          photos: window.utils.getRandomSliceForArray(window.utils.shuffleArray(photos))
        },
        location: {
          x: window.utils.getRandomNumber(0, maxX),
          y: window.utils.getRandomNumber(Y_MIN, Y_MAX)
        }
      };
      advert.offer.address = advert.location.x + ', ' + advert.location.y + '.';
      advert.offer.description = 'Замечательный ' + advert.offer.type + ' для вашего отдыха всего за ' + advert.offer.price;
      adverts.push(advert);
    }

    return adverts;
  };
  window.adverts = generateAdverts(8);
})();
