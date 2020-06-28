'use strict';

window.formValidation = (function () {
  var price = document.querySelector('#price');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');

  var formTitleTest = function (titleValue) {
    return /^[a-zA-ZА-Яа-я,? ]{30,100}$/.test(titleValue);
  };

  return {

    /**
     * Проверяет соответствие заголовка объявления
     * @param {Object} elem
     */
    titleVerify: function (elem) {
      var msg = '';
      if (formTitleTest(elem.value)) {
        elem.setCustomValidity('');
        elem.style.border = '';
      } else {
        msg = 'Количество символов заголовка должно быть в диапозоне от 30 до 100 символов и состоять только из букв русского или латинского алфавита. Вы набрали ' + elem.value.length;
        elem.setCustomValidity(msg);
        elem.style.border = '2px solid red';
      }
    },

    /**
*
* Проверяет соответствие цены. Она не должна превышать 1000000 р.
* @param {Object} elem
*/
    priceVerify: function (elem) {
      var msg = '';
      if (parseInt(elem.value, 10) <= 1000000 && parseInt(elem.value, 10) >= 0) {
        elem.setCustomValidity('');
        elem.style.border = '';
      } else if (!Number(parseInt(elem.value, 10))) {
        msg = 'Цена исчисляется в цифровом эквиваленте.';
        elem.setCustomValidity(msg);
        elem.style.border = '2px solid red';
      } else {
        msg = 'Максимальное число в поле Цена за ночь может быть равным 1000000. Вы ввели: ' + elem.value;
        elem.setCustomValidity(msg);
        elem.style.border = '2px solid red';
      }
    },
    /**
     *
     * Изменяет атрибут min владельца события в соответствии с выбранным типом жилья
     * @param {Object} elem
     */
    typeCorrelator: function (elem) {
      if (elem.value === 'bungalo') {
        price.min = 0;
      } else if (elem.value === 'flat') {
        price.min = 1000;
      } else if (elem.value === 'house') {
        price.min = 5000;
      } else if (elem.value === 'palace') {
        price.min = 10000;
      }
    },

    /**
     * Синхронизирует время заезда и время выезда
     * @param {Object} elem
     */
    adFormElementTimeSynchronizer: function (elem) {
      if (elem.id === 'timein') {
        timeout.value = elem.value;
      } else if (elem.id === 'timeout') {
        timein.value = elem.value;
      }
    },
    /**
     * Синхронизирует поле «Количество комнат» с полем «Количество мест» и наоборот
     * @param {object} elem
     */
    roomsCapacitySynchronizer: function (elem) {
      var capacity = document.querySelector('#capacity');
      var select = document.createElement('select');
      select.name = 'capacity';
      select.id = 'capacity';
      var num = parseInt(elem.value, 10);
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
