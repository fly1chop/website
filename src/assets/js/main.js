import 'flowbite';
import { Dropdown } from 'flowbite';
import { LINKS } from '../lib/constants';
import team from '../lib/team.json';
import news from '../lib/news.json';

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
  aboutTabs.updateOnShow(() => {
    window.scrollTo({
      top: document.querySelector('#tab-content--container').offsetTop - 59 - (59 + 48),
      behavior: 'smooth',
    });
  });
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
const $mentorsList = document.getElementById('mentors-list');
const $instructorsList = document.getElementById('instructors-list');
const $newsList = document.getElementById('news-list');

const instructorsHtml = team.instructors
  .filter((item) => !item.isMain)
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
$instructorsList.innerHTML = instructorsHtml;

const mentorsHtml = team.mentors
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
      <p class="font-medium">${item.employment}</p>
      <p>${item.school}</p>
    </div>
  </div>
`
  )
  .join('');
$mentorsList.innerHTML = mentorsHtml;

const newsHtml = news
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .map(
    (item) => `
  <tr
    data-href=${item.href}
    class="hover-transition cursor-pointer border-b border-neutral-300/60 even:bg-zinc-50 odd:bg-white hover:bg-neutral-200/20">
    <td class="px-4 py-3 text-sm text-nowrap">${item.date}</td>
    <th scope="row" class="px-4 py-3 font-medium truncate">
      ${item.title}
    </th>
    <td class="flex justify-end gap-2 px-4 py-3">
      ${item.tags
        .map(
          (tag) => `
        <span
          class="break-keep rounded-full bg-neutral-200/70 px-4 py-2 text-xs font-medium uppercase outline outline-neutral-300/80">
          ${tag}
        </span>
        `
        )
        .join('')}
    </td>
  </tr>
`
  )
  .join('');
$newsList.innerHTML = newsHtml;
$newsList.addEventListener('click', (event) => {
  const $tr = event.target.closest('tr[data-href]');
  if ($tr) {
    const url = $tr.getAttribute('data-href');
    window.open(url, '_blank', 'noopener,noreferrer');
  }
});
