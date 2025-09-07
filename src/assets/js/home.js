import Hls from 'hls.js';
import Chart from 'chart.js/auto';
import { imageMap } from './imageMap';
import youtube from '../lib/youtube.json';

const track = document.getElementById('media-carousel-track');

if (!track) {
  console.error('media-carousel track not found');
} else {
  // Clear the placeholder slides
  track.innerHTML = '';

  const makeSlide = (item, isActive = false) => {
    const slide = document.createElement('div');
    slide.className =
      'group h-full cursor-pointer overflow-hidden duration-300 ease-in-out md:px-8';
    slide.setAttribute('data-carousel-item', isActive ? 'active' : '');
    if (!isActive) slide.classList.add('hidden');

    // Resolve the thumbnail URL from your imageMap
    const imageURL = imageMap[item.image];
    const thumbnail = imageURL?.href ?? String(imageURL ?? '');
    const hashtags = item.description
      ? item.description
          .split(' ')
          .map((tag) => `<span class="mr-1.5">${tag}</span>`)
          .join(' ')
      : '';

    slide.innerHTML = `
        <div class="relative flex h-full flex-col duration-300 group-hover:shadow-xl bg-zinc-800 js-yt" data-video-id="${item.videoId}">
          <!-- Hover overlay -->
          <span class="absolute left-0 z-20 flex size-full items-center justify-center bg-black/40 opacity-0 duration-300 ease-in-out group-hover:opacity-100 pointer-events-none">
            <span class="iconify-[f7--play-circle-fill] size-16 text-white"></span>
          </span>

          <!-- Thumbnail -->
          <img src="${thumbnail}" alt="" class="w-full object-cover" />

          <!-- Caption -->
          <div class="bottom-0 z-10 flex w-full flex-col gap-3 px-6 py-4 text-sm text-white sm:absolute md:text-base">
            <p>${hashtags}</p>
          </div>
        </div>
      `;
    return slide;
  };

  // Build slides from JSON (first one active/visible)
  youtube.forEach((item, idx) => {
    track.appendChild(makeSlide(item, idx === 0));
  });

  // Lazy embed YouTube on click (removes YouTube overlays until play)
  track.addEventListener('click', (e) => {
    const root = e.target.closest('.js-yt');
    if (!root) return;

    // If already replaced with iframe, do nothing
    if (root.querySelector('iframe')) return;

    const id = root.dataset.videoId;
    // const caption = root.querySelector('div.bottom-0');

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1`;
    iframe.title = 'YouTube video';
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.className = 'aspect-video size-full';

    // Swap image → iframe, keep caption under it
    root.innerHTML = '';
    root.appendChild(iframe);
    // if (caption) root.appendChild(caption);
  });
}

let chartInstance;
const majorsChartContainer = document.getElementById('majors-chart-container');
const majorsChart = document.getElementById('majors-chart');

if (majorsChartContainer && majorsChart) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !chartInstance) {
          const data = {
            labels: ['Social Sciences', 'STEM', 'Arts & Design'],
            datasets: [
              {
                data: [56, 41, 3],
                backgroundColor: ['rgba(231, 82, 36, 1)', 'rgba(39, 39, 42, 1)'],
              },
            ],
          };
          chartInstance = new Chart(majorsChart, {
            type: 'bar',
            data,
            options: {
              scales: { x: { beginAtZero: true } },
              indexAxis: 'y',
              plugins: {
                legend: {
                  display: false,
                },
              },
              animation: {
                duration: 2000,
              },
            },
          });

          observer.observe(majorsChartContainer);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(majorsChartContainer);
}

//////////////////////////////////////
//////////////////////////////////////
//// Video
const video = document.getElementById('hero');
const isMobile = window.innerWidth <= 640;
const source = isMobile ? 'assets/video/logn_hero_mobile.m3u8' : 'assets/video/logn_hero.m3u8';

if (Hls.isSupported()) {
  const hls = new Hls();
  hls.loadSource(source);
  hls.attachMedia(video);
  hls.on(Hls.Events.MANIFEST_PARSED, function () {
    video.play();
  });

  hls.on(Hls.Events.ERROR, function (event, data) {
    console.error('HLS.js error:', data);
  });
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  video.src = source;
  video.addEventListener('loadedmetadata', function () {
    video.play();
  });
}

document.querySelectorAll('.do-toggle-play').forEach((btn) => {
  const target = btn.getAttribute('data-video-target');
  if (!target) {
    console.error('No data-video-target attribute');
    return;
  }

  const $video = document.getElementById(target);
  if (!$video) {
    console.error(`No video element found with id="${target}"`);
    return;
  }
  if ($video.tagName !== 'VIDEO') {
    console.error('Element is not HTMLVideoElement');
    return;
  }

  btn.addEventListener('click', () => {
    if ($video.paused) {
      $video.play();
    } else {
      $video.pause();
    }
  });
});
