import 'flowbite';
import { Dropdown } from 'flowbite';

const $mobileNavbarDropdown = document.querySelector('#mobile-navbar-dropdown');
const $mobileNavbarDropdownButton = document.querySelector('#mobile-navbar-dropdown-button');
const $nav = document.querySelector('nav');
const mobileNavbarDropdown = new Dropdown($mobileNavbarDropdown, $mobileNavbarDropdownButton, {
  offsetDistance: 0,
  onShow: () => {
    $nav.classList.add('max-md:bg-white', 'max-md:[&_img.logo]:invert');
    $mobileNavbarDropdownButton.classList.remove('text-white');
  },
  onHide: () => {
    $nav.classList.remove('max-md:bg-white', 'max-md:[&_img.logo]:invert');
    $mobileNavbarDropdownButton.classList.add('text-white');
  },
});
