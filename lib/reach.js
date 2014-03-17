var eventy = require('eventy');

var reach = (function () {
  listenScroll(onScroll);

  return eventy({});
})();

function listenScroll(callback) {
  window.addEventListener('scroll', callback);
}

function onScroll(scroll) {
  var scrollX = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
  var scrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  var scrollTop = getScrollTop();
  var documentHeight = getDocumentHeight();
  var middle = (documentHeight - window.innerHeight) / 2;

  if (scrollTop === 0) {
    return reach.trigger('top');
  }

  if (middle - 20 < scrollTop && scrollTop < middle + 20) {
    return reach.trigger('middle');
  }

  if (scrollTop + innerHeight + 20 >= documentHeight) {
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

function getScrollTop(){
  if (typeof pageYOffset!= 'undefined'){
    //most browsers except IE before #9
    return pageYOffset;
  } else {
    var B = document.body; //IE 'quirks'
    var D = document.documentElement; //IE with doctype

    D = (D.clientHeight)? D: B;

    return D.scrollTop;
  }
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
