'use strict';

window.mainPin = (function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var isDrag = false;

  var limits = {
    top: 130,
    right: map.offsetWidth + map.offsetLeft - (mapPinMain.offsetWidth / 2),
    bottom: 630,
    left: map.offsetLeft + (mapPinMain.offsetWidth / 2)
  };

  var shiftY;
  var shiftX;

  var mapPinMainMouseDownHandler = function (evt) {
    if (evt.button === 0) {

      isDrag = true;
      shiftY = evt.clientY - mapPinMain.getBoundingClientRect().top;
      shiftX = evt.clientX - mapPinMain.getBoundingClientRect().left;

      mapPinMain.addEventListener('mousemove', mapPinMainMouseMoveHandler);
      mapPinMain.addEventListener('mouseup', mapPinMainMouseUpHandler);
    }
  };

  var mapPinMainMouseMoveHandler = function (evt) {
    if (isDrag) {
      var newLocation = {
        x: limits.left,
        y: limits.top
      };

      if (evt.pageX > limits.right) {
        newLocation.x = limits.right;
      } else if (evt.pageX > limits.left) {
        newLocation.x = evt.pageX;
      }
      if (evt.pageY > limits.bottom) {
        newLocation.y = limits.bottom;
      } else if (evt.pageY > limits.top) {
        newLocation.y = evt.pageY;
      }
      relocate(newLocation);
    }
  };



  var mapPinMainMouseUpHandler = function () {
    isDrag = false;
    window.form.setAddress(mapPinMain);
    mapPinMain.removeEventListener('mousemove', mapPinMainMouseMoveHandler);
    mapPinMain.removeEventListener('mouseup', mapPinMainMouseUpHandler);
  };

  //* размещение mapPinMain
  function relocate(newLocation) {
    mapPinMain.style.left = newLocation.x - shiftX + 'px';
    mapPinMain.style.top = newLocation.y - shiftY + 'px';
  }

  mapPinMain.addEventListener('mousedown', mapPinMainMouseDownHandler);



})();
