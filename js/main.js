'use strict';

var Apartments = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало',
  '': 'Палатка'
};

var Features = {
  'wifi': 'Wi-Fi',
  'dishwasher': 'Посудомоечная машина',
  'parking': 'Парковка',
  'washer': 'Стиральная машина',
  'elevator': 'Лифт',
  'conditioner': 'Кондиционер'
};

/**
 * Генератор моковых данных
 * @return {array}
 */
function objGererator() {
  var arr = [];

  /**
   * Генерирует случайные числа в заданном диапазоне
   * @param {number} min
   * @param {number} max
   * @return {number}
   */
  var getRandomArbitrary = function (min, max) {
    return parseInt(Math.random() * (max - min) + min, 10);
  };

  var types = ['palace', 'flat', 'house', 'bungalo'];
  var checkins = ['12:00', '13:00', '14:00'];
  var checkouts = ['12:00', '13:00', '14:00'];
  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var mapWidth = document.querySelector('.map').clientWidth;

  for (var i = 1; i < 9; i++) {
    arr.push(
        {
          'author': {
            'avatar': 'img/avatars/user0' + i + '.png',
          },
          'offer': {
            'title': 'строка, заголовок предложения',
            'address': '' + getRandomArbitrary(0, 600) + ', ' + getRandomArbitrary(0, 600),
            'price': getRandomArbitrary(300, 2500),
            'type': types[getRandomArbitrary(0, types.length)],
            'rooms': getRandomArbitrary(1, 5),
            'guests': getRandomArbitrary(1, 10),
            'checkin': checkins[getRandomArbitrary(0, checkins.length)],
            'checkout': checkouts[getRandomArbitrary(0, checkouts.length)],
            'features': features,
            'description': 'строка с описанием',
            'photos': photos
          },
          'location': {
            'x': getRandomArbitrary(0, mapWidth),
            'y': getRandomArbitrary(130, 630)
          }
        }
    );

  }
  return arr;
}
var data = objGererator();

var pinTemplate = document.querySelector('#pin').content;
var templateButton = pinTemplate.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

/**
 * Создает pin из полученного объекта
 * @param {object} item
 * @return {object}
 */
var domPinElementMaker = function (item) {
  var mapPin = templateButton.cloneNode(true);
  var mapPinImg = mapPin.querySelector('img');
  mapPinImg.src = item.author.avatar;
  mapPinImg.alt = item.offer.title;
  mapPin.style.left = item.location.x + 25 + 'px';
  mapPin.style.top = item.location.y - 70 + 'px';

  return mapPin;
};

/**
 * Заполняет DOM pin`ами
 */
var domRender = function () {
  var pinsFragment = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    pinsFragment.appendChild(domPinElementMaker(data[i]));
  }
  mapPins.appendChild(pinsFragment);
};

var adTemplate = document.querySelector('#card').content;
var mapsArticle = adTemplate.querySelector('.map__card').cloneNode(true);

// Супер-функция создания карточки объявления, наверняка можно разнести на 2 а то и три разные
/**
 * Создает и возвращает карточку объявления
 * @param {object} dataSet
 * @return {object}
 */
var domCardElementMaker = function (dataSet) {
  var card = mapsArticle.cloneNode(false);
  var cardTitle = mapsArticle.querySelector('.popup__title').cloneNode(true);
  var cardAddress = mapsArticle.querySelector('.popup__text--address').cloneNode(true);
  var cardPrice = mapsArticle.querySelector('.popup__text--price').cloneNode(true);
  var cardPopupType = mapsArticle.querySelector('.popup__type').cloneNode(true);
  var cardCapacity = mapsArticle.querySelector('.popup__text--capacity').cloneNode(true);
  var cardTextTime = mapsArticle.querySelector('.popup__text--time').cloneNode(true);
  var cardFeatures = mapsArticle.querySelector('.popup__features').cloneNode(true);
  var cardDescription = mapsArticle.querySelector('.popup__description').cloneNode(true);
  var cardPhotos = mapsArticle.querySelector('.popup__photos').cloneNode(true);
  var cardAvatar = mapsArticle.querySelector('.popup__avatar').cloneNode(true);

  cardTitle.textContent = dataSet.offer.title;
  cardAddress.textContent = dataSet.offer.address;
  cardPrice.textContent = dataSet.offer.price + ' ₽/ночь';
  cardPopupType.textContent = Apartments[dataSet.offer.type] + ' ₽/ночь';
  cardCapacity.textContent = dataSet.offer.rooms + ' комнаты для ' + dataSet.offer.guests + ' гостей';
  cardTextTime.textContent = 'Заезд после ' + dataSet.offer.checkin + ', выезд до ' + dataSet.offer.checkout;

  var myString = '';
  var featureKeys = Object.keys(Features);
  for (var n = 0; n < featureKeys.length; n++) {
    if (!(featureKeys[n] === featureKeys[featureKeys.length - 1])) {
      myString += Features[featureKeys[n]] + ', ';
    } else {
      myString += Features[featureKeys[n]] + '.';
    }
  }
  cardFeatures.textContent = myString;
  cardDescription.textContent = dataSet.offer.description;
  cardAvatar.src = dataSet.author.avatar;

  // Заполняем cardPhotos коллекцией заполненных img текущего объекта
  for (var j = 0; j < dataSet.offer.photos.length; j++) {
    var cardImg = mapsArticle.querySelector('.popup__photos').querySelector('.popup__photo').cloneNode(true);
    cardImg.src = dataSet.offer.photos[j];
    cardPhotos.appendChild(cardImg);
  }

  var imgs = cardPhotos.getElementsByTagName('img');
  // Удаляет все img с неверным src
  for (var m = 0; m < imgs.length; m++) {
    if (imgs[m].src.includes('localhost')) {
      imgs[m].remove();
    }
  }

  card.append(cardTitle, cardAddress, cardPrice, cardPopupType, cardCapacity, cardTextTime, cardFeatures, cardDescription, cardPhotos, cardAvatar);
  return card;
};

var mainMap = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map__filters-container');

var domCardRender = function (dataSet) {
  var cardsFragment = document.createDocumentFragment();
  cardsFragment.append(domCardElementMaker(dataSet));
  mainMap.insertBefore(cardsFragment, mapFiltersContainer);
};

/**
 * 4 модуль. Активация страницы
 */
var adForm = document.querySelector('.ad-form');
var mapFiltersForm = document.querySelector('.map__filters');

var adFormFieldsets = Array.prototype.slice.call(adForm.children);
var mapFiltersFormFieldsets = Array.prototype.slice.call(mapFiltersForm.children);

var allFormsElemsArr = [];
allFormsElemsArr = adFormFieldsets.concat(mapFiltersFormFieldsets);

var formDisable = function (element) {
  element.forEach(function (item) {
    item.setAttribute('disabled', 'false');
  });
};

var map = document.querySelector('.map');

var formEnable = function (element) {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  element.forEach(function (item) {
    item.removeAttribute('disabled');
  });
  inputTypeFileAcceptSetter();
  domRender();
};

formDisable(allFormsElemsArr);

var inputTypeFileAcceptSetter = function () {
  var inputTypeFile = document.querySelectorAll('input[type="file"]');

  inputTypeFile.forEach(function (item) {
    item.setAttribute('accept', 'image/x-png,image/gif,image/jpeg');
  });
};

var mapPinMain = document.querySelector('.map__pin--main');

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    formEnable(allFormsElemsArr);
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.code === 'Enter') {
    formEnable(allFormsElemsArr);
  }
});

var formAddress = document.getElementById('address');
/**
 * Устанавливает координаты mainPin в поле Адрес формы
 * @param {Object} mainPin
 */
var setAddress = function (mainPin) {
  var coordX;
  var coordY;
  if (map.classList.contains('map--faded')) {
    coordX = Math.floor(parseInt(mainPin.style.left, 10) + parseInt(mainPin.offsetWidth, 10) / 2);
    coordY = Math.floor(parseInt(mainPin.style.top, 10) - parseInt(mainPin.offsetHeight, 10) / 2);
  } else {
    coordX = Math.floor(parseInt(mainPin.style.left, 10) + parseInt(mainPin.offsetWidth, 10) / 2);
    coordY = Math.floor(parseInt(mainPin.style.top, 10) - parseInt(mainPin.offsetHeight, 10));
  }
  formAddress.disabled = 'true';
  formAddress.placeholder = coordX + ', ' + coordY;
};
window.addEventListener('load', function () {
  setAddress(mapPinMain);
  typeCorrelator(type);
});

/**
 * Непростая валидация
 */

var formTitleTest = function (title) {
  return /^[a-zA-ZА-Яа-я]{30,100}$/.test(title);
};

var title = document.getElementById('title');
title.addEventListener('input', function (evt) {
  var msg = '';
  if (formTitleTest(evt.target.value)) {
    evt.target.setCustomValidity('');
    evt.target.style.border = '';
  } else {
    msg = 'Количество символов заголовка должно быть в диапозоне от 30 до 100 символов. Вы набрали ' + evt.target.value.length;
    evt.target.setCustomValidity(msg);
    evt.target.style.border = '2px solid red';
  }
});

var price = document.getElementById('price');
/**
 *
 * @param {Objet} evt
 * Проверяет соответствие цены. Она не должна превышать 1000000 р.
 */
var priceVerify = function (evt) {
  var msg = '';
  if (parseInt(evt.target.value, 10) <= 1000000 && parseInt(evt.target.value, 10) >= 0) {
    evt.target.setCustomValidity('');
    evt.target.style.border = '';
  } else if (!Number(parseInt(evt.target.value, 10))) {
    msg = 'Цена исчисляется в цифровом эквиваленте.';
    evt.target.setCustomValidity(msg);
    evt.target.style.border = '2px solid red';
  } else {
    msg = 'Максимальное число в поле Цена за ночь может быть равным 1000000. Вы ввели: ' + evt.target.value;
    evt.target.setCustomValidity(msg);
    evt.target.style.border = '2px solid red';
  }
};

price.addEventListener('input', function (evt) {
  priceVerify(evt);
});

/**
 *
 * Изменяет атрибут min владельца события в соответствии с выбранным типом жилья
 * @param {Object} type
 */
var typeCorrelator = function (type) {
  if (type.value === 'bungalo') {
    price.min = 0;
  } else if (type.value === 'flat') {
    price.min = 1000;
  } else if (type.value === 'house') {
    price.min = 5000;
  } else if (type.value === 'palace') {
    price.min = 10000;
  }
};

var type = document.getElementById('type');
type.addEventListener('change', function () {
  typeCorrelator(type);
});

/**
 * «Время заезда»
 */
var timein = document.querySelector('#timein');
var timeout = document.querySelector('#timeout');

var adFormElementTimeSynchronizer = function (evt) {
  if (evt.target.id === 'timein') {
    timeout.value = evt.target.value;
  } else if (evt.target.id === 'timeout') {
    timein.value = evt.target.value;
  }
};

timein.addEventListener('change', function (evt) {
  adFormElementTimeSynchronizer(evt);
});

timeout.addEventListener('change', function (evt) {
  adFormElementTimeSynchronizer(evt);
});

/**
 * Синхронизирует поле «Количество комнат» с полем «Количество мест» и наоборот
 * @param {Event object} objEvt
 */
var roomNumber = document.querySelector('#room_number');
var roomsCapacitySynchronizer = function (objEvt) {
  var capacity = document.querySelector('#capacity');
  var select = document.createElement('select');
  select.name = 'capacity';
  select.id = 'capacity';
  var num = parseInt(objEvt.target.value, 10);
  var opt;
  if (num === 100) {
    opt = new Option();
    opt.value = 0;
    opt.text = 'Не для гостей';
    select.add(opt);
    capacity.replaceWith(select);
  } else {
    for (var i = num; i >= 1; i--) {
      opt = new Option();
      opt.value = i;
      opt.text = 'для ' + i + ' гостей';
      select.add(opt);
      capacity.replaceWith(select);
    }
  }
};

roomNumber.addEventListener('change', function (evt) {
  roomsCapacitySynchronizer(evt);
});

/**
 * Обработчик клика по pin
 */
mapPins.addEventListener('click', function (evt) {
  var button = (evt.target.nodeName === 'IMG') ? evt.target.parentNode : button = evt.target;
  if (button.tagName === 'BUTTON' && !button.classList.contains('map__pin--main')) {
    var cardX = parseInt(button.style.left, 10) - 25;
    var cardY = parseInt(button.style.top, 10) + 70;
    var it = data.find(function (item) {
      return item.location.x === cardX && item.location.y === cardY;
    });
    domCardRemover();
    domCardRender(it);
  }
});

/**
 * Удаляет старую карточку описания
 */
var domCardRemover = function () {
  var openedCard = document.querySelector('.map__card.popup');
  if (openedCard) {
    openedCard.remove();
  }
};

mapPins.addEventListener('keydown', function (evt) {
  if (evt.code === 'Escape') {
    domCardRemover(evt);
  }
});
