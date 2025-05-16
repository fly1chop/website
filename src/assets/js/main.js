import 'flowbite';
import { Dropdown } from 'flowbite';
import { LINKS } from '../lib/constants';
import team from '../lib/team.json';
import news from '../lib/news.json';
import capstone from '../lib/capstone.json';
import {imageMap} from './imageMap';

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

if ($instructorsList && $mentorsList && $newsList) {
  $instructorsList.innerHTML = instructorsHtml;
  $mentorsList.innerHTML = mentorsHtml;
  $newsList.innerHTML = newsHtml;

  $newsList.addEventListener('click', (event) => {
    const $tr = event.target.closest('tr[data-href]');
    if ($tr) {
      const url = $tr.getAttribute('data-href');
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  });
}

//////////////////////////////////////
//////////////////////////////////////
//// Capstone Page
const $capstoneOngoingList = document.getElementById('capstone-ongoing-list');
const $capstoneCompletedList = document.getElementById('capstone-completed-list');

const ongoingHtml = capstone
  .filter((p) => p.category === 'ONGOING')
  .map((p) => {
  return `
  <div
    class="flex flex-col justify-between gap-x-2 rounded-xs bg-white shadow-sm md:flex-row">
    <div class="flex flex-1 flex-col gap-2 p-8">
      <p class="text-3xl font-semibold">${p.name}</p>
      <p class="font-medium">Client: ${p.client}</p>
      <p class="mt-4 text-zinc-600 italic">Duration: ${p.duration}</p>
      <div class="flex gap-2">
        <span
          class="rounded-full bg-sky-500 px-4 py-2 text-xs font-medium text-white uppercase">
          application open
        </span>
      </div>
      <p class="mt-4 leading-relaxed">${p.description}</p>
    </div>
    <div class="flex-1">
      <img
        src="${imageMap[p.image]}"
        alt="${p.name}"
        class="h-full object-cover" />
    </div>
  </div>
`;
  })
  .join('');
$capstoneOngoingList.innerHTML = ongoingHtml;

const completedHtml = capstone.filter(p => p.category === 'COMPLETED')
.map(p => {
  return `
    <div
      data-carousel-item
      class="lg:px-8 hidden h-full overflow-hidden duration-300 ease-in-out">
      <div class="bg-zinc-50 flex md:flex-row flex-col h-full shadow-sm rounded-xs overflow-x-hidden overflow-y-auto">
        <div class="flex flex-col gap-2 p-8 flex-2/3">
          <h3 class="text-3xl font-semibold">${p.name}</h3>
          <p class="font-medium">Client: ${p.client}</p>
          ${p.deliverables ? `
            <div>
            <a href="${p.deliverables.url}" target="_blank" class="hover-transition border-zinc-800 text-flamingo-500 hover:text-flamingo-400 text-sm font-medium border-b">${p.deliverables.name}</a>
            </div>
            ` : ''}
          <p class="mt-4 text-sm italic text-zinc-600">Duration: ${p.duration}</p>
          <div class="flex gap-2">
            <span
              class="rounded-full bg-neutral-400 px-4 py-2 text-xs font-medium text-white uppercase">
              application closed
            </span>
            <span
              class="bg-flamingo-500 rounded-full px-4 py-2 text-xs font-medium text-white uppercase">
              completed
            </span>
          </div>
          <p class="mt-4 leading-relaxed">
            ${p.description}
          </p>
        </div>
        <div class="flex-1/3">
          <img 
            src="${imageMap[p.image]}"
            alt="${p.name}"
            class="h-full object-cover flex-1/3" />

        </div>
      </div>
    </div>
  `
}).join('');
$capstoneCompletedList.innerHTML = completedHtml;