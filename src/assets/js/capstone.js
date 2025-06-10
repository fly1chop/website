import capstone from '../lib/capstone.json';
import { imageMap } from './imageMap';

const $capstoneOngoingList = document.getElementById('capstone-ongoing-list');
const $capstoneCompletedList = document.getElementById('capstone-completed-list');
const $capstoneCompletedCarouselList = document.getElementById('capstone-completed-carousel-list');

const ongoingHtml = capstone
  .filter((p) => p.category === 'ONGOING')
  .map((p, i) => {
    return `
  <div
    class="flex flex-col-reverse justify-between gap-x-2 rounded-xs bg-white shadow-sm md:flex-row relative">
    <div class="flex flex-1 flex-col gap-4 p-8">
      <span class="text-5xl font-bold w-12 block text-center border-b pb-1.5 border-flamingo-500 text-zinc-300">${i + 1}</span>
      <div class="space-y-2">
        <p class="text-3xl font-semibold">${p.name}</p>
        <p class="font-medium">Client: ${p.client}</p>
      </div>
      <div class="space-y-2">
        <p class="text-zinc-600 italic">Duration: ${p.duration}</p>
        <div class="flex gap-2">
          <span
            class="rounded-full bg-sky-500 px-4 py-2 text-xs font-medium text-white uppercase">
            application open
          </span>
        </div>
      </div>
      <p class="leading-7 break-keep">${p.description}</p>
      ${
        p.link
          ? `
        <div class="flex gap-2">
          <a href="${p.link}" class="btn white !bg-zinc-800">
            <span>프로젝트 상세보기</span>
            <span class="heroicons--arrow-long-right"></span>
          </a>
          <a class="btn white">
            <span>Capstone 문의하기</span>
          </a>
        </div>
        `
          : ''
      }
    </div>
    <div class="flex-1">
      <img
        src="${imageMap[p.image]}"
        alt="${p.name}"
        draggable="false"
        class="h-auto sm:h-full object-cover ${p.objectPosition === 'left' ? 'object-left' : 'object-center'}" />
    </div>
  </div>
`;
  })
  .join('');
$capstoneOngoingList.innerHTML = ongoingHtml;

const HIDDEN_PROJECTS = ['Project MU', 'Project CUBS', 'The Metaverse Project'];
const filteredCapstones = capstone.filter(
  (p) => p.category === 'COMPLETED' && !HIDDEN_PROJECTS.includes(p.name)
);

const completedCarouselHtml = filteredCapstones
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
          <p class="mt-4 leading-7 break-keep">
            ${p.description}
          </p>
        </div>
        <div class="flex-1/2 bg-white">
          <img 
            src="${imageMap[p.image]}"
            alt="${p.name}"
            class="h-auto sm:h-full ${p.objectFit === 'contain' ? 'object-contain' : 'object-cover'}" />
        </div>
      </div>
    </div>
  `;
  })
  .join('');
$capstoneCompletedCarouselList.innerHTML = completedCarouselHtml;

const completedHtml = filteredCapstones
  .map((p) => {
    return `
    <div class="bg-zinc-50 flex flex-col-reverse h-full shadow-sm rounded-xs overflow-x-hidden overflow-y-auto">
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
        <p class="mt-4 leading-7 break-keep">
          ${p.description}
        </p>
      </div>
      <div class="flex-1/2 bg-white">
        <img 
          src="${imageMap[p.image]}"
          alt="${p.name}"
          class="h-auto w-full ${p.objectFit === 'contain' ? 'object-contain' : 'object-cover'}" />
      </div>
    </div>
  `;
  })
  .join('');
$capstoneCompletedList.innerHTML = completedHtml;
