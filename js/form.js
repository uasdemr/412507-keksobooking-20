'use strict';

window.form = (function () {
  var adForm = document.querySelector('.ad-form');
  var formAddress = document.getElementById('address');
  var price = document.getElementById('price');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
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
    *
    * @param {Objet} evt
    * Проверяет соответствие цены. Она не должна превышать 1000000 р.
    */
    priceVerify: function (evt) {
      var msg = '';
      if (parseInt(evt.target.value, 10) <= 1000000 && parseInt(evt.target.value, 10) >= 0) {
        evt.target.setCustomValidity('');
        evt.target.style.border = '';
      } else if (!Number(parseInt(evt.target.value, 10))) {
        msg = 'Цена исчисляется в цифровом эквиваленте.';
        evt.target.setCustomValidity(msg);
        evt.target.style.border = '2px solid red';
      } else {
        msg = 'Максимальное число в поле Цена за ночь может быть равным 1000000. Вы ввели: ' + evt.target.value;
        evt.target.setCustomValidity(msg);
        evt.target.style.border = '2px solid red';
      }
    },
    /**
     *
     * Изменяет атрибут min владельца события в соответствии с выбранным типом жилья
     * @param {Object} type
     */
    typeCorrelator: function (type) {
      if (type.value === 'bungalo') {
        price.min = 0;
      } else if (type.value === 'flat') {
        price.min = 1000;
      } else if (type.value === 'house') {
        price.min = 5000;
      } else if (type.value === 'palace') {
        price.min = 10000;
      }
    },

    adFormElementTimeSynchronizer: function (evt) {
      if (evt.target.id === 'timein') {
        timeout.value = evt.target.value;
      } else if (evt.target.id === 'timeout') {
        timein.value = evt.target.value;
      }
    },
    /**
     * Синхронизирует поле «Количество комнат» с полем «Количество мест» и наоборот
     * @param {object} objEvt
     */
    roomsCapacitySynchronizer: function (objEvt) {
      var capacity = document.querySelector('#capacity');
      var select = document.createElement('select');
      select.name = 'capacity';
      select.id = 'capacity';
      var num = parseInt(objEvt.target.value, 10);
      var opt;
      if (num === 100) {
        opt = new Option();
        opt.value = 0;
        opt.text = 'Не для гостей';
        select.add(opt);
        capacity.replaceWith(select);
      } else {
        for (var i = num; i >= 1; i--) {
          opt = new Option();
          opt.value = i;
          opt.text = 'для ' + i + ' гостей';
          select.add(opt);
          capacity.replaceWith(select);
        }
      }
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
