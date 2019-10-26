'use strict';

(function () {
  var makeXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;

    return xhr;
  };

  window.backend = {
    URLForSave: 'https://js.dump.academy/keksobooking',
    URLForLoad: 'https://js.dump.academy/keksobooking/data',
    load: function (onLoad, onError) {
      var xhr = makeXHR(onLoad, onError);
      xhr.open('GET', window.backend.URLForLoad);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = makeXHR(onLoad, onError);
      xhr.open('POST', window.backend.URLForSave);
      xhr.send(data);
    },
    onRequestError: function (message) {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorElement = errorTemplate.cloneNode(true);
      errorElement.querySelector('p').textContent = message;
      document.querySelector('main').appendChild(errorElement);
      document.querySelector('main').addEventListener('mousedown', function () {
        document.querySelector('main').removeChild(errorElement);
      });
    }
  };
})();
