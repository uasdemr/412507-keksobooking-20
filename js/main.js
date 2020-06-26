'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adFormFieldsets = Array.prototype.slice.call(adForm.children);
  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFiltersFormFieldsets = Array.prototype.slice.call(mapFiltersForm.children);
  var allFormsElemsArr = [];
  allFormsElemsArr = adFormFieldsets.concat(mapFiltersFormFieldsets);

  var onError = function (message) {
    throw new Error(message);
  };

  var mapPinMainClickHandler = function (evt) {
    if (evt.button === 0) {
      mapActivator(evt);
    }
  };

  var mapPinMainKeyDownHandler = function (evt) {
    if (evt.code === 'Enter') {
      mapActivator(evt);
    }
  };

  var mapActivator = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.formEnable(allFormsElemsArr);
    window.load.getJson('https://javascript.pages.academy/keksobooking/data', window.map.domRender, onError);
  };

  var windowOnloadHandler = function () {
    window.form.setAddress(mapPinMain);
    window.form.formDisable(allFormsElemsArr);
  };


  mapPinMain.addEventListener('click', mapPinMainClickHandler, {once: true});
  mapPinMain.addEventListener('keydown', mapPinMainKeyDownHandler, {once: true});
  window.addEventListener('load', windowOnloadHandler);
})();
