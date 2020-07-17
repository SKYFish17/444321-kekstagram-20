'use strict';

(function () {
  var imgUploadContainer = document.querySelector('.img-upload');
  var imgUploadOverlay = imgUploadContainer.querySelector('.img-upload__overlay');
  var imgUploadPreviewContainer = imgUploadOverlay.querySelector('.img-upload__preview');
  var imgUploadPreview = imgUploadPreviewContainer.querySelector('img');
  var effectSlider = imgUploadOverlay.querySelector('.effect-level');
  var effectLevelContainer = imgUploadOverlay.querySelector('.effect-level');
  var effectLevelPin = effectLevelContainer.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevelContainer.querySelector('.effect-level__depth');
  var effectLevelValue = effectLevelContainer.querySelector('.effect-level__value');

  var previousEffectName = '';

  var onEffectsItemClick = function (evt) {
    var effectLabel = evt.target.nextElementSibling.querySelector('.effects__preview');
    var effectName = effectLabel.classList[1];

    if (previousEffectName) {
      imgUploadPreview.classList.remove(previousEffectName);
    }

    if (effectName === 'effects__preview--none') {
      effectSlider.classList.add('hidden');
    } else {
      effectSlider.classList.remove('hidden');
    }

    previousEffectName = effectName;
    imgUploadPreview.classList.add(effectName);
    changeEffectLevel(window.constants.END_PIN_POSITION);
  };

  var resetEffects = function () {
    imgUploadPreview.classList = '';
    imgUploadPreview.style.filter = '';
  };

  var getFilter = function (effectType, effectMinLevel, effectMaxLevel, unit, pinPosition) {
    var effectLevel;
    var filter;
    var effectLevelDifference = effectMaxLevel - effectMinLevel;

    effectLevel = effectMinLevel + pinPosition / window.constants.END_PIN_POSITION * effectLevelDifference;

    if (unit !== 'none') {
      filter = effectType + '(' + effectLevel + unit + ')';
    } else {
      filter = effectType + '(' + effectLevel + ')';
    }

    return filter;
  };

  var getRatio = function (numberOne, numberTwo, sign) {
    var ratio;

    if (sign) {
      ratio = numberOne / numberTwo * window.constants.MAX_PERCENT + sign;
    } else {
      ratio = numberOne / numberTwo * window.constants.MAX_PERCENT;
    }

    return ratio;
  };

  var renderActualEffectLevel = function (pinPosition) {
    effectLevelPin.style.left = getRatio(pinPosition, window.constants.END_PIN_POSITION, '%');
    effectLevelDepth.style.width = getRatio(pinPosition, window.constants.END_PIN_POSITION, '%');
    effectLevelValue.value = getRatio(pinPosition, window.constants.END_PIN_POSITION);
  };

  var changeEffectLevel = function (pinPosition) {

    switch (imgUploadPreview.className) {
      case 'effects__preview--none':
        imgUploadPreview.style.filter = '';
        break;
      case 'effects__preview--chrome':
        imgUploadPreview.style.filter = getFilter('grayscale', 0, 1, 'none', pinPosition);
        break;
      case 'effects__preview--sepia':
        imgUploadPreview.style.filter = getFilter('sepia', 0, 1, 'none', pinPosition);
        break;
      case 'effects__preview--marvin':
        imgUploadPreview.style.filter = getFilter('invert', 0, 100, '%', pinPosition);
        break;
      case 'effects__preview--phobos':
        imgUploadPreview.style.filter = getFilter('blur', 0, 3, 'px', pinPosition);
        break;
      case 'effects__preview--heat':
        imgUploadPreview.style.filter = getFilter('brightness', 1, 3, 'none', pinPosition);
        break;
    }
    renderActualEffectLevel(pinPosition);
  };

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
    };

    var onEffectLevelPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      var pinPosition = effectLevelPin.offsetLeft - shift.x;

      if (pinPosition >= window.constants.START_PIN_POSITION && pinPosition <= window.constants.END_PIN_POSITION) {
        changeEffectLevel(pinPosition);
      }
    };

    var onEffectLevelPinMouseUp = function (upEvt) {
      upEvt.preventDefault();

      effectLevelPin.removeEventListener('mousemove', onEffectLevelPinMouseMove);
      effectLevelPin.removeEventListener('mouseup', onEffectLevelPinMouseUp);
    };

    effectLevelPin.addEventListener('mousemove', onEffectLevelPinMouseMove);
    effectLevelPin.addEventListener('mouseup', onEffectLevelPinMouseUp);
  });

  window.formEffects = {
    onEffectsItemClick: onEffectsItemClick,
    resetEffects: resetEffects
  };
})();
