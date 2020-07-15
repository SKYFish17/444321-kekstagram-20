'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');
  var commentsList = bigPicture.querySelector('.social__comments');

  var openBigPicture = function (imgSrc) {
    window.dialog.openModal();
    commentsList.innerHTML = '';
    bigPicture.classList.remove('hidden');

    for (var i = 0; i < window.constants.NUMBER_OF_POSTS; i++) {
      if (imgSrc === window.picture.usersPosts[i].url) {
        window.preview.render(window.picture.usersPosts[i]);
      }
    }
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    window.dialog.closeModal();
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  picturesContainer.addEventListener('click', function (evt) {
    //  доработать условие на проверку тега img
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
      evt.preventDefault();
      closeBigPicture();
    }
  };
})();
