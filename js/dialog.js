'use strict';

(function () {
  var body = document.querySelector('body');

  var openModal = function () {
    body.classList.add('modal-open');
  };

  var closeModal = function () {
    body.classList.remove('modal-open');
  };

  window.dialog = {
    openModal: openModal,
    closeModal: closeModal
  };
})();
