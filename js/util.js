'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomValue = function (arr) {
    return arr[getRandomNumber(0, arr.length - 1)];
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomValue: getRandomValue
  };
})();

/*
'use strict';

(function () {})();*/
