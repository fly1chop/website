import team from '../lib/team2.json';
import { imageMap } from './imageMap';
import { fetchNews } from './news';

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

if ($instructorsList) {
  $instructorsList.innerHTML = instructorsHtml;
}

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
if ($mentorsList) {
  $mentorsList.innerHTML = mentorsHtml;
}

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
if ($staffList) {
  $staffList.innerHTML = staffHtml;
}

if ($newsList) {
  fetchNews().then((newsHtml) => {
    $newsList.innerHTML = newsHtml;
    $newsList.addEventListener('click', (event) => {
      const $tr = event.target.closest('tr[data-href]');
      if ($tr) {
        const url = $tr.getAttribute('data-href');
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    });
  });
}
