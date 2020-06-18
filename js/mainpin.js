'use strict';

window.mainPin = (function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var startCoords = {};
  var dragged = false;

  var mapPinMainMouseDownHandler = function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();

      startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      mapPinMain.addEventListener('mousemove', mapPinMainMouseMoveHandler);
      mapPinMain.addEventListener('mouseup', mapPinMainMouseUpHandler);
    }
  };


  var mapPinMainMouseMoveHandler = function (evt) {
    //evt.preventDefault();

    dragged = true;

    var shift = {
      x: startCoords.x - evt.clientX,
      y: startCoords.y - evt.clientY
    };

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
    mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
  };


  var mapPinMainMouseUpHandler = function (evt) {
    window.form.setAddress(mapPinMain);
    mapPinMain.removeEventListener('mousemove', mapPinMainMouseMoveHandler);
    mapPinMain.removeEventListener('mouseup', mapPinMainMouseUpHandler);

    if (dragged) {

    }

  };

  mapPinMain.addEventListener('mousedown', mapPinMainMouseDownHandler);

})();
