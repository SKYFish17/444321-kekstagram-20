'use strict';

(function () {
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

  var buildBasicData = function (index) {
    pictures[index] = {};
    pictures[index].url = 'photos/' + (index + 1) + '.jpg';
    pictures[index].description = window.util.getRandomValue(picturesDescriptions);
    pictures[index].likes = window.util.getRandomNumber(window.constants.MIN_LIKES_VALUE, window.constants.MAX_LIKES_VALUE);
  };

  var buildCommentsData = function (index) {
    pictures[index].comments = [];

    for (var j = 0; j < window.util.getRandomNumber(window.constants.MIN_COMMENTS_NUMBER, window.constants.MAX_COMMENTS_NUMBER); j++) {
      pictures[index].comments[j] = {};
      pictures[index].comments[j].avatar = 'img/avatar-' + window.util.getRandomNumber(window.constants.MIN_AVATAR_NUMBER, window.constants.MAX_AVATAR_NUMBER) + '.svg';
      pictures[index].comments[j].message = window.util.getRandomValue(messages);
      pictures[index].comments[j].name = window.util.getRandomValue(names);
    }
  };

  var getPicturesData = function () {
    for (var i = 0; i < window.constants.NUMBER_OF_POSTS; i++) {
      buildBasicData(i);
      buildCommentsData(i);
    }
    return pictures;
  };

  window.data = {
    getPicturesData: getPicturesData
  };
})();
