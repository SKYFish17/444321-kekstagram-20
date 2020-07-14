'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');

  var usersPosts = window.data.getPicturesData();

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

  renderUserPosts(usersPosts);

  window.picture = {
    usersPosts: usersPosts
  };
})();
