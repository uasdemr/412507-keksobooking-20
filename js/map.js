'use strict';

window.map = (function () {
  var mapPins = document.querySelector('.map__pins');
  var mainMap = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = Array.prototype.slice.call(adForm.children);
  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFiltersFormFieldsets = Array.prototype.slice.call(mapFiltersForm.children);
  var allFormsElemsArr = [];
  allFormsElemsArr = adFormFieldsets.concat(mapFiltersFormFieldsets);

  var onError = function (message) {
    throw new Error(message);
  };

  return {
    /**
     * Заполняет DOM pin`ами из массива объектов data
     * @param {array} data
     */
    domRender: function (data) {
      window.form.data = data;
      var pinsFragment = document.createDocumentFragment();
      for (var i = 0; i < data.length; i++) {
        if (data[i].hasOwnProperty('offer')) {
          pinsFragment.appendChild(window.pin.domPinElementMaker(data[i]));
        }
      }
      mapPins.appendChild(pinsFragment);
    },

    pinsRemover: function () {
      var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pins.length; i++) {
        pins[i].remove();
      }
    },

    domCardRender: function (dataSet) {
      var cardsFragment = document.createDocumentFragment();
      cardsFragment.append(window.card.domCardElementMaker(dataSet));
      mainMap.insertBefore(cardsFragment, mapFiltersContainer);
    },

    mapActivator: function () {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      window.form.formEnable(allFormsElemsArr);
      window.load.getJson('https://javascript.pages.academy/keksobooking/data', window.map.domRender, onError);
    },

    mapDeactivator: function () {
      mainMap.classList.add('map--faded');
    },
  };
})();
