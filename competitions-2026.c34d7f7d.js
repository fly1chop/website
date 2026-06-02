var e,r={};r=JSON.parse('[{"name":"여름방학 특강","href":"/courses/summer"},{"name":"2026 여름/가을 대회 트랙","href":"/courses/competitions-2026"},{"name":"겨울방학 특강","href":"/courses/winterbreak","hide":true},{"name":"가을학기 정규반","href":"/courses/fall","hide":true},{"name":"초등부 대회","href":"/courses/competitions-jr"},{"name":"중·고등부 대회","href":"/courses/competitions-sr"}]');let o=document.getElementById("courses-sub-menu"),t=`
  <ul class="mx-auto mt-auto flex h-full max-w-7xl gap-6 overflow-x-auto px-4 text-sm sm:text-base lg:px-12">
    ${((e=r)&&e.__esModule?e.default:e).filter(e=>!e.hide).map(e=>`
        <a
          href="${e.href}"
          class="cursor-pointer border-b-2 px-2 py-3 sm:py-4 font-normal text-nowrap transition ${window.location.pathname===e.href?"border-flamingo-500":"hover:border-flamingo-400 hover:text-zinc-500 border-transparent"}"
          >
          ${e.name}
        </a>
      `).join("")}
  </ul>
`;o&&(o.innerHTML=t);
//# sourceMappingURL=competitions-2026.c34d7f7d.js.map
