'use strict';

function objGererator() {
  //Массив объектов, который вернем заполненным
  var arr = [];

  //Генерит случайное число в диапазоне min, max
  var getRandomArbitrary = function (min, max) {
    return parseInt(Math.random() * (max - min) + min);
  };

  var types = ['palace', 'flat', 'house', 'bungalo'];
  var checkins = ["12:00", "13:00", "14:00"];
  var checkout = ["12:00", "13:00", "14:00"];
  var photos = [
        "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
        "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
        "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
      ];
  var features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

  //Длина карты
  var map = document.querySelector('.map');
  var mapWidth = document.querySelector('.map').clientWidth;
  map.classList.remove('map--faded');

  //Заполняем массив
  for(var i = 1; i < 9; i++) {
    arr.push(
      {
        "author": {
          "avatar": "img/avatars/user0" + i + ".png",
        },
        "offer": {
          "title": "строка, заголовок предложения",
          "address": "" + getRandomArbitrary(0, 600) + ", " + getRandomArbitrary(0, 600),
          "price": getRandomArbitrary(300, 2500),
          "type": types[parseInt(getRandomArbitrary(0, types.length))],
          "rooms": getRandomArbitrary(1, 5),
          "guests": getRandomArbitrary(1, 10),
          "checkin": checkins[parseInt(getRandomArbitrary(0, checkins.length))],
          "checkout": checkout[parseInt(getRandomArbitrary(0, checkout.length))],
          "features": features[parseInt(getRandomArbitrary(0, features.length))],
          "description": "строка с описанием",
          "photos": photos[parseInt(getRandomArbitrary(0, photos.length))],
        },
        "location": {
          "x": getRandomArbitrary(0, parseInt(mapWidth)),
          "y": getRandomArbitrary(130, 630)
        }
      }
    );

  }
  //Возвращаем заполненный массив
  return arr;
}
var data = objGererator();
//var
console.log(objGererator());
