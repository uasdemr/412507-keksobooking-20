'use strict';

window.filter = (function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuest = document.querySelector('#housing-guests');
  var filterWifi = document.querySelector('#filter-wifi');
  var filterDishwasher = document.querySelector('#filter-dishwasher');
  var filterParking = document.querySelector('#filter-parking');
  var filterWasher = document.querySelector('#filter-washer');
  var filterElevator = document.querySelector('#filter-elevator');
  var filterConditioner = document.querySelector('#filter-conditioner');

  var fullData;
  var filterObject = {};

  var housingTypeHandler = function (evt) {
    filterObject.type = evt.target.value;
    filteredDataRender(filterObject);
  };

  var housingPriceHandler = function (evt) {
    filterObject.price = evt.target.options[evt.target.selectedIndex].text;
  };

  var housingRoomsHandler = function (evt) {
    filterObject.rooms = evt.target.options[evt.target.selectedIndex].value;
  };
  var housingGuestHandler = function (evt) {
    filterObject.guest = evt.target.options[evt.target.selectedIndex].value;
  };
  var filterWifiHandler = function (evt) {
    filterObject.wifi = evt.target.checked;
  };
  var filterDishwasherHandler = function (evt) {
    filterObject.dishwasher = evt.target.checked;
  };
  var filterParkingHandler = function (evt) {
    filterObject.parking = evt.target.checked;
  };
  var filterWasherHandler = function (evt) {
    filterObject.washer = evt.target.checked;
  };
  var filterElevatorHandler = function (evt) {
    filterObject.elevator = evt.target.checked;
  };
  var filterConditionerHandler = function (evt) {
    filterObject.conditioner = evt.target.checked;
    console.log(filterObject);
  };

  /**
   * Принимает на вход строку содержащую числа
   * и возвращает массив целых чисел
   * @param {String} str
   * @return {Array}
   */
  var getNumber = function (str) {
    var strArr = str.split(' ');
    var myFilteredArr = strArr.filter(function (item) {
      return parseInt(item, 10);
    });
    myFilteredArr = myFilteredArr.map(function (item) {
      return parseInt(item, 10);
    });
    return myFilteredArr;
  };

  // Допписать filteredDataRender с учетом всех особенностей obj
  var filteredDataRender = function (obj) {
    fullData = window.form.data;
    var filteredData;
    if (obj.type) {
      filteredData = fullData.filter(function (item) {
        return item.offer.type === obj.type;
      });
    }
    if (obj.price) {
      filteredData = fullData.filter(function (item) {
        return item.offer.price === obj.price;
      });
    }
    window.form.domCardRemover();
    window.map.pinsRemover();
    window.map.domRender(filteredData);
  };

  housingType.addEventListener('change', housingTypeHandler);
  housingPrice.addEventListener('change', housingPriceHandler);
  housingRooms.addEventListener('change', housingRoomsHandler);
  housingGuest.addEventListener('change', housingGuestHandler);

  filterWifi.addEventListener('change', filterWifiHandler);
  filterDishwasher.addEventListener('change', filterDishwasherHandler);
  filterParking.addEventListener('change', filterParkingHandler);
  filterWasher.addEventListener('change', filterWasherHandler);
  filterElevator.addEventListener('change', filterElevatorHandler);
  filterConditioner.addEventListener('change', filterConditionerHandler);
})();
