import 'flowbite';
import { Dropdown } from 'flowbite';
import { INSTRUCTORS, LINKS, MENTORS } from '../lib/constants';

window.addEventListener('load', () => {
  showCurrentTab();
});

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
const showCurrentTab = () => {
  const aboutTabs = FlowbiteInstances.getInstance('Tabs', 'tab-menu--about');
  if (!aboutTabs) return;
  const currentTab = window.location.hash;
  if (aboutTabs && currentTab) aboutTabs.show(currentTab);
};

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

//////////////////////////////////////
//////////////////////////////////////
//// About Page
const $mentorsGridContainer = document.getElementById('mentors-grid');
const $instructorsGridContainer = document.getElementById('instructors-grid');

const instructorsHtml = INSTRUCTORS.filter((item) => !item.isMain)
  .map(
    (item) => `
  <div class="bg-zinc-50 shadow-lg overflow-hidden rounded-xs">
    <img
      src="${new URL('../img/team.jpg', import.meta.url)}"
      alt="${item.name}"
      class="aspect-square w-full" />
    <div class="flex flex-col gap-2 p-4 text-sm">
      <p class="text-base font-medium">${item.name}</p>
      <p>${item.field.join()}</p>
      <p>${item.school}</p>
    </div>
  </div>
`
  )
  .join('');
$instructorsGridContainer.innerHTML = instructorsHtml;

const mentorsHtml = MENTORS.map(
  (item) => `
  <div class="bg-zinc-50 shadow-lg overflow-hidden rounded-xs">
    <img
      src="${new URL('../img/team.jpg', import.meta.url)}"
      alt="${item.name}"
      class="aspect-square w-full" />
    <div class="flex flex-col gap-2 p-4 text-sm">
      <p class="text-base font-medium">${item.name}</p>
      <p>${item.field.join()}</p>
      <p class="font-medium">${item.employment}</p>
      <p>${item.school}</p>
    </div>
  </div>
`
).join('');
$mentorsGridContainer.innerHTML = mentorsHtml;
