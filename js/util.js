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

  var mapPinMainClickHandler = function (evt) {
    if (evt.button === 0) {
      window.form.formEnable(allFormsElemsArr);
    }
  };

  var mapPinMainKeyDownHandler = function (evt) {
    if (evt.code === 'Enter') {
      window.form.formEnable(allFormsElemsArr);
    }
  };

  var windowOnloadHandler = function () {
    window.form.setAddress(mapPinMain);
  };

  var titleInputHandler = function (evt) {
    window.formValidation.titleVerify(evt);
  };

  var priceInputHandler = function (evt) {
    window.formValidation.priceVerify(evt);
  };

  var typeMouseDownHandler = function () {
    window.formValidation.typeCorrelator(type);
  };

  var timeinChangeHandler = function (evt) {
    window.formValidation.adFormElementTimeSynchronizer(evt);
  };

  var timeoutChangeHandler = function (evt) {
    window.formValidation.adFormElementTimeSynchronizer(evt);
  };

  var roomNumberChangeListener = function (evt) {
    window.formValidation.roomsCapacitySynchronizer(evt);
  };

  var mapPinsClickHandler = function (evt) {
    var button = (evt.target.nodeName === 'IMG') ? evt.target.parentNode : evt.target;
    if (button.tagName === 'BUTTON' && !button.classList.contains('map__pin--main')) {
      var cardX = parseInt(button.style.left, 10) - 25;
      var cardY = parseInt(button.style.top, 10) + 70;
      var it = window.form.data.find(function (item) {
        return item.location.x === cardX && item.location.y === cardY;
      });
      window.form.domCardRemover();
      window.map.domCardRender(it);
    }
  };

  var mapPinsKeydownHandler = function (evt) {
    if (evt.code === 'Escape') {
      window.form.domCardRemover(evt);
    }
  };


  mapPinMain.addEventListener('click', mapPinMainClickHandler, {once: true});

  mapPinMain.addEventListener('keydown', mapPinMainKeyDownHandler);

  window.addEventListener('load', windowOnloadHandler);

  title.addEventListener('input', titleInputHandler);

  price.addEventListener('input', priceInputHandler);

  type.addEventListener('mousedown', typeMouseDownHandler);

  timein.addEventListener('change', timeinChangeHandler);

  timeout.addEventListener('change', timeoutChangeHandler);

  roomNumber.addEventListener('change', roomNumberChangeListener);

  mapPins.addEventListener('click', mapPinsClickHandler);

  mapPins.addEventListener('keydown', mapPinsKeydownHandler);
})();
