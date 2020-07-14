'use strict';

var picturesContainer = document.querySelector('.pictures');

var buildUserPost = function (pictureData) {
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var newPost = template.cloneNode(true);
  var newPostImg = newPost.querySelector('.picture__img');
  var newPostLikes = newPost.querySelector('.picture__likes');
  var newPostComments = newPost.querySelector('.picture__comments');

  newPostImg.src = pictureData.url;
  newPostLikes.textContent = pictureData.likes;
  newPostComments.textContent = pictureData.comments.length;

  return newPost;
};

var renderUserPosts = function (picturesData) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < picturesData.length; i++) {
    fragment.appendChild(buildUserPost(picturesData[i]));
  }

  picturesContainer.appendChild(fragment);
};

var usersPosts = window.data.getPicturesData();

renderUserPosts(usersPosts);

var getHtmlElement = function (tag, className) {
  var htmlElement = document.createElement(tag);
  htmlElement.classList.add(className);

  return htmlElement;
};

var buildComment = function (userComment) {
  var newComment = getHtmlElement('li', 'social__comment');

  var newCommentAvatar = getHtmlElement('img', 'social__picture');
  newCommentAvatar.src = userComment.avatar;
  newCommentAvatar.alt = userComment.name;
  newCommentAvatar.width = window.constants.COMMENT_AVATAR_WIDTH;
  newCommentAvatar.height = window.constants.COMMENT_AVATAR_HEIGHT;

  newComment.appendChild(newCommentAvatar);

  var newCommentText = getHtmlElement('p', 'social__text');
  newCommentText.textContent = userComment.message;

  newComment.appendChild(newCommentText);

  return newComment;
};

// режим big picture для всех изображений
var bigPicture = document.querySelector('.big-picture');
var bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');
var bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
var likesCount = bigPicture.querySelector('.likes-count');
var bigPictureDescription = bigPicture.querySelector('.social__caption');
var commentsCount = bigPicture.querySelector('.social__comment-count');
var commentsLoader = bigPicture.querySelector('.comments-loader');
var commentsList = bigPicture.querySelector('.social__comments');
var body = document.querySelector('body');

var openModal = function () {
  body.classList.add('modal-open');
};

var closeModal = function () {
  body.classList.remove('modal-open');
};

var renderUserComments = function (userPost) {
  for (var i = 0; i < userPost.comments.length; i++) {
    commentsList.appendChild(buildComment(userPost.comments[i]));
  }
};

var renderBigPicture = function (userPost) {
  commentsList.innerHTML = '';
  bigPicture.classList.remove('hidden');

  bigPictureImg.src = userPost.url;
  bigPictureDescription.textContent = userPost.description;
  likesCount.textContent = userPost.likes;
  commentsCount.textContent = userPost.comments.length;

  renderUserComments(userPost);

  document.addEventListener('keydown', onBigPictureEscPress);
};

var openBigPicture = function (imgSrc) {
  openModal();

  for (var i = 0; i < window.constants.NUMBER_OF_POSTS; i++) {
    if (imgSrc === usersPosts[i].url) {
      renderBigPicture(usersPosts[i]);
    }
  }
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  closeModal();
  document.removeEventListener('keydown', onBigPictureEscPress);
};

picturesContainer.addEventListener('click', function (evt) {
  if (evt.target.attributes.src !== undefined) {
    openBigPicture(evt.target.attributes.src.value);
  }
}, true);


picturesContainer.addEventListener('keydown', function (evt) {
  var pictureAtLink = evt.target.querySelector('.picture__img');

  if (evt.code === 'Enter') {
    openBigPicture(pictureAtLink.attributes.src.value);
  }
}, true);

bigPictureCloseBtn.addEventListener('click', function () {
  closeBigPicture();
});

bigPictureCloseBtn.addEventListener('keydown', function (evt) {
  if (evt.code === 'Enter') {
    closeBigPicture();
  }
});

var onBigPictureEscPress = function (evt) {
  if (evt.code === 'Escape') {
    closeBigPicture();
  }
};

commentsLoader.classList.add('hidden');
commentsCount.classList.add('hidden');

// загрузка изображения и показ формы редактирования
var imgUploadContainer = document.querySelector('.img-upload');
var imgUploadForm = imgUploadContainer.querySelector('.img-upload__form');
var imgUploadInput = imgUploadContainer.querySelector('.img-upload__input');
var imgUploadOverlay = imgUploadContainer.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUploadContainer.querySelector('.img-upload__cancel');
var hashtagsInput = imgUploadContainer.querySelector('.text__hashtags');
var commentInput = imgUploadContainer.querySelector('.text__description');

var openUploadOverlay = function () {
  openModal();
  imgUploadOverlay.classList.remove('hidden');

  hashtagsInput.addEventListener('input', validateTags);

  document.addEventListener('keydown', onUploadOverlayEscPress);

  scaleBigger.addEventListener('click', onScaleBiggerClick);
  scaleBigger.addEventListener('keydown', onScaleBiggerPressEnter);

  scaleSmaller.addEventListener('click', onScaleSmallerClick);
  scaleSmaller.addEventListener('keydown', onScaleSmallerPressEnter);
  effectsList.addEventListener('change', onEffectsItemClick, true);

  effectLevelPin.addEventListener('mouseup', onEffectLevelPinMouseup);

  if (effectsPreviewNone.checked) {
    effectSlider.classList.add('hidden');
  }
};

var closeUploadOverlay = function () {
  closeModal();
  imgUploadOverlay.classList.add('hidden');
  imgUploadInput.value = '';

  hashtagsInput.removeEventListener('input', validateTags);

  document.removeEventListener('keydown', onUploadOverlayEscPress);

  scaleBigger.removeEventListener('click', onScaleBiggerClick);
  scaleBigger.removeEventListener('keydown', onScaleBiggerPressEnter);

  scaleSmaller.removeEventListener('click', onScaleSmallerClick);
  scaleSmaller.removeEventListener('keydown', onScaleSmallerPressEnter);
  effectsList.removeEventListener('change', onEffectsItemClick, true);

  effectLevelPin.removeEventListener('mouseup', onEffectLevelPinMouseup);
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

//  масштабирование изображения
var scaleContainer = imgUploadContainer.querySelector('.scale');
var scaleSmaller = scaleContainer.querySelector('.scale__control--smaller');
var scaleBigger = scaleContainer.querySelector('.scale__control--bigger');
var scaleInput = scaleContainer.querySelector('.scale__control--value');
var imgUploadPreviewContainer = imgUploadOverlay.querySelector('.img-upload__preview');
var imgUploadPreview = imgUploadPreviewContainer.querySelector('img');

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

//  Наложение эффекта на изображение
var effectsList = imgUploadOverlay.querySelector('.effects__list');
var effectSlider = imgUploadOverlay.querySelector('.effect-level');
var effectsPreviewNone = effectsList.querySelector('#effect-none');
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
  changeEffectLevel(window.constants.MAX_PIN_POSITION);
};

// фильтры
var effectLevelContainer = imgUploadOverlay.querySelector('.effect-level');
var effectLevelPin = effectLevelContainer.querySelector('.effect-level__pin');
var effectLevelDepth = effectLevelContainer.querySelector('.effect-level__depth');
var effectLevelValue = effectLevelContainer.querySelector('.effect-level__value');

var testPinPosition = 150;//  убрать после полной реализации обработки соб. слайдера

var getFilter = function (effectType, effectMinLevel, effectMaxLevel, unit, pinPosition) {
  var effectLevel;
  var filter;
  var effectLevelDifference = effectMaxLevel - effectMinLevel;

  effectLevel = effectMinLevel + pinPosition / window.constants.MAX_PIN_POSITION * effectLevelDifference;

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
  effectLevelPin.style.left = getRatio(pinPosition, window.constants.MAX_PIN_POSITION, '%');
  effectLevelDepth.style.width = getRatio(pinPosition, window.constants.MAX_PIN_POSITION, '%');
  effectLevelValue.value = getRatio(pinPosition, window.constants.MAX_PIN_POSITION);
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

var onEffectLevelPinMouseup = function () {
  changeEffectLevel(testPinPosition);
};

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
