'use strict';

window.filter = (function () {
  var housingType = document.querySelector('#housing-type');
  var fullData;

  var getHousingTypeData = function () {
    fullData = window.form.data;
    var typeFilteredData = fullData.filter(function (item) {
      return item.offer.type === housingType.value;
    });
    window.map.pinsRemover();
    window.map.domRender(typeFilteredData);
    console.log(typeFilteredData);
  };

  housingType.addEventListener('change', getHousingTypeData);

})();
