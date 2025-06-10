import Hls from 'hls.js';
import Chart from 'chart.js/auto';

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
