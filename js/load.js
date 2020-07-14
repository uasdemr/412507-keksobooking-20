'use strict';
var URL_TO_UPLOAD_DATA = 'https://javascript.pages.academy/keksobooking/data';
var UPLOAD_TIMEOUT = 10000;
var StatusCode = {
  OK: 200
};
window.load = (function () {

  var getJson = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        window.form.data = xhr.response;
        window.filter.defaultFilterObjectSetter();
        onSuccess(window.filter.filterObject);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = UPLOAD_TIMEOUT;

    xhr.open('GET', URL_TO_UPLOAD_DATA);
    xhr.send();
  };

  return {
    getJson: getJson,
  };
})();
