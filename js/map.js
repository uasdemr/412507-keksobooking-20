'use strict';

window.map = (function () {
  var LENGTH_LIMITER = 5;
  var mapPins = document.querySelector('.map__pins');
  var mainMap = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = Array.prototype.slice.call(adForm.children);
  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFiltersFormFieldsets = Array.prototype.slice.call(mapFiltersForm.children);
  var allFormsElemsArr = [];
  allFormsElemsArr = adFormFieldsets.concat(mapFiltersFormFieldsets);

  var onError = function (message) {
    throw new Error(message);
  };

  var cardCloseButtonClickHandler = function () {
    window.form.domCardRemover();
  };

  return {
    /**
     * Заполняет DOM pin`ами из массива объектов data
     * @param {array} data
     */
    domRender: function (data) {
      var pinsFragment = document.createDocumentFragment();
      for (var i = 0; i < LENGTH_LIMITER; i++) {
        if (!data[i]) {
          break;
        }
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
      var popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('click', cardCloseButtonClickHandler);
    },

    mapActivator: function () {
      mainMap.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      window.form.formEnable(allFormsElemsArr);
      window.load.getJson('https://javascript.pages.academy/keksobooking/data', window.filter.filteredDataRender, onError);
    },

    mapDeactivator: function () {
      mainMap.classList.add('map--faded');
    },
  };
})();
