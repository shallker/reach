var eventy = require('eventy');

var reach = (function () {
  listenScroll(onScroll);

  return eventy({});
})();

function listenScroll(callback) {
  window.addEventListener('scroll', callback);
}

function onScroll(scroll) {
  var scrollTop = window.innerHeight + window.scrollY;
  var documentHeight = getDocumentHeight();
  var middle = (documentHeight - window.innerHeight) / 2;

  if (window.scrollY === 0) {
    return reach.trigger('top');
  }

  if (middle - 20 < scrollY && scrollY < middle + 20) {
    return reach.trigger('middle');
  }

  if (scrollTop >= documentHeight) {
    return reach.trigger('bottom');
  }
}

function getDocumentHeight() {
  return Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
}

reach.top = function (callback) {
  this.on('top', callback);
}

reach.middle = function (callback) {
  this.on('middle', callback);
}

reach.bottom = function (callback) {
  this.on('bottom', callback);
}

module.exports = reach;
