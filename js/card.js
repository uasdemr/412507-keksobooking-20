'use strict';

window.card = (function () {
  var adTemplate = document.querySelector('#card').content;
  var mapsArticle = adTemplate.querySelector('.map__card').cloneNode(true);

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
   * Создает и возвращает карточку объявления
   * @param {object} dataSet
   * @return {object}
   */
  return {
    domCardElementMaker: function (dataSet) {
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
      var popupСlose = mapsArticle.querySelector('.popup__close').cloneNode(true);

      cardTitle.textContent = dataSet.offer.title;
      cardAddress.textContent = dataSet.offer.address;
      cardPrice.textContent = dataSet.offer.price + ' ₽/ночь';
      cardPopupType.textContent = Apartments[dataSet.offer.type] + ' ₽/ночь';
      cardCapacity.textContent = dataSet.offer.rooms + ' комнаты для ' + dataSet.offer.guests + ' гостей';
      cardTextTime.textContent = 'Заезд после ' + dataSet.offer.checkin + ', выезд до ' + dataSet.offer.checkout;

      var myString = '';
      var features = dataSet.offer.features;
      if (features.length > 1) {
        features.forEach(function (item, key) {
          if (item in Features && key < features.length - 1) {
            myString += Features[item] + ', ';
          } else {
            myString += Features[item] + '.';
          }
        });
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

      card.append(cardTitle, cardAddress, cardPrice, cardPopupType, cardCapacity, cardTextTime);

      if (cardFeatures.textContent) {
        card.append(cardFeatures);
      }
      card.append(cardDescription, cardPhotos, cardAvatar, popupСlose);

      return card;
    },
  };
})();
