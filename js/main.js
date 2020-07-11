'use strict';

var NUMBER_OF_POSTS = 25;
var MIN_LIKES_VALUE = 15;
var MAX_LIKES_VALUE = 200;
var MIN_AVATAR_NUMBER = 1;
var MAX_AVATAR_NUMBER = 6;
var MIN_COMMENTS_NUMBER = 1;
var MAX_COMMENTS_NUMBER = 10;
var COMMENT_AVATAR_WIDTH = 35;
var COMMENT_AVATAR_HEIGHT = 35;
var SCALE_STEP = 25;
var MIN_SCALE = 25;
var MAX_SCALE = 100;
var MAX_PERCENT = 100;
var MAX_PIN_POSITION = 495;
var HASHTAG_MAX_LENGTH = 20;
var MAX_NUM_OF_TAGS = 5;
var pictures = [];

var picturesDescriptions = [
  'Моё любимое фото',
  'Отличное фото, что скажете?',
  'Неплохо, правда?',
  'Снимал на Nokia 3310. Он не только гвозди забивать может!',
  'Было скучно...А что вы делаете когда вам скучно?',
  'Британские учёные раскрыли что...читать далее',
  'Лайк, подписка, всё по списку...и я дальше буду радовать вас новыми фото каждую минуту)',
  'Это описание сделано генератором случайных генераторов случайных генераторов...'
];

var messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var names = [
  'Женя',
  'Мария',
  'Ксюша',
  'Олег',
  'Екатерина',
  'Ярослав',
  'Андрей',
  'Вика'
];

var picturesContainer = document.querySelector('.pictures');

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomValue = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};

var buildBasicData = function (index) {
  pictures[index] = {};
  pictures[index].url = 'photos/' + (index + 1) + '.jpg';
  pictures[index].description = getRandomValue(picturesDescriptions);
  pictures[index].likes = getRandomNumber(MIN_LIKES_VALUE, MAX_LIKES_VALUE);
};

var buildCommentsData = function (index) {
  pictures[index].comments = [];

  for (var j = 0; j < getRandomNumber(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER); j++) {
    pictures[index].comments[j] = {};
    pictures[index].comments[j].avatar = 'img/avatar-' + getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg';
    pictures[index].comments[j].message = getRandomValue(messages);
    pictures[index].comments[j].name = getRandomValue(names);
  }
};

var getPicturesData = function () {
  for (var i = 0; i < NUMBER_OF_POSTS; i++) {
    buildBasicData(i);
    buildCommentsData(i);
  }

  return pictures;
};

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

var usersPosts = getPicturesData();

renderUserPosts(usersPosts);

var getHtmlElement = function (tag, className) {
  var htmlElement = document.createElement(tag);
  htmlElement.classList.add(className);

  return htmlElement;
};

var getComment = function (userComment) {
  var newComment = getHtmlElement('li', 'social__comment');

  var newCommentAvatar = getHtmlElement('img', 'social__picture');
  newCommentAvatar.src = userComment.avatar;
  newCommentAvatar.alt = userComment.name;
  newCommentAvatar.width = COMMENT_AVATAR_WIDTH;
  newCommentAvatar.height = COMMENT_AVATAR_HEIGHT;

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

var addUserComments = function (userPost) {
  for (var i = 0; i < userPost.comments.length; i++) {
    commentsList.appendChild(getComment(userPost.comments[i]));
  }
};

var renderBigPicture = function (userPost) {
  commentsList.innerHTML = '';
  bigPicture.classList.remove('hidden');

  bigPictureImg.src = userPost.url;
  bigPictureDescription.textContent = userPost.description;
  likesCount.textContent = userPost.likes;
  commentsCount.textContent = userPost.comments.length;

  addUserComments(userPost);

  document.addEventListener('keydown', onBigPictureEscPress);
};

var openBigPicture = function (imgSrc) {
  openModal();

  for (var i = 0; i < NUMBER_OF_POSTS; i++) {
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
  if (evt.target.tagName === 'IMG') {
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
var isHashtagFieldInFocus = false;
var isCommentFieldInFocus = false;

var onFieldFocus = function (field) {
  return function () {
    if (field === 'hashtags') {
      isHashtagFieldInFocus = true;
    } else if (field === 'comment') {
      isCommentFieldInFocus = true;
    }
  };
};

var onFieldBlur = function (field) {
  return function () {
    if (field === 'hashtags') {
      isHashtagFieldInFocus = false;
    } else if (field === 'comment') {
      isCommentFieldInFocus = false;
    }
  };
};

var setFieldFocusHandler = function (field) {
  if (field === 'hashtags') {
    hashtagsInput.addEventListener('focus', onFieldFocus('hashtags'));
    hashtagsInput.addEventListener('blur', onFieldBlur('hashtags'));
  } else if (field === 'comment') {
    commentInput.addEventListener('focus', onFieldFocus('comment'));
    commentInput.addEventListener('blur', onFieldBlur('comment'));
  }
};

var unsetFieldFocusHandler = function (field) {
  if (field === 'hashtags') {
    hashtagsInput.removeEventListener('focus', onFieldFocus('hashtags'));
    hashtagsInput.removeEventListener('blur', onFieldBlur('hashtags'));
  } else if (field === 'comment') {
    commentInput.removeEventListener('focus', onFieldFocus('comment'));
    commentInput.removeEventListener('blur', onFieldBlur('comment'));
  }
};

var openUploadOverlay = function () {
  openModal();
  imgUploadOverlay.classList.remove('hidden');

  setFieldFocusHandler('hashtags');
  setFieldFocusHandler('comment');

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

  unsetFieldFocusHandler('hashtags');
  unsetFieldFocusHandler('comment');

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
  if (evt.code === 'Escape' && isHashtagFieldInFocus === false && isCommentFieldInFocus === false) {
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
      scaleInput.value = parseInt(scaleValue[0], 10) + SCALE_STEP + '%';
      imgUploadPreviewContainer.style.transform = 'scale' + '(' + (parseInt(scaleValue[0], 10) + SCALE_STEP) / 100 + ')';
      break;
    case '-':
      scaleInput.value = parseInt(scaleValue[0], 10) - SCALE_STEP + '%';
      imgUploadPreviewContainer.style.transform = 'scale' + '(' + (parseInt(scaleValue[0], 10) - SCALE_STEP) / 100 + ')';
      break;
  }
};

var onScaleBiggerClick = function () {
  if (scaleInput.value !== (MAX_SCALE + '%')) {
    changeScaleValue('+');
  }
};

var onScaleBiggerPressEnter = function (evt) {
  if (evt.code === 'Enter') {
    if (scaleInput.value !== (MAX_SCALE + '%')) {
      changeScaleValue('+');
    }
  }
};

var onScaleSmallerClick = function () {
  if (scaleInput.value !== (MIN_SCALE + '%')) {
    changeScaleValue('-');
  }
};

var onScaleSmallerPressEnter = function (evt) {
  if (evt.code === 'Enter') {
    if (scaleInput.value !== (MIN_SCALE + '%')) {
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
  changeEffectLevel(MAX_PIN_POSITION);
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

  effectLevel = effectMinLevel + pinPosition / MAX_PIN_POSITION * effectLevelDifference;

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
    ratio = numberOne / numberTwo * MAX_PERCENT + sign;
  } else {
    ratio = numberOne / numberTwo * MAX_PERCENT;
  }

  return ratio;
};

var renderActualEffectLevel = function (pinPosition) {
  effectLevelPin.style.left = getRatio(pinPosition, MAX_PIN_POSITION, '%');
  effectLevelDepth.style.width = getRatio(pinPosition, MAX_PIN_POSITION, '%');
  effectLevelValue.value = getRatio(pinPosition, MAX_PIN_POSITION);
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
var hashtagsInput = imgUploadContainer.querySelector('.text__hashtags');
var commentInput = imgUploadContainer.querySelector('.text__description');

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
    } else if (hashtagLength > HASHTAG_MAX_LENGTH) {
      hashtagsInput.setCustomValidity('Максимальная длина хэштега - 20 символов, удалите ' + (hashtagLength - HASHTAG_MAX_LENGTH) + ' симв.');
    } else if (checksDuplicateTags(hashtags)) {
      hashtagsInput.setCustomValidity('Хеш-теги не должны повторяться. #ХэшТег и #хэштег считаются одним и тем же тегом');
    } else if (hashtags.length > MAX_NUM_OF_TAGS) {
      hashtagsInput.setCustomValidity('Возможно ввести лишь 5 тегов');
    } else {
      hashtagsInput.setCustomValidity('');
    }
  }
  imgUploadForm.reportValidity();
};
