'use strict';

window.map = (function () {
  var mapPins = document.querySelector('.map__pins');
  var mainMap = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

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

    domCardRender: function (dataSet) {
      var cardsFragment = document.createDocumentFragment();
      cardsFragment.append(window.card.domCardElementMaker(dataSet));
      mainMap.insertBefore(cardsFragment, mapFiltersContainer);
    },
  };
})();
