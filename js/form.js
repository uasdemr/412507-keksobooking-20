'use strict';

window.form = (function () {
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var data;
  var title = document.getElementById('title');
  var price = document.getElementById('price');
  var type = document.getElementById('type');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var mapPins = document.querySelector('.map__pins');
  var formAddress = document.getElementById('address');
  var map = document.querySelector('.map');
  var mapFiltersForm = document.querySelector('.map__filters');
  var adFormFieldsets = Array.prototype.slice.call(adForm.children);
  var mapFiltersFormFieldsets = Array.prototype.slice.call(mapFiltersForm.children);
  var allFormsElemsArr = [];
  allFormsElemsArr = adFormFieldsets.concat(mapFiltersFormFieldsets);

  var titleInputHandler = function (evt) {
    window.formValidation.titleVerify(evt);
  };

  var priceInputHandler = function (evt) {
    window.formValidation.priceVerify(evt);
  };

  var typeMouseDownHandler = function () {
    window.formValidation.typeCorrelator(type);
  };

  var timeinChangeHandler = function (evt) {
    window.formValidation.adFormElementTimeSynchronizer(evt);
  };

  var timeoutChangeHandler = function (evt) {
    window.formValidation.adFormElementTimeSynchronizer(evt);
  };

  var roomNumberChangeListener = function (evt) {
    window.formValidation.roomsCapacitySynchronizer(evt);
  };

  var buttonActivator = function (btn) {
    var button = document.querySelector('.map__pin--active');
    if (button) {
      button.classList.remove('map__pin--active');
    }
    if (!btn.classList.contains('map__pin--active')) {
      btn.classList.add('map__pin--active');
    }
  };

  var mapPinsClickHandler = function (evt) {
    var button = (evt.target.nodeName === 'IMG') ? evt.target.parentNode : evt.target;
    if (button.tagName === 'BUTTON' && !button.classList.contains('map__pin--main')) {
      buttonActivator(button);
      var cardX = parseInt(button.style.left, 10) - 25;
      var cardY = parseInt(button.style.top, 10) + 70;
      var it = window.form.data.find(function (item) {
        return item.location.x === cardX && item.location.y === cardY;
      });
      window.form.domCardRemover();
      window.map.domCardRender(it);
    }
  };

  var mapPinsKeydownHandler = function (evt) {
    if (evt.code === 'Escape') {
      window.form.domCardRemover(evt);
    }
  };

  var formDeactivator = function () {
    adForm.classList.add('ad-form--disabled');
  };

  // var formValidityChecker = function () {

  // };
  var successTemplate = document.querySelector('#success').content;
  var successMsg = successTemplate.querySelector('.success');

  var onSuccessMsg = function () {
    var main = document.querySelector('main');
    main.append(successMsg);
    document.body.addEventListener('keydown', successMsgKeyDownRemoveHandler);
    document.body.addEventListener('click', bodyClickOnSuccessMsgRemoveHandler);
    mapPinMain.focus();
  };

  var bodyRemoveListener = function () {
    document.body.removeEventListener('keydown', successMsgKeyDownRemoveHandler);
    document.body.removeEventListener('click', bodyClickOnSuccessMsgRemoveHandler);
  };

  var bodyClickOnSuccessMsgRemoveHandler = function () {
    var success = document.querySelector('.success');
    if (success) {
      // Дописать удаление обработчика
      success.remove();
      bodyRemoveListener();
    }
  };

  var successMsgKeyDownRemoveHandler = function (evt) {
    var success = document.querySelector('.success');
    if (evt.code === 'Escape') {
      if (success) {
        // Дописать удаление обработчика
        success.remove();
        bodyRemoveListener();
      }
    }
  };

  var formSubmit = function (evt) {
    evt.preventDefault();
    formAddress.value = formAddress.placeholder;
    formAddress.removeAttribute('disabled');
    var form = new FormData(adForm);
    window.upload(form, function () {
      adForm.reset();
      window.form.formDisable(allFormsElemsArr);
      window.map.pinsRemover();
      window.map.mapDeactivator();
      formDeactivator();
      mapPinMain.addEventListener('click', window.mainPin.mapPinMainAddHandlers, {once: true});
      mapPinMain.addEventListener('keydown', window.mainPin.mapPinMainAddHandlers, {once: true});
      onSuccessMsg();
    });
  };

  var inputTypeFileAcceptSetter = function () {
    var inputTypeFile = document.querySelectorAll('input[type="file"]');

    inputTypeFile.forEach(function (item) {
      item.setAttribute('accept', 'image/x-png,image/gif,image/jpeg');
    });
  };

  return {
    formDisable: function (elements) {
      elements.forEach(function (item) {
        item.setAttribute('disabled', 'false');
      });
    },
    formEnable: function (elements) {
      elements.forEach(function (item) {
        item.removeAttribute('disabled');
      });
      inputTypeFileAcceptSetter();
      title.addEventListener('input', titleInputHandler);
      price.addEventListener('input', priceInputHandler);
      type.addEventListener('mousedown', typeMouseDownHandler);
      timein.addEventListener('change', timeinChangeHandler);
      timeout.addEventListener('change', timeoutChangeHandler);
      roomNumber.addEventListener('change', roomNumberChangeListener);
      mapPins.addEventListener('click', mapPinsClickHandler);
      mapPins.addEventListener('keydown', mapPinsKeydownHandler);
      adForm.addEventListener('submit', formSubmit);
    },
    /**
     * Устанавливает координаты mainPin в поле Адрес формы
     * @param {Object} mainPin
     */
    setAddress: function (mainPin) {
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
    },
    /**
    * Удаляет старую карточку описания
    */
    domCardRemover: function () {
      var openedCard = document.querySelector('.map__card.popup');
      if (openedCard) {
        openedCard.remove();
      }
    },
    data: data,
  };
})();
