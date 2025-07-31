import { parse } from 'papaparse';

const newsSpreadsheetCsvUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTZu4wuPozYwq6QAiuqcGixw3JOr4Pw0s0qpWxJf57WPHuOb5sFiytP2tHGWZdLdztrYY8mxOZc8m0Z/pub?gid=0&single=true&output=csv';

function parseCsv(csv) {
  const { data } = parse(csv, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
    transform: (value) => value.trim(),
  });
  const news = data
    .map((item) => ({
      ...item,
      tags: item.tags ? item.tags.split(',').map((tag) => tag.trim()) : [],
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  return news;
}

export async function fetchNews() {
  return fetch(newsSpreadsheetCsvUrl)
    .then((res) => res.text())
    .then((csvText) => {
      const news = parseCsv(csvText).sort((a, b) => new Date(b.date) - new Date(a.date));

      const newsHtml = news
        .map(
          (item) => `
      <tr
        data-href=${item.href}
        class="hover-transition cursor-pointer border-b border-neutral-300/60 even:bg-zinc-50 odd:bg-white hover:bg-neutral-200/20">
        <td class="px-4 py-3 text-xs sm:text-sm text-nowrap w-24 sm:w-[100px]">${item.date}</td>
        <th scope="row" class="px-4 py-3 font-medium truncate max-w-[10rem] text-sm sm:text-base sm:max-w-none">
          ${item.title}
        </th>
        <td class="hidden sm:flex justify-end gap-2 px-4 py-3">
          ${item.tags
            .map(
              (tag) => `
            <span
              class="break-keep rounded-full bg-neutral-200/70 px-4 py-2 text-xs font-medium uppercase outline outline-neutral-300/80">
              ${tag}
            </span>
            `
            )
            .join('')}
        </td>
      </tr>
    `
        )
        .join('');

      return newsHtml;
    })
    .catch((err) => {
      console.error('Failed to load news from Google Sheets:', err);
    });
}
