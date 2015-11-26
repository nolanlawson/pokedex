document.addEventListener('DOMContentLoaded', () => {
  var $ = document.querySelector.bind(document);
  var sideDrawer = $('#sidedrawer');
  var scrollingList = require('./scrollingList');

  function showSidedrawer() {
    // show overlay
    var options = {
      static: true
    };

    var overlay = mui.overlay('on', options);

    // show element
    overlay.appendChild(sideDrawer);
    // wait for side menu to fade out
    setTimeout(() => sideDrawer.classList.add('active'), 200);

    overlay.addEventListener('click', hideSidedrawer);
  }

  function hideSidedrawer() {
    document.body.appendChild(sideDrawer);
    requestAnimationFrame(() => {
      sideDrawer.classList.remove('active');
      setTimeout(() => {
        document.body.classList.toggle('hide-sidedrawer');
        scrollingList.onViewportChange();
        
        if ($('#mui-overlay')) {
          mui.overlay('off');
        }
      }, 200);
    });
  }

  function shortHideSidedrawer() {
    document.body.classList.toggle('hide-sidedrawer');
  }

  $('.js-show-sidedrawer').addEventListener('click', showSidedrawer);
  $('.js-hide-sidedrawer').addEventListener('click', shortHideSidedrawer);

  $('#pokemon-link').addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    if ($('#mui-overlay')) {
      hideSidedrawer();
    }
  });
});