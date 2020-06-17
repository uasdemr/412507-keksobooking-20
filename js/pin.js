'use strict';

window.pin = (function () {
  var pinTemplate = document.querySelector('#pin').content;
  var templateButton = pinTemplate.querySelector('.map__pin');

  return {
  /**
  * Создает pin из полученного объекта
  * @param {object} item
  * @return {object}
  */
    domPinElementMaker: function (item) {
      var mapPin = templateButton.cloneNode(true);
      var mapPinImg = mapPin.querySelector('img');
      mapPinImg.src = item.author.avatar;
      mapPinImg.alt = item.offer.title;
      mapPin.style.left = item.location.x + 25 + 'px';
      mapPin.style.top = item.location.y - 70 + 'px';

      return mapPin;
    },
  };
})();
