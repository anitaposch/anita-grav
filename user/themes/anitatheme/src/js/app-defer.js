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
*/document.addEventListener('DOMContentLoaded', function () {
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
          otherMenu.classList.add('opacity-0', 'translate-y-1');
        }
      });

      // Toggle the current dropdown
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
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
      const flyoutMenu = button.nextElementSibling;
      button.setAttribute('aria-expanded', 'false');
      flyoutMenu.classList.remove('opacity-100', 'translate-y-0');
      flyoutMenu.classList.add('opacity-0', 'translate-y-1');
    });
  });
});
