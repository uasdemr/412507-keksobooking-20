'use strict';

window.data = (function () {
  return {
  /**
  * Генератор моковых данных
  * @return {array}
  */
    objGererator: function () {
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
                'x': getRandomArbitrary(0, parseInt(mapWidth, 10) - 50),
                'y': getRandomArbitrary(130, 630)
              }
            }
        );
      }
      return arr;
    }
  };
})();
