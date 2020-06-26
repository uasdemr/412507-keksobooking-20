'use strict';
(function () {
  var url = 'https://javascript.pages.academy/keksobooking';

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', url);
    xhr.send(data);
  };
})();
