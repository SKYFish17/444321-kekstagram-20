'use strict';

(function () {
  var imgUploadContainer = document.querySelector('.img-upload');

  var imgUploadInput = imgUploadContainer.querySelector('.img-upload__input');
  var imgUploadOverlay = imgUploadContainer.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUploadContainer.querySelector('.img-upload__cancel');

  var hashtagsInput = imgUploadContainer.querySelector('.text__hashtags');
  var commentInput = imgUploadContainer.querySelector('.text__description');

  var effectsList = imgUploadOverlay.querySelector('.effects__list');
  var effectsPreviewNone = effectsList.querySelector('#effect-none');
  var effectSlider = imgUploadOverlay.querySelector('.effect-level');
  var effectLevelContainer = imgUploadOverlay.querySelector('.effect-level');
  var effectLevelPin = effectLevelContainer.querySelector('.effect-level__pin');

  var scaleContainer = imgUploadContainer.querySelector('.scale');
  var scaleSmaller = scaleContainer.querySelector('.scale__control--smaller');
  var scaleBigger = scaleContainer.querySelector('.scale__control--bigger');

  var openUploadOverlay = function () {
    window.dialog.openModal();
    imgUploadOverlay.classList.remove('hidden');

    hashtagsInput.addEventListener('input', window.formValidate.validateTags);

    document.addEventListener('keydown', onUploadOverlayEscPress);

    scaleBigger.addEventListener('click', window.formScale.onScaleBiggerClick);
    scaleBigger.addEventListener('keydown', window.formScale.onScaleBiggerPressEnter);

    scaleSmaller.addEventListener('click', window.formScale.onScaleSmallerClick);
    scaleSmaller.addEventListener('keydown', window.formScale.onScaleSmallerPressEnter);
    effectsList.addEventListener('change', window.formEffects.onEffectsItemClick, true);

    effectLevelPin.addEventListener('mouseup', window.formEffects.onEffectLevelPinMouseup);

    if (effectsPreviewNone.checked) {
      effectSlider.classList.add('hidden');
    }
  };

  var closeUploadOverlay = function () {
    window.dialog.closeModal();
    imgUploadOverlay.classList.add('hidden');
    imgUploadInput.value = '';

    hashtagsInput.removeEventListener('input', window.formValidate.validateTags);

    document.removeEventListener('keydown', onUploadOverlayEscPress);

    scaleBigger.removeEventListener('click', window.formScale.onScaleBiggerClick);
    scaleBigger.removeEventListener('keydown', window.formScale.onScaleBiggerPressEnter);

    scaleSmaller.removeEventListener('click', window.formScale.onScaleSmallerClick);
    scaleSmaller.removeEventListener('keydown', window.formScale.onScaleSmallerPressEnter);
    window.formScale.resetScaleValue();
    effectsList.removeEventListener('change', window.formEffects.onEffectsItemClick, true);

    effectLevelPin.removeEventListener('mouseup', window.formEffects.onEffectLevelPinMouseup);
  };

  var onUploadOverlayEscPress = function (evt) {
    if (evt.code === 'Escape' && evt.target !== hashtagsInput && evt.target !== commentInput) {
      evt.preventDefault();
      closeUploadOverlay();
    }
  };

  imgUploadCancel.addEventListener('click', function () {
    closeUploadOverlay();
  });

  window.dialogForm = {
    openUploadOverlay: openUploadOverlay
  };
})();
