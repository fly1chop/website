import team from '../lib/team2.json';
import { imageMap } from './imageMap';

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
$instructorsList.innerHTML = instructorsHtml;

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
$mentorsList.innerHTML = mentorsHtml;

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
$staffList.innerHTML = staffHtml;

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
$newsList.innerHTML = newsHtml;
$newsList.addEventListener('click', (event) => {
  const $tr = event.target.closest('tr[data-href]');
  if ($tr) {
    const url = $tr.getAttribute('data-href');
    window.open(url, '_blank', 'noopener,noreferrer');
  }
});
