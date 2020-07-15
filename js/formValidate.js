'use strict';

(function () {
  var imgUploadContainer = document.querySelector('.img-upload');
  var imgUploadForm = imgUploadContainer.querySelector('.img-upload__form');
  var hashtagsInput = imgUploadContainer.querySelector('.text__hashtags');

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

      if (hashtags[i].charAt(0) !== '#' && hashtags[i].charAt(0) !== '') {
        hashtagsInput.setCustomValidity('Тег должен начинаться со знака "#"');
      } else if (hashtags[i] === '#') {
        hashtagsInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
      } else if (!re.test(hashtags[i]) && hashtags[i].charAt(0) !== '') {
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

  window.formValidate = {
    validateTags: validateTags
  };
})();
