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

var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
var likesCount = bigPicture.querySelector('.likes-count');
var bigPictureDescription = bigPicture.querySelector('.social__caption');
var commentsCount = bigPicture.querySelector('.social__comment-count');
var commentsLoader = bigPicture.querySelector('.comments-loader');
var commentsList = bigPicture.querySelector('.social__comments');
var body = document.querySelector('body');

var renderBigPicture = function () {
  bigPicture.classList.remove('hidden');

  bigPictureImg.src = usersPosts[0].url;
  bigPictureDescription.textContent = usersPosts[0].description;
  likesCount.textContent = usersPosts[0].likes;
  commentsCount.textContent = usersPosts[0].comments.length;

  for (var i = 0; i < usersPosts[0].comments.length; i++) {
    commentsList.appendChild(getComment(usersPosts[0].comments[i]));
  }
};

commentsLoader.classList.add('hidden');
commentsCount.classList.add('hidden');

renderBigPicture();
body.classList.add('modal-open');
