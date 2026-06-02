var e,t={};t=JSON.parse('[{"name":"2026 여름/가을 대회","href":"/competitions/2026"},{"name":"초등부 대회","href":"/competitions/jr"},{"name":"중·고등부 대회","href":"/competitions/sr"}]');let o=document.getElementById("competitions-sub-menu"),r=`
  <ul class="mx-auto mt-auto flex h-full max-w-7xl gap-6 overflow-x-auto px-4 text-sm sm:text-base lg:px-12">
    ${((e=t)&&e.__esModule?e.default:e).filter(e=>!e.hide).map(e=>`
        <a
          href="${e.href}"
          class="cursor-pointer border-b-2 px-2 py-3 sm:py-4 font-normal text-nowrap transition ${window.location.pathname===e.href?"border-flamingo-500":"hover:border-flamingo-400 hover:text-zinc-500 border-transparent"}"
          >
          ${e.name}
        </a>
      `).join("")}
  </ul>
`;o&&(o.innerHTML=r);
//# sourceMappingURL=2026.8de44d7c.js.map
