'use strict';

window.form = (function () {
  var adForm = document.querySelector('.ad-form');
  var formAddress = document.getElementById('address');
  var map = document.querySelector('.map');

  var data = window.data.objGererator();

  var inputTypeFileAcceptSetter = function () {
    var inputTypeFile = document.querySelectorAll('input[type="file"]');

    inputTypeFile.forEach(function (item) {
      item.setAttribute('accept', 'image/x-png,image/gif,image/jpeg');
    });
  };

  return {
    formDisable: function (element) {
      element.forEach(function (item) {
        item.setAttribute('disabled', 'false');
      });
    },
    formEnable: function (element) {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      element.forEach(function (item) {
        item.removeAttribute('disabled');
      });
      inputTypeFileAcceptSetter();
      window.map.domRender(data);
    },
    /**
     * Устанавливает координаты mainPin в поле Адрес формы
     * @param {Object} mainPin
     */
    setAddress: function (mainPin) {
      var coordX;
      var coordY;
      if (map.classList.contains('map--faded')) {
        coordX = Math.floor(parseInt(mainPin.style.left, 10) + parseInt(mainPin.offsetWidth, 10) / 2);
        coordY = Math.floor(parseInt(mainPin.style.top, 10) - parseInt(mainPin.offsetHeight, 10) / 2);
      } else {
        coordX = Math.floor(parseInt(mainPin.style.left, 10) + parseInt(mainPin.offsetWidth, 10) / 2);
        coordY = Math.floor(parseInt(mainPin.style.top, 10) - parseInt(mainPin.offsetHeight, 10));
      }
      formAddress.disabled = 'true';
      formAddress.placeholder = coordX + ', ' + coordY;
    },
    /**
    * Удаляет старую карточку описания
    */
    domCardRemover: function () {
      var openedCard = document.querySelector('.map__card.popup');
      if (openedCard) {
        openedCard.remove();
      }
    },

    data: data,

  };
})();
