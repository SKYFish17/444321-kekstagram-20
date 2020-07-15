'use strict';

(function () {
  var imgUploadContainer = document.querySelector('.img-upload');
  var imgUploadOverlay = imgUploadContainer.querySelector('.img-upload__overlay');
  var imgUploadPreviewContainer = imgUploadOverlay.querySelector('.img-upload__preview');
  var scaleContainer = imgUploadContainer.querySelector('.scale');
  var scaleInput = scaleContainer.querySelector('.scale__control--value');

  var changeScaleValue = function (sign) {
    var scaleValue = scaleInput.value.split('%');

    switch (sign) {
      case '+':
        scaleInput.value = parseInt(scaleValue[0], 10) + window.constants.SCALE_STEP + '%';
        imgUploadPreviewContainer.style.transform = 'scale' + '(' + (parseInt(scaleValue[0], 10) + window.constants.SCALE_STEP) / 100 + ')';
        break;
      case '-':
        scaleInput.value = parseInt(scaleValue[0], 10) - window.constants.SCALE_STEP + '%';
        imgUploadPreviewContainer.style.transform = 'scale' + '(' + (parseInt(scaleValue[0], 10) - window.constants.SCALE_STEP) / 100 + ')';
        break;
    }
  };

  var onScaleBiggerClick = function () {
    if (scaleInput.value !== (window.constants.MAX_SCALE + '%')) {
      changeScaleValue('+');
    }
  };

  var onScaleBiggerPressEnter = function (evt) {
    if (evt.code === 'Enter') {
      if (scaleInput.value !== (window.constants.MAX_SCALE + '%')) {
        changeScaleValue('+');
      }
    }
  };

  var onScaleSmallerClick = function () {
    if (scaleInput.value !== (window.constants.MIN_SCALE + '%')) {
      changeScaleValue('-');
    }
  };

  var onScaleSmallerPressEnter = function (evt) {
    if (evt.code === 'Enter') {
      if (scaleInput.value !== (window.constants.MIN_SCALE + '%')) {
        changeScaleValue('-');
      }
    }
  };

  window.formScale = {
    onScaleBiggerClick: onScaleBiggerClick,
    onScaleBiggerPressEnter: onScaleBiggerPressEnter,
    onScaleSmallerClick: onScaleSmallerClick,
    onScaleSmallerPressEnter: onScaleSmallerPressEnter
  };
})();
