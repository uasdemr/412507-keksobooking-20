'use strict';

window.mainPin = (function () {
  var HALF_MAP_PIN_MAIN_WIDTH = 32;
  var HALF_MAP_MAIN_HEIGHT = 32;
  var MAP_PIN_MAIN_HEIGHT = 65;
  var TOP_LIMIT = 130;
  var BOTTOM_LIMIT = 630;

  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapWidth = parseInt(map.offsetWidth, 10);
  var mapPins = document.querySelector('.map__pins');
  var startCoords = {};
  var newLoc = {};
  var shift = {};

  var mapPinMainMouseDownHandler = function (evt) {
    if (evt.button === 0) {

      startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      document.addEventListener('mousemove', mapPinMainMouseMoveHandler);
      document.addEventListener('mouseup', mapPinMainMouseUpHandler);
    }
  };

  var mapPinMainMouseMoveHandler = function (evt) {
    shift = {
      x: startCoords.x - evt.clientX,
      y: startCoords.y - evt.clientY
    };

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    newLoc.x = mapPinMain.offsetLeft - shift.x;
    newLoc.y = mapPinMain.offsetTop - shift.y;

    if (newLoc.x >= -HALF_MAP_PIN_MAIN_WIDTH && newLoc.x <= mapWidth - HALF_MAP_PIN_MAIN_WIDTH) {
      mapPinMain.style.left = newLoc.x + 'px';
    }

    if (newLoc.y >= TOP_LIMIT - HALF_MAP_MAIN_HEIGHT && newLoc.y + MAP_PIN_MAIN_HEIGHT <= BOTTOM_LIMIT + MAP_PIN_MAIN_HEIGHT) {
      mapPinMain.style.top = newLoc.y + 'px';
    }
  };

  var mapPinMainMouseUpHandler = function () {
    window.form.setAddress(mapPinMain);
    document.removeEventListener('mousemove', mapPinMainMouseMoveHandler);
    document.removeEventListener('mouseup', mapPinMainMouseUpHandler);
  };

  mapPinMain.addEventListener('mousedown', mapPinMainMouseDownHandler);

  var mapPinMainClickHandler = function (evt) {
    if (evt.button === 0) {
      window.map.mapActivator(evt);
    }
  };

  var mapPinMainKeyDownHandler = function (evt) {
    if (evt.code === 'Enter') {
      window.map.mapActivator(evt);
    }
  };

  return {
    mapPinMainAddHandlers: function (evt) {
      mapPinMainClickHandler(evt);
      mapPinMainKeyDownHandler(evt);
    },

    mapPinMainSetCenter: function () {
      var top = (parseInt(mapPins.offsetHeight, 10) / 2) + 23;
      var left = (parseInt(mapPins.offsetWidth, 10) / 2) - 30;
      mapPinMain.style.top = top + 'px';
      mapPinMain.style.left = left + 'px';
    },
  };
})();
