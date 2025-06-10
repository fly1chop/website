import 'flowbite';
import { Drawer } from 'flowbite';
import { LINKS } from '../lib/constants';

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
