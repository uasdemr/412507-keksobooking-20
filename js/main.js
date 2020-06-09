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

// Заполняет карточку предложения
var myAppend = function (card, optionsArr) {
  for (var o = 0; o < optionsArr.length; o++) {
    card.appendChild(optionsArr[o]);
  }
};

// Функция генерации 8-ми объектов упакованных в массив
function objGererator() {
  var arr = [];

  // Функция генерирует случайные числа в заданном диапазоне
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
  var map = document.querySelector('.map');
  var mapWidth = document.querySelector('.map').clientWidth;

  map.classList.remove('map--faded');

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

// Создаем пин
var domPinElementMaker = function (item) {
  var mapPin = templateButton.cloneNode(true);
  var mapPinImg = mapPin.querySelector('img');
  mapPinImg.src = item.author.avatar;
  mapPinImg.alt = item.offer.title;
  mapPin.style.left = item.location.x + 25 + 'px';
  mapPin.style.top = item.location.y - 70 + 'px';

  return mapPin;
};

// Заполняем DOM пинами через documentFragment
var domRender = function () {
  var pinsFragment = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    pinsFragment.appendChild(domPinElementMaker(data[i]));
  }
  mapPins.appendChild(pinsFragment);
};
domRender();

var adTemplate = document.querySelector('#card').content;
var mapsArticle = adTemplate.querySelector('.map__card').cloneNode(true);

// Супер-функция создания карточки объявления, наверняка можно разнести на 2 а то и три разные
var domCardElementMaker = function (dataSet) {
  // Инициализация переменных для карточки описания
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

  // Заполнение переменных данными из массива объектов
  cardTitle.textContent = dataSet.offer.title;
  cardAddress.textContent = dataSet.offer.address;
  cardPrice.textContent = dataSet.offer.price + ' ₽/ночь';
  cardPopupType.textContent = Apartments[dataSet.offer.type] + ' ₽/ночь';
  cardCapacity.textContent = dataSet.offer.rooms + ' комнаты для ' + dataSet.offer.guests + ' гостей';
  cardTextTime.textContent = 'Заезд после ' + dataSet.offer.checkin + ', выезд до ' + dataSet.offer.checkout;

  // Делаем красивый вывод опций в жилище. В конце ставится точечка.
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
  // Этот прекрасный цикл удаляет все img с пустым src, которые любезно подсовывает академия
  for (var m = 0; m < imgs.length; m++) {
    if (imgs[m].src.includes('localhost')) {
      imgs[m].remove();
    }
  }

  // Возвращаем заполненную карточку
  myAppend(card, [cardTitle, cardAddress, cardPrice, cardPopupType, cardCapacity, cardTextTime, cardFeatures, cardDescription, cardPhotos, cardAvatar]);

  // card.append(cardTitle, cardAddress, cardPrice, cardPopupType, cardCapacity, cardTextTime, cardFeatures, cardDescription, cardPhotos, cardAvatar);
  return card;
};

var mainMap = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map__filters-container');

// Добавляем карточки в цикле в дом
var domCardRender = function domCardRender(dataSet) {
  var cardsFragment = document.createDocumentFragment();
  for (var k = 0; k < dataSet.length; k++) {
    // mainMap.insertBefore(domCardElementMaker(dataSet[k]), mapFiltersContainer);
    cardsFragment.appendChild(domCardElementMaker(dataSet[k]));
  }
  mainMap.insertBefore(cardsFragment, mapFiltersContainer);
};
domCardRender(data);
