import 'flowbite';
import { Dropdown, Tabs } from 'flowbite';
import { LINKS } from '../lib/constants';

///////////////////
//// Dropdown
const $mobileNavbarDropdown = document.querySelector('#mobile-navbar-dropdown');
const $mobileNavbarDropdownButton = document.querySelector('#mobile-navbar-dropdown-button');
const $nav = document.querySelector('nav');
new Dropdown($mobileNavbarDropdown, $mobileNavbarDropdownButton, {
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

///////////////////
//// Tabs
window.addEventListener('load', function () {
  const aboutTabs = FlowbiteInstances.getInstance('Tabs', 'tab-menu--about');
  const currentTab = window.location.hash;
  if (aboutTabs && currentTab) aboutTabs.show(currentTab);
});

document.querySelectorAll('.do-toggle-flip').forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.card');
    card?.classList.toggle('toggle-flip');
  });
});

Object.entries(LINKS).forEach(([name, url]) => {
  document.querySelectorAll(`a.link--${name}`).forEach((btn) => {
    if (btn.tagName !== 'A') return;
    btn.setAttribute('href', url);
    btn.setAttribute('target', '_blank');
  });
});
