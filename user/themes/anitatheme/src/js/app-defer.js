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
  const buttons = document.querySelectorAll('button.flyout-button');

  buttons.forEach(function (button) {
    const flyoutMenu = button.nextElementSibling; // Assume the menu is the next sibling

    button.addEventListener('click', function (event) {
      // Stop event from bubbling up and closing the menu immediately
      event.stopPropagation();

      // Close all other dropdowns
      buttons.forEach(function (btn) {
        const otherMenu = btn.nextElementSibling;
        if (btn !== button) {
          btn.setAttribute('aria-expanded', 'false');
          otherMenu.classList.remove('opacity-100', 'translate-y-0');
          otherMenu.classList.add('opacity-0', 'translate-y-1', 'hidden');
        }
      });

      // Toggle the current dropdown
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !isExpanded);

      if (!isExpanded) {
        // Show menu
        flyoutMenu.classList.remove('hidden', 'opacity-0', 'translate-y-1');
        flyoutMenu.classList.add('opacity-100', 'translate-y-0');
      } else {
        // Hide menu
        flyoutMenu.classList.remove('opacity-100', 'translate-y-0');
        flyoutMenu.classList.add('opacity-0', 'translate-y-1');

        // Add hidden class after transition completes
        setTimeout(() => {
          if (!flyoutMenu.classList.contains('opacity-100')) {
            flyoutMenu.classList.add('hidden');
          }
        }, 150); // Match your CSS transition duration
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function () {
    buttons.forEach(function (button) {
      const flyoutMenu = button.nextElementSibling;
      button.setAttribute('aria-expanded', 'false');
      flyoutMenu.classList.remove('opacity-100', 'translate-y-0');
      flyoutMenu.classList.add('opacity-0', 'translate-y-1');

      // Add hidden class after transition completes
      setTimeout(() => {
        flyoutMenu.classList.add('hidden');
      }, 150); // Match your CSS transition duration
    });
  });
});

/** Mobile menu */
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
  const menuClosedIcon = document.getElementById('menu-closed-icon');
  const menuOpenIcon = document.getElementById('menu-open-icon');
  const mobileMenuClose = document.getElementById('mobile-menu-close');

  if (mobileMenuButton && mobileMenu) {
    const openMenu = function() {
      // First show elements
      mobileMenuBackdrop.classList.remove('hidden');
      mobileMenu.classList.remove('hidden');

      // Force browser to recalculate layout before adding transition classes
      // This is needed for the transition to work properly
      window.setTimeout(function() {
        mobileMenu.classList.remove('translate-x-full');
        document.body.classList.add('overflow-hidden');
        menuClosedIcon.classList.add('hidden');
        menuOpenIcon.classList.remove('hidden');
      }, 10);
    };

    const closeMenu = function() {
      mobileMenu.classList.add('translate-x-full');
      document.body.classList.remove('overflow-hidden');
      menuClosedIcon.classList.remove('hidden');
      menuOpenIcon.classList.add('hidden');

      // Wait for transition to finish before hiding elements
      setTimeout(function() {
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
document.addEventListener('DOMContentLoaded', function() {
  const searchToggle = document.getElementById('search-toggle');
  const searchPanel = document.getElementById('search-panel');
  const searchBackdrop = document.getElementById('search-backdrop');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');

  if (searchToggle && searchPanel) {
    const openSearch = function() {
      // First show elements
      searchBackdrop.classList.remove('hidden');
      searchPanel.classList.remove('hidden');

      // Force browser to recalculate layout before adding transition classes
      window.setTimeout(function() {
        searchPanel.classList.remove('translate-x-full');
        document.body.classList.add('overflow-hidden');

        // Auto-focus the search input
        searchInput.focus();
      }, 10);
    };

    const closeSearch = function() {
      searchPanel.classList.add('translate-x-full');
      document.body.classList.remove('overflow-hidden');

      // Wait for transition to finish before hiding elements
      setTimeout(function() {
        searchBackdrop.classList.add('hidden');
        searchPanel.classList.add('hidden');
      }, 300); // Match this to the duration in the CSS transition
    };

    searchToggle.addEventListener('click', openSearch);
    searchClose.addEventListener('click', closeSearch);
    searchBackdrop.addEventListener('click', closeSearch);

    // Close search panel when ESC key is pressed
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && !searchPanel.classList.contains('hidden')) {
        closeSearch();
      }
    });
  }
});