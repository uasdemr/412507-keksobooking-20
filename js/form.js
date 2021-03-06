'use strict';

window.form = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DELTA_SHIFT = 1;
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var data;
  var title = document.querySelector('#title');
  var price = document.querySelector('#price');
  var type = document.querySelector('#type');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var mapPins = document.querySelector('.map__pins');
  var formAddress = document.querySelector('#address');
  var map = document.querySelector('.map');
  var mapFiltersForm = document.querySelector('.map__filters');
  var adFormFieldsets = Array.prototype.slice.call(adForm.children);
  var mapFiltersFormFieldsets = Array.prototype.slice.call(mapFiltersForm.children);
  var allFormsElemsArr = [];
  allFormsElemsArr = adFormFieldsets.concat(mapFiltersFormFieldsets);
  var successTemplate = document.querySelector('#success').content;
  var successMsg = successTemplate.querySelector('.success').cloneNode(true);
  var adFormHeaderPreview = document.querySelector('.ad-form-header__preview img');
  var adFormPhoto = document.querySelector('.ad-form__photo');

  var fileChooser = function (evt) {

    if (evt.target.id === 'avatar' || evt.target.id === 'images') {
      var file = evt.target.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        if (evt.target.id === 'avatar') {
          reader.addEventListener('load', function () {
            adFormHeaderPreview.src = reader.result;
          });
          reader.readAsDataURL(file);
        }
        if (evt.target.id === 'images') {
          reader.addEventListener('load', function () {
            var img = document.createElement('img');
            img.src = reader.result;
            img.style.width = '70px';
            img.style.height = '70px';
            adFormPhoto.append(img);
          });
          reader.readAsDataURL(file);
        }
      }
    }
  };

  var capacityDefaultSetter = function () {
    var optionsArr = ['для 1 гостя', 'для 2 гостей', 'для 3 гостей', 'не для гостей'];
    var capacity = document.querySelector('#capacity');
    var select = document.createElement('select');
    select.name = 'capacity';
    select.id = 'capacity';
    var opt;
    for (var i = 0; i < optionsArr.length; i++) {
      opt = new Option();
      if (optionsArr[i].indexOf('1') !== -1) {
        opt.setAttribute('selected', 'true');
      }
      opt.value = i + DELTA_SHIFT;
      opt.text = optionsArr[i];
      select.add(opt);
      if (optionsArr[i].indexOf('не для гостей') !== -1) {
        opt.value = 0;
        opt.text = optionsArr[i];
        select.add(opt);
      }
    }
    capacity.replaceWith(select);
  };

  var pricePlaceholderDefaultSetter = function () {
    price.placeholder = 1000;
  };

  var priceValueReset = function () {
    price.value = '';
  };

  type.addEventListener('change', priceValueReset);

  adForm.addEventListener('change', fileChooser);

  var titleInputHandler = function () {
    window.formValidation.titleVerify(title);
  };

  var priceInputHandler = function () {
    window.formValidation.priceVerify(price);
  };

  var typeClickHandler = function () {
    window.formValidation.typeCorrelator(type);
  };

  var timeinChangeHandler = function () {
    window.formValidation.adFormElementTimeSynchronizer(timein);
  };

  var timeoutChangeHandler = function () {
    window.formValidation.adFormElementTimeSynchronizer(timeout);
  };

  var roomNumberClickListener = function () {
    window.formValidation.roomsCapacitySynchronizer(roomNumber);
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

  var formValidityChecker = function () {
    titleInputHandler();
    priceInputHandler();
    typeClickHandler();
    timeinChangeHandler();
    timeoutChangeHandler();
  };

  var onSuccessMsg = function () {
    var main = document.querySelector('main');
    main.append(successMsg);
    document.body.addEventListener('keydown', successMsgKeyDownRemoveHandler);
    document.body.addEventListener('click', bodyOnSuccessMsgClickRemoveHandler);
    mapPinMain.focus();
  };

  var bodyRemoveListener = function () {
    document.body.removeEventListener('keydown', successMsgKeyDownRemoveHandler);
    document.body.removeEventListener('click', bodyOnSuccessMsgClickRemoveHandler);
  };

  var bodyOnSuccessMsgClickRemoveHandler = function () {
    var success = document.querySelector('.success');
    if (success) {
      success.remove();
      bodyRemoveListener();
    }
  };

  var successMsgKeyDownRemoveHandler = function (evt) {
    var success = document.querySelector('.success');
    if (evt.code === 'Escape') {
      if (success) {
        success.remove();
        bodyRemoveListener();
      }
    }
  };

  var adFormHeaderPreviewClear = function () {
    adFormHeaderPreview.src = 'img/muffin-grey.svg';
  };

  var adFormPhotoRemover = function () {
    var imgs = adFormPhoto.querySelectorAll('img');
    var arr = Array.from(imgs);
    if (arr.length) {
      arr.forEach(function (item) {
        item.remove();
      });
    }
  };

  var formSubmit = function (evt) {
    evt.preventDefault();
    formAddress.value = formAddress.placeholder;
    formAddress.removeAttribute('disabled');
    formValidityChecker();
    if (adForm.checkValidity()) {
      var form = new FormData(adForm);
      window.upload(form, function () {
        adForm.reset();
        mapFiltersForm.reset();
        window.filter.defaultFilterObjectSetter();
        window.form.formElementsEnabler(allFormsElemsArr);
        window.map.pinsRemover();
        window.map.mapDeactivator();
        formDeactivator();
        adFormHeaderPreviewClear();
        adFormPhotoRemover();
        window.mainPin.mapPinMainSetCenter();
        mapPinMain.addEventListener('click', window.mainPin.mapPinMainAddHandlers, {once: true});
        mapPinMain.addEventListener('keydown', window.mainPin.mapPinMainAddHandlers, {once: true});
        onSuccessMsg();
        pricePlaceholderDefaultSetter();
        capacityDefaultSetter();
      });
    }
  };

  var formResetHandler = function () {
    adForm.reset();
    mapFiltersForm.reset();
    window.filter.defaultFilterObjectSetter();
    window.form.formElementsEnabler(allFormsElemsArr);
    window.map.pinsRemover();
    window.map.mapDeactivator();
    window.form.domCardRemover();
    formDeactivator();
    adFormHeaderPreviewClear();
    adFormPhotoRemover();
    window.mainPin.mapPinMainSetCenter();
    window.main.windowOnloadHandler();
    mapPinMain.focus();
    pricePlaceholderDefaultSetter();
    capacityDefaultSetter();
  };

  var inputTypeFileAcceptSetter = function () {
    var inputTypeFile = document.querySelectorAll('input[type="file"]');

    inputTypeFile.forEach(function (item) {
      item.setAttribute('accept', 'image/x-png,image/gif,image/jpeg');
    });
  };

  return {
    formElementsEnabler: function (elements) {
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
      type.addEventListener('click', typeClickHandler);
      timein.addEventListener('change', timeinChangeHandler);
      timeout.addEventListener('change', timeoutChangeHandler);
      roomNumber.addEventListener('click', roomNumberClickListener);
      mapPins.addEventListener('click', mapPinsClickHandler);
      mapPins.addEventListener('keydown', mapPinsKeydownHandler);
      adForm.addEventListener('submit', formSubmit);
      adForm.addEventListener('reset', formResetHandler);
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
    pricePlaceholderDefaultSetter: pricePlaceholderDefaultSetter,
    data: data,
  };
})();
