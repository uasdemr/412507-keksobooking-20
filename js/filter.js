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
  var fullData = [];
  var filteredData;

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

  /**
   * Возвращает объект-фильтр к состоянию по умолчанию
   */
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

  var housingTypeHandler = window.debounce(function (evt) {
    filterObject.type = evt.target.value;
    filteredDataRender(filterObject);
  });

  var housingPriceHandler = window.debounce(function (evt) {
    filterObject.price = evt.target.options[evt.target.selectedIndex].text;
    filteredDataRender(filterObject);
  });

  var housingRoomsHandler = window.debounce(function (evt) {
    filterObject.rooms = evt.target.options[evt.target.selectedIndex].value;
    filteredDataRender(filterObject);
  });
  var housingGuestHandler = window.debounce(function (evt) {
    filterObject.guest = evt.target.options[evt.target.selectedIndex].value;
    filteredDataRender(filterObject);
  });
  var filterWifiHandler = window.debounce(function (evt) {
    filterObject.wifi = evt.target.checked;
    filteredDataRender(filterObject);
  });
  var filterDishwasherHandler = window.debounce(function (evt) {
    filterObject.dishwasher = evt.target.checked;
    filteredDataRender(filterObject);
  });
  var filterParkingHandler = window.debounce(function (evt) {
    filterObject.parking = evt.target.checked;
    filteredDataRender(filterObject);
  });
  var filterWasherHandler = window.debounce(function (evt) {
    filterObject.washer = evt.target.checked;
    filteredDataRender(filterObject);
  });
  var filterElevatorHandler = window.debounce(function (evt) {
    filterObject.elevator = evt.target.checked;
    filteredDataRender(filterObject);
  });
  var filterConditionerHandler = window.debounce(function (evt) {
    filterObject.conditioner = evt.target.checked;
    filteredDataRender(filterObject);
  });

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
   * Функция фильтрации по типу жилья
   * @param {Object} obj
  */
  var typeFilter = function (obj) {
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
  };

  /**
   * Функция фильтрации по стоимости
   * @param {Object} obj
   */
  var priceFilter = function (obj) {
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
  };

  /**
   * Функция фильтрации по колличеству комнат
   * @param {Object} obj
   */
  var roomsFilter = function (obj) {
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
  };

  /**
   * Функция фильтрации по колличеству гостей
   * @param {Object} obj
   */
  var guestsFilter = function (obj) {
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
    }
  };

  /**
   * Функция проверяет наличие свойства str объекта filterObject
   * и если оно есть- фильтрует массив соответственно полученой строки
   * @param {String} str
   */
  var isOption = function (str) {
    if (filterObject[str]) {
      filteredData = filteredData.filter(function (item) {
        return item.offer.features.indexOf(str) !== -1;
      });
    }
  };

  /**
   * Принимает объект фильтрации и вызывает функции проверки этого объекта.
   * Если фильтр возвращается в первоначальное состояние- отрисовываются
   * исходные данные.
   * @param {Object} obj
   */
  var filteredDataRender = function (obj) {
    fullData = window.form.data.slice();

    typeFilter(obj);
    priceFilter(obj);
    roomsFilter(obj);
    guestsFilter(obj);
    isOption('wifi');
    isOption('dishwasher');
    isOption('parking');
    isOption('washer');
    isOption('elevator');
    isOption('conditioner');

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
