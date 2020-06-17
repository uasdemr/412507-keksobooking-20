'use strict';

window.util = (function () {
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var title = document.getElementById('title');
  var price = document.getElementById('price');
  var type = document.getElementById('type');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var mapPins = document.querySelector('.map__pins');
  var mapFiltersForm = document.querySelector('.map__filters');
  var adFormFieldsets = Array.prototype.slice.call(adForm.children);
  var mapFiltersFormFieldsets = Array.prototype.slice.call(mapFiltersForm.children);
  var allFormsElemsArr = [];
  allFormsElemsArr = adFormFieldsets.concat(mapFiltersFormFieldsets);

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.form.formEnable(allFormsElemsArr);
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.code === 'Enter') {
      window.form.formEnable(allFormsElemsArr);
    }
  });

  window.addEventListener('load', function () {
    window.form.setAddress(mapPinMain);
    window.form.typeCorrelator(type);
  });

  var formTitleTest = function (titleValue) {
    return /^[a-zA-ZА-Яа-я]{30,100}$/.test(titleValue);
  };

  title.addEventListener('input', function (evt) {
    var msg = '';
    if (formTitleTest(evt.target.value)) {
      evt.target.setCustomValidity('');
      evt.target.style.border = '';
    } else {
      msg = 'Количество символов заголовка должно быть в диапозоне от 30 до 100 символов. Вы набрали ' + evt.target.value.length;
      evt.target.setCustomValidity(msg);
      evt.target.style.border = '2px solid red';
    }
  });

  price.addEventListener('input', function (evt) {
    window.form.priceVerify(evt);
  });

  type.addEventListener('change', function () {
    window.form.typeCorrelator(type);
  });

  timein.addEventListener('change', function (evt) {
    window.form.adFormElementTimeSynchronizer(evt);
  });

  timeout.addEventListener('change', function (evt) {
    window.form.adFormElementTimeSynchronizer(evt);
  });

  roomNumber.addEventListener('change', function (evt) {
    window.form.roomsCapacitySynchronizer(evt);
  });

  /**
 * Обработчик клика по pin
 */
  mapPins.addEventListener('click', function (evt) {
    var button = (evt.target.nodeName === 'IMG') ? evt.target.parentNode : button = evt.target;
    if (button.tagName === 'BUTTON' && !button.classList.contains('map__pin--main')) {
      var cardX = parseInt(button.style.left, 10) - 25;
      var cardY = parseInt(button.style.top, 10) + 70;
      var it = window.form.data.find(function (item) {
        return item.location.x === cardX && item.location.y === cardY;
      });
      window.form.domCardRemover();
      window.map.domCardRender(it);
    }
  });

  mapPins.addEventListener('keydown', function (evt) {
    if (evt.code === 'Escape') {
      window.form.domCardRemover(evt);
    }
  });
})();
