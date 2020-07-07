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
  var filterObject = {
    conditioner: false,
    dishwasher: false,
    elevator: false,
    guest: 'any',
    parking: false,
    price: 'Любая',
    rooms: 'any',
    type: 'any',
    washer: false,
    wifi: false,
  };

  var defaultFilterObjectSetter = function () {
    filterObject = {
      conditioner: false,
      dishwasher: false,
      elevator: false,
      guest: 'any',
      parking: false,
      price: 'Любая',
      rooms: 'any',
      type: 'any',
      washer: false,
      wifi: false,
    };
  };

  var housingTypeHandler = function (evt) {
    filterObject.type = evt.target.value;
    filteredDataRender(filterObject);
  };

  var housingPriceHandler = function (evt) {
    filterObject.price = evt.target.options[evt.target.selectedIndex].text;
    filteredDataRender(filterObject);
  };

  var housingRoomsHandler = function (evt) {
    filterObject.rooms = evt.target.options[evt.target.selectedIndex].value;
    filteredDataRender(filterObject);
  };
  var housingGuestHandler = function (evt) {
    filterObject.guest = evt.target.options[evt.target.selectedIndex].value;
    filteredDataRender(filterObject);
  };
  var filterWifiHandler = function (evt) {
    filterObject.wifi = evt.target.checked;
    filteredDataRender(filterObject);
  };
  var filterDishwasherHandler = function (evt) {
    filterObject.dishwasher = evt.target.checked;
    filteredDataRender(filterObject);
  };
  var filterParkingHandler = function (evt) {
    filterObject.parking = evt.target.checked;
    filteredDataRender(filterObject);
  };
  var filterWasherHandler = function (evt) {
    filterObject.washer = evt.target.checked;
    filteredDataRender(filterObject);
  };
  var filterElevatorHandler = function (evt) {
    filterObject.elevator = evt.target.checked;
    filteredDataRender(filterObject);
  };
  var filterConditionerHandler = function (evt) {
    filterObject.conditioner = evt.target.checked;
    filteredDataRender(filterObject);
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

  /**
   * Принимает объект фильтрации и вызывает функцию отрисовски пинов,
   * которые соответствуют объекту фильтрации, настроенному по умолчанию
   * первичной загрузки. Если фильтр возвращается в первоначальное состояние
   * отрисовываются исходные данные.
   * @param {Object} obj
   */
  var filteredDataRender = function (obj) {
    fullData = window.form.data.slice();
    var filteredData;
    if (obj.type) {
      filteredData = fullData.filter(function (item) {
        return item.offer.type === obj.type;
      });

      if (obj.type === 'any') {
        filteredData = fullData.filter(function (item) {
          return item.offer.type !== '';
        });
      }
    }

    if (obj.price) {
      var price = getNumber(obj.price);
      if (price.length > 1) {
        filteredData = filteredData.filter(function (item) {
          return item.offer.price >= price[0] && item.offer.price <= price[1];
        });
      } else {
        if (price[0] <= 10000) {
          filteredData = filteredData.filter(function (item) {
            return item.offer.price <= price[0];
          });
        }
        if (price[0] >= 50000) {
          filteredData = filteredData.filter(function (item) {
            return item.offer.price >= price[0];
          });
        }
        if (price.length === 0) {
          filteredData = filteredData.filter(function (item) {
            return item.offer.price > 0;
          });
        }
      }
    }
    if (obj.rooms) {
      var rooms = getNumber(obj.rooms);
      if (rooms.length > 0) {
        filteredData = filteredData.filter(function (item) {
          return item.offer.rooms === rooms[0];
        });
      }
      if (rooms.length === 0) {
        filteredData = filteredData.filter(function (item) {
          return item.offer.rooms !== 0;
        });
      }
    }
    if (obj.guest) {
      var guest = getNumber(obj.guest);
      if (guest.length > 0) {
        filteredData = filteredData.filter(function (item) {
          return item.offer.guests === guest[0];
        });
      }
      if (parseInt(obj.guest, 10) === 0) {
        filteredData = filteredData.filter(function (item) {
          return item.offer.guests > 2;
        });
      }
      if (obj.guest === 'any') {
        filteredData = filteredData.filter(function (item) {
          return item.offer.guests > 0;
        });
      }

      if (obj.wifi) {
        filteredData = filteredData.filter(function (item) {
          return item.offer.features.indexOf(filterWifi.value) !== -1;
        });
      }
      if (obj.dishwasher) {
        filteredData = filteredData.filter(function (item) {
          return item.offer.features.indexOf(filterDishwasher.value) !== -1;
        });
      }
      if (obj.parking) {
        filteredData = filteredData.filter(function (item) {
          return item.offer.features.indexOf(filterParking.value) !== -1;
        });
      }
      if (obj.washer) {
        filteredData = filteredData.filter(function (item) {
          return item.offer.features.indexOf(filterWasher.value) !== -1;
        });
      }
      if (obj.elevator) {
        filteredData = filteredData.filter(function (item) {
          return item.offer.features.indexOf(filterElevator.value) !== -1;
        });
      }
      if (obj.conditioner) {
        filteredData = filteredData.filter(function (item) {
          return item.offer.features.indexOf(filterConditioner.value) !== -1;
        });
      }

      if (
        filterObject.conditioner === false &&
        filterObject.dishwasher === false &&
        filterObject.elevator === false &&
        filterObject.guest === 'any' &&
        filterObject.parking === false &&
        filterObject.price === 'Любая' &&
        filterObject.rooms === 'any' &&
        filterObject.type === 'any' &&
        filterObject.washer === false &&
        filterObject.wifi === false
      ) {
        window.map.domRender(window.form.data);
      }
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

  return {
    filteredDataRender: filteredDataRender,
    filterObject: filterObject,
    defaultFilterObjectSetter: defaultFilterObjectSetter,
  };
})();
