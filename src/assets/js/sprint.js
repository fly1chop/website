import sprint from '../lib/sprint.json';
import { imageMap } from './imageMap';

const $sprintOngoingList = document.getElementById('sprint-ongoing-list');

const ongoingHtml = sprint
  .filter((p) => p.category === 'ONGOING')
  .map((p, i) => {
    return `
  <div
    class="flex flex-col-reverse justify-between gap-x-2 rounded-xs bg-white shadow-sm md:flex-row relative">
    <div class="flex flex-1 flex-col gap-4 p-8">
      <span class="text-5xl font-bold w-12 block text-center border-b pb-1.5 border-flamingo-500 text-zinc-300">${i + 1}</span>
      <div class="space-y-2">
        <p class="text-3xl font-semibold">${p.name}</p>
        ${p.client ? `<p class="font-medium">Client | Partner: ${p.client}</p>` : ''}
      </div>
      <div class="space-y-2">
        <p class="text-zinc-600 italic">Term: ${p.duration}</p>
        <div class="flex gap-2">
          ${
            p.isApplicationOpen
              ? `<span class="rounded-full bg-sky-500 px-4 py-2 text-xs font-medium text-white uppercase">
                application open
              </span>
            `
              : `
              <span class="rounded-full bg-zinc-200 px-4 py-2 text-xs font-medium text-zinc-400 uppercase">
                application closed
              </span>
            `
          }
        </div>
      </div>
      <p class="leading-7 break-keep whitespace-pre-line">${p.description}</p>
      <div class="flex gap-2 flex-col sm:flex-row">
          ${
            p.link
              ? `
            <a href="${p.link}" class="btn white !bg-zinc-800">
            <span>자세히 보기</span>
            <span class="heroicons--arrow-long-right"></span>
          </a>
            `
              : ''
          }
          ${
            p.isContact
              ? `
              <button
                type="button"
                data-modal-target="contactForm"
                data-modal-show="contactForm"
                class="btn white !bg-zinc-800">
                <span>프로그램 상담</span>
              </button>
              `
              : ''
          }
          ${
            p.form
              ? `
            <a href="${p.form}" target="_blank" class="btn white">
              <span>Apply Now</span>
              <span class="heroicons--arrow-long-right"></span>
            </a>
            `
              : ''
          }
      </div>
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
$sprintOngoingList.innerHTML = ongoingHtml;
