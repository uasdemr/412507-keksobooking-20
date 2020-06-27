'use strict';

window.formValidation = (function () {
  var price = document.getElementById('price');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');

  var formTitleTest = function (titleValue) {
    return /^[a-zA-ZА-Яа-я, ]{30,100}$/.test(titleValue);
  };

  return {

    /**
     * Проверяет соответствие заголовка объявления
     * @param {Object} evt
     */
    titleVerify: function (evt) {
      var msg = '';
      if (formTitleTest(evt.target.value)) {
        evt.target.setCustomValidity('');
        evt.target.style.border = '';
      } else {
        msg = 'Количество символов заголовка должно быть в диапозоне от 30 до 100 символов и состоять только из букв русского или латинского алфавита. Вы набрали ' + evt.target.value.length;
        evt.target.setCustomValidity(msg);
        evt.target.style.border = '2px solid red';
      }
    },

    /**
*
* Проверяет соответствие цены. Она не должна превышать 1000000 р.
* @param {Object} evt
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
  };
})();
