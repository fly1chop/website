import competitionsSubMenuJson from '../lib/competitions.json';

const $competitionsSubMenu = document.getElementById('competitions-sub-menu');

const competitionsSubMenuHtml = `
  <ul class="mx-auto mt-auto flex h-full max-w-7xl gap-6 overflow-x-auto px-4 text-sm sm:text-base lg:px-12">
    ${competitionsSubMenuJson
      .filter((i) => !i.hide)
      .map(
        (item) => `
        <a
          href="${item.href}"
          class="cursor-pointer border-b-2 px-2 py-3 sm:py-4 font-normal text-nowrap transition ${window.location.pathname === item.href ? 'border-flamingo-500' : 'hover:border-flamingo-400 hover:text-zinc-500 border-transparent'}"
          >
          ${item.name}
        </a>
      `
      )
      .join('')}
  </ul>
`;

if ($competitionsSubMenu) {
  $competitionsSubMenu.innerHTML = competitionsSubMenuHtml;
}
