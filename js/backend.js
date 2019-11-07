'use strict';

(function () {
  var XHRStatuses = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    NOT_FOUND: 403,
    SERVER_ERROR: 500
  };

  var makeXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === XHRStatuses.SUCCESS) {
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

  var URLForSave = 'https://js.dump.academy/keksobooking';
  var URLForLoad = 'https://js.dump.academy/keksobooking/data';

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = makeXHR(onLoad, onError);
      xhr.open('GET', URLForLoad);
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = makeXHR(onLoad, onError);
      xhr.open('POST', URLForSave);
      xhr.send(data);
    },

    onSuccessLoad: function (adverts) {
      window.adverts = Array.from(adverts);
      window.pins.addPinElements(window.adverts);
      window.filters.enableFilters();
    }
  };
})();
