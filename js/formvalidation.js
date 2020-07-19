'use strict';

window.formValidation = (function () {
  var PRICE_MAX_VALUE = 1000000;
  var PRICE_MIN_VALUE = 0;
  var MIN_HOUSING_COST = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  var price = document.querySelector('#price');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');

  var formTitleTest = function (titleValue) {
    return /^[\D,\-\s]{30,60}$/.test(titleValue);
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
      } else {
        msg = 'Количество символов заголовка должно быть в диапозоне от 30 до 100 символов и состоять только из букв русского или латинского алфавита. Вы набрали ' + elem.value.length;
        elem.setCustomValidity(msg);
      }
    },

    /**
*
* Проверяет соответствие цены. Она не должна превышать 1000000 р.
* @param {Object} elem
*/
    priceVerify: function (elem) {
      var msg = '';
      if (parseInt(elem.value, 10) <= PRICE_MAX_VALUE && parseInt(elem.value, 10) >= PRICE_MIN_VALUE) {
        elem.setCustomValidity('');
      } else if (!Number(parseInt(elem.value, 10))) {
        msg = 'Цена исчисляется в цифровом эквиваленте.';
        elem.setCustomValidity(msg);
      } else {
        msg = 'Максимальное число в поле Цена за ночь может быть равным 1000000. Вы ввели: ' + elem.value;
        elem.setCustomValidity(msg);
      }
    },
    /**
     *
     * Изменяет атрибут min и placeholder у элемента price в соответствии с выбранным типом жилья
     * @param {Object} elem
     */
    typeCorrelator: function (elem) {
      switch (elem.value) {
        case 'bungalo':
          price.min = MIN_HOUSING_COST.BUNGALO;
          price.placeholder = MIN_HOUSING_COST.BUNGALO;
          break;
        case 'flat':
          price.min = MIN_HOUSING_COST.FLAT;
          price.placeholder = MIN_HOUSING_COST.FLAT;
          break;
        case 'house':
          price.min = MIN_HOUSING_COST.HOUSE;
          price.placeholder = MIN_HOUSING_COST.HOUSE;
          break;
        case 'palace':
          price.min = MIN_HOUSING_COST.PALACE;
          price.placeholder = MIN_HOUSING_COST.PALACE;
          break;
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
        opt.text = 'не для гостей';
        select.add(opt);
        capacity.replaceWith(select);
      } else if (num === 1) {
        opt = new Option();
        opt.value = 1;
        opt.text = 'для ' + num + ' гостя';
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
