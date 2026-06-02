import 'flowbite';
import { Drawer } from 'flowbite';
import { LINKS } from '../lib/constants';
import navJson from '../lib/nav.json';

(function loadGoogleAnalytics() {
  const GA_MEASUREMENT_ID = 'G-C1E4J0JTPV';
  const scriptTag = document.createElement('script');
  scriptTag.async = true;
  scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(scriptTag);

  scriptTag.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag; // Make gtag globally accessible
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  };
})();

window.addEventListener('load', () => {
  showCurrentTab();
});

window.addEventListener('hashchange', () => {
  showCurrentTab();
});

window.addEventListener('DOMContentLoaded', () => {
  initHeader();

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
});

async function initHeader() {
  injectHeader();
  initDrawer();
  initHeaderScroll();
}

function buildDesktopNavItem(item) {
  if (!item.children) {
    return `
          <li>
            <a href="${item.href}" class="hover-transition text-white hover:text-zinc-400">${item.name}</a>
          </li>`;
  }
  const slug = item.name.toLowerCase().replace(/\s+/g, '-');
  const skidding = item.dropdownSkidding ?? 0;
  return `
          <li class="inline-flex items-center gap-1">
            <a href="${item.children[0].href}" class="hover-transition text-white hover:text-zinc-400">${item.name}</a>
            <button
              data-dropdown-toggle="${slug}-dropdown"
              data-dropdown-offset-skidding="${skidding}"
              class="cursor-pointer inline-flex size-5 items-center justify-center text-zinc-400">
              <span class="heroicons--chevron-down-20-solid"></span>
            </button>
            <div id="${slug}-dropdown" class="z-20 hidden overflow-hidden rounded-sm bg-white shadow-sm">
              <ul class="text-zinc-500">
                ${item.children.map((child) => `
                <li><a href="${child.href}" class="block px-4 py-2 hover:bg-zinc-100">${child.name}</a></li>`).join('')}
              </ul>
            </div>
          </li>`;
}

function buildMobileNavItem(item) {
  if (!item.children) {
    return `
          <li>
            <a href="${item.href}" class="block px-4 py-3 hover:bg-zinc-100 hover:font-normal active:bg-zinc-100 active:font-normal">${item.name}</a>
          </li>`;
  }
  const slug = item.name.toLowerCase().replace(/\s+/g, '-');
  return `
          <li data-accordion="collapse">
            <button
              type="button"
              id="accordion-${slug}-button"
              data-accordion-target="#accordion-${slug}"
              data-active-classes="bg-zinc-100"
              class="flex w-full cursor-pointer items-center justify-between px-4 py-3 hover:bg-zinc-100 hover:font-normal active:bg-zinc-100 active:font-normal">
              <span>${item.name}</span>
              <span data-accordion-icon class="heroicons--chevron-up-20-solid rotate-180 text-zinc-400"></span>
            </button>
            <div id="accordion-${slug}" class="hidden border-b border-neutral-200" aria-labelledby="accordion-${slug}-button">
              <ul class="flex flex-col text-base text-zinc-500">
                ${item.children.map((child) => `
                <li><a href="${child.href}" class="block px-7 py-3 hover:bg-zinc-100 hover:font-normal active:bg-zinc-100 active:font-normal">${child.name}</a></li>`).join('')}
              </ul>
            </div>
          </li>`;
}

function injectHeader() {
  const $headerContainer = document.getElementById('header-container');
  if (!$headerContainer) return;

  try {
    const html = `
    <header
      id="header-nav"
      class="transition-transform duration-300 fixed sm:absolute start-0 top-0 z-20 w-full sm:bg-linear-to-b from-black/90 to-transparent sm:pb-28">
      <nav
        class="mx-auto flex max-w-7xl items-center justify-end px-4 pt-4 md:justify-between lg:px-12">
        <a href="/" class="hidden w-16 md:block">
          <img class="logo" src="${new URL('../img/logo_en_white.png', import.meta.url)}" alt="" />
        </a>
        <ul class="hidden items-center space-x-8 md:flex">
          ${navJson.map(buildDesktopNavItem).join('')}
        </ul>
        <a href="#" class="link--blog btn hidden md:flex">
          <span>Blog</span>
          <span class="heroicons--arrow-long-right"></span>
        </a>
        <!-- mobile navbar -->
        <button
          id="mobile-nav-drawer-button"
          aria-controls="mobile-nav-drawer"
          type="button"
          class="z-50 inline-flex cursor-pointer items-center justify-center text-xl text-zinc-950 bg-white rounded-full size-12 shadow-lg transition hover:text-white hover:bg-flamingo-500 active:bg-flamingo-500 md:hidden">
          <span class="sr-only">Open main menu</span>
          <span class="heroicons--bars-3"></span>
        </button>
      </nav>
      <div
        id="mobile-nav-drawer"
        aria-labelledby="drawer-label"
        tabindex="-1"
        class="fixed top-0 right-0 z-40 h-screen w-[80%] translate-x-full divide-y divide-neutral-200 overflow-y-auto rounded-b-sm bg-white pt-2 shadow-lg transition-transform md:hidden">
        <span id="drawer-label" class="sr-only">mobile navigation menu</span>
        <ul class="mt-20 flex flex-col text-lg text-zinc-500">
          <li>
            <a href="/" class="block px-4 py-3 hover:bg-zinc-100 hover:font-normal active:bg-zinc-100 active:font-normal">Home</a>
          </li>
          ${navJson.map(buildMobileNavItem).join('')}
        </ul>
        <div class="flex px-4 py-3">
          <a href="#" class="link--blog btn w-full justify-between text-lg sm:w-auto">
            <span>Blog</span>
            <span class="heroicons--arrow-long-right"></span>
          </a>
        </div>
      </div>
    </header>
    `;
    $headerContainer.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

function initDrawer() {
  const $mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const $mobileNavDrawerButton = document.getElementById('mobile-nav-drawer-button');

  const options = {
    placement: 'right',
    backdrop: true,
    bodyScrolling: false,
    backdropClasses: 'bg-black/50 fixed inset-0 z-10',
  };
  const drawer = new Drawer($mobileNavDrawer, options);
  $mobileNavDrawerButton.addEventListener('click', () => drawer.toggle());
}

function initHeaderScroll() {
  const $header = document.getElementById('header-nav');
  if (!$header) return;

  let lastScroll = window.scrollY;
  let ticking = false;

  function onScroll() {
    const currentScroll = window.scrollY;
    const isMobile = window.innerWidth < 640;

    if (!isMobile) {
      $header.style.transform = '';
      return;
    }

    // keep header if within 123px from top
    if (currentScroll <= 123) {
      $header.style.transform = 'translateY(0)';
      lastScroll = currentScroll;
      ticking = false;
      return;
    }

    if (currentScroll > lastScroll) {
      // scrolling down
      $header.style.transform = 'translateY(-100%)';
    } else {
      // scrolling up
      $header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  });
}

//////////////////
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
