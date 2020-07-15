'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  var commentsCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var commentsList = bigPicture.querySelector('.social__comments');

  var buildComment = function (userComment) {
    var newComment = window.util.getHtmlElement('li', 'social__comment');

    var newCommentAvatar = window.util.getHtmlElement('img', 'social__picture');
    newCommentAvatar.src = userComment.avatar;
    newCommentAvatar.alt = userComment.name;
    newCommentAvatar.width = window.constants.COMMENT_AVATAR_WIDTH;
    newCommentAvatar.height = window.constants.COMMENT_AVATAR_HEIGHT;

    newComment.appendChild(newCommentAvatar);

    var newCommentText = window.util.getHtmlElement('p', 'social__text');
    newCommentText.textContent = userComment.message;

    newComment.appendChild(newCommentText);

    return newComment;
  };

  var renderUserComments = function (userPost) {
    for (var i = 0; i < userPost.comments.length; i++) {
      commentsList.appendChild(buildComment(userPost.comments[i]));
    }
  };

  var renderBigPicture = function (userPost) {
    bigPictureImg.src = userPost.url;
    bigPictureDescription.textContent = userPost.description;
    likesCount.textContent = userPost.likes;
    commentsCount.textContent = userPost.comments.length;

    renderUserComments(userPost);
  };

  commentsLoader.classList.add('hidden');
  commentsCount.classList.add('hidden');

  window.preview = {
    render: renderBigPicture
  };
})();
