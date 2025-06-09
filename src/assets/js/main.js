import 'flowbite';
import { Drawer } from 'flowbite';
import { LINKS } from '../lib/constants';
import team from '../lib/team2.json';
import news from '../lib/news.json';
import capstone from '../lib/capstone.json';
import { imageMap } from './imageMap';
import Chart from 'chart.js/auto';

window.addEventListener('load', () => {
  showCurrentTab();
});

window.addEventListener('hashchange', () => {
  showCurrentTab();
});

///////////////////
//// Drawer
const $mobileNavDrawer = document.getElementById('mobile-nav-drawer');
const $mobileNavDrawerButton = document.getElementById('mobile-nav-drawer-button');
const $nav = document.querySelector('nav#header-nav');
const options = {
  placement: 'right',
  backdrop: true,
  bodyScrolling: false,
  backdropClasses: 'bg-black/50 fixed inset-0 z-10',
  onShow: () => {
    $mobileNavDrawerButton.classList.remove('text-white');
  },
  onHide: () => {
    $mobileNavDrawerButton.classList.add('text-white');
  },
};
const drawer = new Drawer($mobileNavDrawer, options);
$mobileNavDrawerButton.addEventListener('click', () => {
  drawer.toggle();
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

//////////////////////////////////////
//////////////////////////////////////
//// Initialize global components
document.getElementById('goToTopBtn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

//////////////////////////////////////
//////////////////////////////////////
//// Initialize utilities
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

let chartInstance;
const majorsChartContainer = document.getElementById('majors-chart-container');
const majorsChart = document.getElementById('majors-chart');
if (majorsChartContainer && majorsChart) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !chartInstance) {
          const data = {
            labels: ['문과', '공,이과', '예술'],
            datasets: [
              {
                data: [56, 41, 3],
                backgroundColor: ['rgba(231, 82, 36, 1)', 'rgba(39, 39, 42, 1)'],
              },
            ],
          };
          chartInstance = new Chart(majorsChart, {
            type: 'bar',
            data,
            options: {
              scales: { x: { beginAtZero: true } },
              indexAxis: 'y',
              plugins: {
                legend: {
                  display: false,
                },
              },
              animation: {
                duration: 2000,
              },
            },
          });

          observer.observe(majorsChartContainer);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(majorsChartContainer);
}

//////////////////////////////////////
//////////////////////////////////////
//// Home Page
document.querySelectorAll('.do-toggle-play').forEach((btn) => {
  const target = btn.getAttribute('data-video-target');
  if (!target) {
    console.error('No data-video-target attribute');
    return;
  }

  const $video = document.getElementById(target);
  if (!$video) {
    console.error(`No video element found with id="${target}"`);
    return;
  }
  if ($video.tagName !== 'VIDEO') {
    console.error('Element is not HTMLVideoElement');
    return;
  }

  btn.addEventListener('click', () => {
    if ($video.paused) {
      $video.play();
    } else {
      $video.pause();
    }
  });
});

//////////////////////////////////////
//////////////////////////////////////
//// About Page
const $instructorsList = document.getElementById('instructors-list');
const $mentorsList = document.getElementById('mentors-list');
const $staffList = document.getElementById('staff-list');
const $newsList = document.getElementById('news-list');

const instructors = team.filter((item) => item.category === 'instructor');
const mentors = team.filter((item) => item.category === 'mentor');
const staff = team.filter((item) => item.category === 'staff');

const instructorsHtml = instructors
  .filter((item) => !item.isMain)
  .map(
    (item) => `
  <div class="bg-zinc-50 shadow-lg overflow-hidden rounded-xs">
    <img
      src="${imageMap[item.image] || new URL('../img/team.jpg', import.meta.url)}"
      alt="${item.name}"
      draggable="false"
      class="aspect-square w-full object-cover object-top" />
    <div class="flex flex-col gap-2 p-4 text-sm">
      <p class="text-base font-medium">${item.name}</p>
      <p>${item.field.join(', ')}</p>
      <p>${item.school}</p>
    </div>
  </div>
`
  )
  .join('');

const mentorsHtml = mentors
  .map(
    (item) => `
  <div class="bg-zinc-50 shadow-lg overflow-hidden rounded-xs">
    <img
      src="${imageMap[item.image] || new URL('../img/team.jpg', import.meta.url)}"
      alt="${item.name}"
      draggable="false"
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

const staffHtml = staff
  .map(
    (item) => `
  <div class="bg-zinc-50 shadow-lg overflow-hidden rounded-xs">
    <img
      src="${imageMap[item.image] || new URL('../img/team.jpg', import.meta.url)}"
      alt="${item.name}"
      draggable="false"
      class="aspect-square w-full" />
    <div class="flex flex-col gap-2 p-4 text-sm">
      <p class="text-base font-medium">${item.name}</p>
      <p>${item.position}</p>
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
    <td class="px-4 py-3 text-xs sm:text-sm text-nowrap w-24 sm:w-[100px]">${item.date}</td>
    <th scope="row" class="px-4 py-3 font-medium truncate max-w-[10rem] text-sm sm:text-base sm:max-w-none">
      ${item.title}
    </th>
    <td class="hidden sm:flex justify-end gap-2 px-4 py-3">
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

if ($instructorsList) {
  $instructorsList.innerHTML = instructorsHtml;
}
if ($mentorsList) {
  $mentorsList.innerHTML = mentorsHtml;
}
if ($staffList) {
  $staffList.innerHTML = staffHtml;
}

if ($newsList) {
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
        draggable="false"
        class="h-auto sm:h-full object-cover object-left" />
    </div>
  </div>
`;
  })
  .join('');

if ($capstoneOngoingList) {
  $capstoneOngoingList.innerHTML = ongoingHtml;
}

const HIDDEN_PROJECTS = ['Project MU', 'Project CUBS'];
const completedHtml = capstone
  .filter((p) => p.category === 'COMPLETED' && !HIDDEN_PROJECTS.includes(p.name))
  .map((p) => {
    return `
    <div
      data-carousel-item
      class="lg:px-8 hidden h-full overflow-hidden duration-300 ease-in-out">
      <div class="bg-zinc-50 flex md:flex-row flex-col h-full shadow-sm rounded-xs overflow-x-hidden overflow-y-auto">
        <div class="flex flex-col gap-2 p-8 flex-2/3">
          <h3 class="text-3xl font-semibold">${p.name}</h3>
          <p class="font-medium">Client: ${p.client}</p>
          ${
            p.deliverables
              ? `
            <div>
            <a href="${p.deliverables.url}" target="_blank" class="hover-transition border-zinc-800 text-flamingo-500 hover:text-flamingo-400 text-sm font-medium border-b">${p.deliverables.name}</a>
            </div>
            `
              : ''
          }
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
        <div class="flex-1/3 bg-white">
          <img 
            src="${imageMap[p.image]}"
            alt="${p.name}"
            class="h-auto sm:h-full ${p.isImageContain ? 'object-contain' : 'object-cover'}" />
        </div>
      </div>
    </div>
  `;
  })
  .join('');

if ($capstoneCompletedList) {
  $capstoneCompletedList.innerHTML = completedHtml;
}
