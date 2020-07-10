'use strict';

window.filter = (function () {
  var mapFilters = document.querySelector('.map__filters');
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

  /**
   * Принимает объект события, устанавливает фильтр в зависимости от события
   * и вызывает рендер, передавая у него измененный объект опций фильтрации
   * @param {Object} evt
   */
  var mapFiltersHandler = function (evt) {
    if (evt.target.id === 'housing-type') {
      filterObject.type = evt.target.value;
    }
    if (evt.target.id === 'housing-price') {
      filterObject['price'] = evt.target.options[evt.target.selectedIndex].text;
    }
    if (evt.target.id === 'housing-rooms') {
      filterObject['rooms'] = evt.target.options[evt.target.selectedIndex].value;
    }
    if (evt.target.id === 'housing-guests') {
      filterObject.guest = evt.target.options[evt.target.selectedIndex].value;
    }
    if (evt.target.id.includes('filter')) {
      filterObject[evt.target.value] = evt.target.checked;
    }

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
  var filteredDataRender = window.debounce(function (obj) {
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
  });

  mapFilters.addEventListener('change', mapFiltersHandler);

  return {
    filteredDataRender: filteredDataRender,
    filterObject: filterObject,
    defaultFilterObjectSetter: defaultFilterObjectSetter,
  };
})();
