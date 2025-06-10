import 'flowbite';
import { Drawer } from 'flowbite';
import { LINKS } from '../lib/constants';

window.addEventListener('load', () => {
  showCurrentTab();
});

window.addEventListener('hashchange', () => {
  showCurrentTab();
});

window.addEventListener('DOMContentLoaded', () => {
  initHeader();
});

async function initHeader() {
  injectHeader();
  initDrawer();
  initHeaderScroll();
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
        class="mx-auto flex max-w-screen-xl items-center justify-end px-4 pt-4 md:justify-between lg:px-12">
        <a href="/" class="hidden w-16 md:block">
          <img class="logo" src="${new URL('../img/logo_en.png', import.meta.url)}" alt="" />
        </a>
        <ul class="hidden items-center space-x-8 md:flex">
          <li class="inline-flex items-center gap-1">
            <a href="/pages/about" class="hover-transition text-white hover:text-zinc-400">About</a>
            <button
              id="aboutDropdownBtn"
              data-dropdown-toggle="about-dropdown"
              data-dropdown-offset-skidding="-10"
              class="inline-flex size-5 cursor-pointer items-center justify-center text-zinc-400">
              <span class="heroicons--chevron-down-20-solid"></span>
            </button>

            <!-- about dropdown -->
            <div id="about-dropdown" class="z-20 hidden overflow-hidden rounded-sm bg-white shadow-sm">
              <ul class="text-zinc-500" aria-labelledby="aboutDropdownBtn">
                <li>
                  <a href="/pages/about" class="block px-4 py-2 hover:bg-zinc-100">About Us</a>
                </li>
                <li>
                  <a href="/pages/about#team" class="block px-4 py-2 hover:bg-zinc-100">Team</a>
                </li>
                <li>
                  <a href="/pages/about#news" class="block px-4 py-2 hover:bg-zinc-100">News</a>
                </li>
              </ul>
            </div>
          </li>
          <li class="inline-flex items-center gap-1">
            <a href="/pages/courses/2025/summer" class="hover-transition text-white hover:text-zinc-400">Courses</a>
            <button
              data-dropdown-toggle="courses-dropdown"
              data-dropdown-offset-skidding="10"
              class="cursor-pointer inline-flex size-5 items-center justify-center text-zinc-400">
              <span class="heroicons--chevron-down-20-solid"></span>
            </button>

            <!-- courses dropdown -->
            <div
              id="courses-dropdown"
              class="z-20 hidden overflow-hidden rounded-sm bg-white shadow-sm">
              <ul class="text-zinc-500">
                <li>
                  <a href="/pages/courses/2025/summer" class="block px-4 py-2 hover:bg-zinc-100">
                    2025 여름학기 정규반
                  </a>
                </li>
                <li>
                  <a href="/pages/courses/2025/competition" class="block px-4 py-2 hover:bg-zinc-100">
                    2025 대회 프로그램
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="/pages/capstone" class="hover-transition text-white hover:text-zinc-400">
              Capstone
            </a>
          </li>
          <!-- <li>
                <a
                  href="/pages/personal-project"
                  class="hover-transition text-white hover:text-zinc-400">
                  Personal Project
                </a>
              </li> -->
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
            <a
              href="/"
              class="block px-4 py-3 hover:bg-zinc-100 hover:font-normal active:bg-zinc-100 active:font-normal">
              Home
            </a>
          </li>
          <li data-accordion="collapse">
            <button
              type="button"
              id="accordion-about-button"
              data-accordion-target="#accordion-about"
              data-active-classes="bg-zinc-100"
              class="flex w-full cursor-pointer items-center justify-between px-4 py-3 hover:bg-zinc-100 hover:font-normal">
              <span>About</span>
              <span
                data-accordion-icon
                class="heroicons--chevron-up-20-solid rotate-180 text-zinc-400"></span>
            </button>
            <div
              id="accordion-about"
              class="hidden border-b border-neutral-200"
              aria-labelledby="accordion-about-button">
              <ul class="flex flex-col text-base text-zinc-500">
                <li>
                  <a
                    href="/pages/about"
                    class="block px-7 py-3 hover:bg-zinc-100 hover:font-normal active:bg-zinc-100 active:font-normal">
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/pages/about#team"
                    class="block px-7 py-3 hover:bg-zinc-100 hover:font-normal active:bg-zinc-100 active:font-normal">
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="/pages/about#news"
                    class="block px-7 py-3 hover:bg-zinc-100 hover:font-normal active:bg-zinc-100 active:font-normal">
                    News
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <!-- <li>
            <a
              href="/pages/courses"
              class="block px-4 py-3 hover:bg-zinc-100 hover:font-normal active:bg-zinc-100 active:font-normal">
              Courses
            </a>
          </li> -->
          <li data-accordion="collapse">
            <button
              type="button"
              id="accordion-courses-button"
              data-accordion-target="#accordion-courses"
              data-active-classes="bg-zinc-100"
              class="flex w-full cursor-pointer items-center justify-between px-4 py-3 hover:bg-zinc-100 hover:font-normal active:bg-zinc-100 active:font-normal">
              <span>Courses</span>
              <span
                data-accordion-icon
                class="heroicons--chevron-up-20-solid rotate-180 text-zinc-400"></span>
            </button>
            <div
              id="accordion-courses"
              class="hidden border-b border-neutral-200"
              aria-labelledby="accordion-courses-button">
              <ul class="flex flex-col text-base text-zinc-500">
                <li>
                  <a
                    href="/pages/courses/2025/summer"
                    class="block px-7 py-3 hover:bg-zinc-100 hover:font-normal active:bg-zinc-100 active:font-normal">
                    2025 여름학기 정규반
                  </a>
                </li>
                <li>
                  <a
                    href="/pages/courses/2025/competition"
                    class="block px-7 py-3 hover:bg-zinc-100 hover:font-normal active:bg-zinc-100 active:font-normal">
                    2025 대회 프로그램
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a
              href="/pages/capstone"
              class="block px-4 py-3 hover:bg-zinc-100 hover:font-normal active:bg-zinc-100 active:font-normal">
              Capstone
            </a>
          </li>
          <!-- <li>
                <a
                  href="/pages/personal-project"
                  class="block px-4 py-3 hover:bg-zinc-100 hover:font-normal active:bg-zinc-100 active:font-normal">
                  Personal Project
                </a>
              </li> -->
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
    // onShow: () => {
    //   $mobileNavDrawerButton.classList.remove('text-white');
    // },
    // onHide: () => {
    //   $mobileNavDrawerButton.classList.add('text-white');
    // },
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

    if (currentScroll > lastScroll) {
      // Scrolling down
      $header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
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
