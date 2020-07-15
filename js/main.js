'use strict';

// загрузка изображения и показ формы редактирования
var imgUploadContainer = document.querySelector('.img-upload');
var imgUploadForm = imgUploadContainer.querySelector('.img-upload__form');
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

  hashtagsInput.addEventListener('input', validateTags);

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

  hashtagsInput.removeEventListener('input', validateTags);

  document.removeEventListener('keydown', onUploadOverlayEscPress);

  scaleBigger.removeEventListener('click', window.formScale.onScaleBiggerClick);
  scaleBigger.removeEventListener('keydown', window.formScale.onScaleBiggerPressEnter);

  scaleSmaller.removeEventListener('click', window.formScale.onScaleSmallerClick);
  scaleSmaller.removeEventListener('keydown', window.formScale.onScaleSmallerPressEnter);
  effectsList.removeEventListener('change', window.formEffects.onEffectsItemClick, true);

  effectLevelPin.removeEventListener('mouseup', window.formEffects.onEffectLevelPinMouseup);
};

var onUploadOverlayEscPress = function (evt) {
  if (evt.code === 'Escape' && evt.target !== hashtagsInput && evt.target !== commentInput) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

imgUploadInput.addEventListener('change', function () {
  openUploadOverlay();
});

imgUploadCancel.addEventListener('click', function () {
  closeUploadOverlay();
});

//  хэштеги
var checksDuplicateTags = function (tags) {
  var areThereDuplicateTags = false;

  for (var i = 0; i < tags.length; i++) {
    tags[i] = tags[i].toLowerCase();
  }

  for (var j = 0; j < tags.length - 1; j++) {
    for (var k = j + 1; k < tags.length; k++) {
      if (tags[j] === tags[k]) {
        areThereDuplicateTags = true;
      }
    }
  }

  return areThereDuplicateTags;
};

var validateTags = function () {
  var hashtagsText = hashtagsInput.value;
  var hashtags = hashtagsText.split(' ');

  for (var i = 0; i < hashtags.length; i++) {
    var re = /^\#[а-яА-ЯёЁa-zA-Z0-9]+$/;
    var hashtagLength = hashtags[i].length;

    if (hashtags[i].charAt(0) !== '#') {
      hashtagsInput.setCustomValidity('Тег должен начинаться со знака "#"');
    } else if (hashtags[i] === '#') {
      hashtagsInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
    } else if (!re.test(hashtags[i])) {
      hashtagsInput.setCustomValidity('Текст после решётки должен состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');
    } else if (hashtagLength > window.constants.HASHTAG_MAX_LENGTH) {
      hashtagsInput.setCustomValidity('Максимальная длина хэштега - 20 символов, удалите ' + (hashtagLength - window.constants.HASHTAG_MAX_LENGTH) + ' симв.');
    } else if (checksDuplicateTags(hashtags)) {
      hashtagsInput.setCustomValidity('Хеш-теги не должны повторяться. #ХэшТег и #хэштег считаются одним и тем же тегом');
    } else if (hashtags.length > window.constants.MAX_NUM_OF_TAGS) {
      hashtagsInput.setCustomValidity('Возможно ввести лишь 5 тегов');
    } else {
      hashtagsInput.setCustomValidity('');
    }
  }
  imgUploadForm.reportValidity();
};
