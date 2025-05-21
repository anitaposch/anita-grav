(self["webpackChunkanitatheme"] = self["webpackChunkanitatheme"] || []).push([["/js/app-defer"],{

/***/ "./src/js/app-defer.js":
/*!*****************************!*\
  !*** ./src/js/app-defer.js ***!
  \*****************************/
/***/ (() => {

/*
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

const lightbox = new PhotoSwipeLightbox({
  gallery: '#gallery--getting-started',
  children: 'a',
  pswpModule: () => import('photoswipe')
});

lightbox.init();

const navbarSocial = document.getElementById('navbar-social');
console.log(navbarSocial)
window.onscroll = () => {
  if (window.scrollY > 500) {
    navbarSocial.style.display = 'none';

  }else{
    navbarSocial.style.display = 'block';
  }
};
*/

/** Flyout menu */
document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('button.flyout-button');
  buttons.forEach(function (button) {
    var flyoutMenu = button.nextElementSibling; // Assume the menu is the next sibling

    button.addEventListener('click', function (event) {
      // Stop event from bubbling up and closing the menu immediately
      event.stopPropagation();

      // Close all other dropdowns
      buttons.forEach(function (btn) {
        var otherMenu = btn.nextElementSibling;
        if (btn !== button) {
          btn.setAttribute('aria-expanded', 'false');
          otherMenu.classList.remove('opacity-100', 'translate-y-0');
          otherMenu.classList.add('opacity-0', 'translate-y-1');
        }
      });

      // Toggle the current dropdown
      var isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !isExpanded);
      if (!isExpanded) {
        flyoutMenu.classList.remove('opacity-0', 'translate-y-1');
        flyoutMenu.classList.add('opacity-100', 'translate-y-0');
      } else {
        flyoutMenu.classList.remove('opacity-100', 'translate-y-0');
        flyoutMenu.classList.add('opacity-0', 'translate-y-1');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function () {
    buttons.forEach(function (button) {
      var flyoutMenu = button.nextElementSibling;
      button.setAttribute('aria-expanded', 'false');
      flyoutMenu.classList.remove('opacity-100', 'translate-y-0');
      flyoutMenu.classList.add('opacity-0', 'translate-y-1');
    });
  });
});

/** Mobile menu */
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  var mobileMenuButton = document.getElementById('mobile-menu-button');
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
  var menuClosedIcon = document.getElementById('menu-closed-icon');
  var menuOpenIcon = document.getElementById('menu-open-icon');
  var mobileMenuClose = document.getElementById('mobile-menu-close');
  if (mobileMenuButton && mobileMenu) {
    var openMenu = function openMenu() {
      // First show elements
      mobileMenuBackdrop.classList.remove('hidden');
      mobileMenu.classList.remove('hidden');

      // Force browser to recalculate layout before adding transition classes
      // This is needed for the transition to work properly
      window.setTimeout(function () {
        mobileMenu.classList.remove('translate-x-full');
        document.body.classList.add('overflow-hidden');
        menuClosedIcon.classList.add('hidden');
        menuOpenIcon.classList.remove('hidden');
      }, 10);
    };
    var closeMenu = function closeMenu() {
      mobileMenu.classList.add('translate-x-full');
      document.body.classList.remove('overflow-hidden');
      menuClosedIcon.classList.remove('hidden');
      menuOpenIcon.classList.add('hidden');

      // Wait for transition to finish before hiding elements
      setTimeout(function () {
        mobileMenuBackdrop.classList.add('hidden');
        mobileMenu.classList.add('hidden');
      }, 300); // Match this to the duration in the CSS transition
    };
    mobileMenuButton.addEventListener('click', openMenu);
    mobileMenuClose.addEventListener('click', closeMenu);
    mobileMenuBackdrop.addEventListener('click', closeMenu);
  }
});

/** Search panel */
document.addEventListener('DOMContentLoaded', function () {
  var searchToggle = document.getElementById('search-toggle');
  var searchPanel = document.getElementById('search-panel');
  var searchBackdrop = document.getElementById('search-backdrop');
  var searchClose = document.getElementById('search-close');
  var searchInput = document.getElementById('search-input');
  if (searchToggle && searchPanel) {
    var openSearch = function openSearch() {
      // First show elements
      searchBackdrop.classList.remove('hidden');
      searchPanel.classList.remove('hidden');

      // Force browser to recalculate layout before adding transition classes
      window.setTimeout(function () {
        searchPanel.classList.remove('translate-x-full');
        document.body.classList.add('overflow-hidden');

        // Auto-focus the search input
        searchInput.focus();
      }, 10);
    };
    var closeSearch = function closeSearch() {
      searchPanel.classList.add('translate-x-full');
      document.body.classList.remove('overflow-hidden');

      // Wait for transition to finish before hiding elements
      setTimeout(function () {
        searchBackdrop.classList.add('hidden');
        searchPanel.classList.add('hidden');
      }, 300); // Match this to the duration in the CSS transition
    };
    searchToggle.addEventListener('click', openSearch);
    searchClose.addEventListener('click', closeSearch);
    searchBackdrop.addEventListener('click', closeSearch);

    // Close search panel when ESC key is pressed
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !searchPanel.classList.contains('hidden')) {
        closeSearch();
      }
    });
  }
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/js/app-defer.js"));
/******/ }
]);