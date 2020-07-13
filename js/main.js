'use strict';

window.main = (function () {
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adFormFieldsets = Array.prototype.slice.call(adForm.children);
  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFiltersFormFieldsets = Array.prototype.slice.call(mapFiltersForm.children);
  var allFormsElemsArr = [];
  allFormsElemsArr = adFormFieldsets.concat(mapFiltersFormFieldsets);


  var windowOnloadHandler = function () {
    window.form.setAddress(mapPinMain);
    window.form.formElementsEnabler(allFormsElemsArr);
    mapPinMain.addEventListener('click', window.mainPin.mapPinMainAddHandlers, {once: true});
    mapPinMain.addEventListener('keydown', window.mainPin.mapPinMainAddHandlers, {once: true});
  };

  window.addEventListener('load', windowOnloadHandler);

  return {
    windowOnloadHandler: windowOnloadHandler,
  };
})();
