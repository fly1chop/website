# Contact Us Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fill the empty `<main>` in `src/pages/contact-us.html` with a hero banner, inquiry CTA section, and map/location section matching the existing site theme.

**Architecture:** Pure HTML additions inside the existing page shell. No new JS or CSS files. All classes and patterns are taken directly from `src/pages/index.html` and `src/pages/about/index.html`. The existing contact form modal and floating buttons remain untouched.

**Tech Stack:** Tailwind CSS (via `style.css`), Flowbite (modal trigger via `data-modal-*` attributes), Heroicons (via `heroicons--*` class prefix), Noto Sans KR.

---

### Task 1: Fix page title

**Files:**
- Modify: `src/pages/contact-us.html:6`

- [ ] **Step 1: Change the `<title>` tag**

In `src/pages/contact-us.html` line 6, replace:
```html
<title>Capstone | LognCoding</title>
```
with:
```html
<title>Contact Us | LognCoding</title>
```

- [ ] **Step 2: Verify**

Open `src/pages/contact-us.html` in a browser (or check the source). The browser tab should show "Contact Us | LognCoding".

- [ ] **Step 3: Commit**

```bash
git add src/pages/contact-us.html
git commit -m "chore: fix contact-us page title"
```

---

### Task 2: Add hero banner

**Files:**
- Modify: `src/pages/contact-us.html` — inside `<main>`, before any other content

- [ ] **Step 1: Insert hero banner as the first child of `<main>`**

Find the line:
```html
    <main class="relative min-h-[calc(100vh-188px)] overflow-x-clip">
      
    </main>
```

Replace with:
```html
    <main class="relative min-h-[calc(100vh-188px)] overflow-x-clip">
      <div
        class="flex h-16 w-full items-end bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.7)),url(../../assets/img/splash-2.png)] bg-cover bg-center bg-no-repeat sm:h-40"></div>

    </main>
```

- [ ] **Step 2: Visual check**

Open the page in a browser. A dark gradient banner should appear at the top, consistent with the About and Courses pages.

- [ ] **Step 3: Commit**

```bash
git add src/pages/contact-us.html
git commit -m "chore: add hero banner to contact-us page"
```

---

### Task 3: Add "문의하기" inquiry section

**Files:**
- Modify: `src/pages/contact-us.html` — inside `<main>`, after the hero banner

- [ ] **Step 1: Insert the inquiry section after the hero banner div**

After the hero banner `<div>` and before `</main>`, add:

```html
      <!-- 문의하기 Section -->
      <section class="relative flex flex-col items-center gap-14 py-12 md:py-28">
        <h2
          class="border-flamingo-500 relative inline-block border-b pb-6 text-center text-4xl font-black text-zinc-950/5 after:absolute after:bottom-3 after:left-1/2 after:inline after:-translate-x-1/2 after:text-2xl after:font-semibold after:whitespace-nowrap after:text-zinc-950 after:content-['문의하기'] md:text-5xl">
          CONTACT US
        </h2>
        <p class="max-w-md px-4 text-center text-lg break-keep text-zinc-600">
          궁금한 점이 있으시면 언제든지 문의해주세요.
        </p>
        <button
          type="button"
          data-modal-target="contactForm"
          data-modal-show="contactForm"
          class="btn white large">
          <span>문의하기</span>
        </button>
        <div class="flex gap-6">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            class="link--kakao flex size-14 items-center justify-center overflow-hidden rounded-xl shadow-md transition hover:scale-105">
            <img src="../../assets/img/kakao.png" alt="Kakao Channel" class="size-full object-cover" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            class="link--instagram flex size-14 items-center justify-center overflow-hidden rounded-xl shadow-md transition hover:scale-105">
            <img src="../../assets/img/instagram.png" alt="Instagram" class="size-full object-cover" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            class="link--youtube flex size-14 items-center justify-center overflow-hidden rounded-xl shadow-md transition hover:scale-105">
            <img src="../../assets/img/youtube.png" alt="YouTube" class="size-full object-cover" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            class="link--blog flex size-14 items-center justify-center overflow-hidden rounded-xl shadow-md transition hover:scale-105">
            <img src="../../assets/img/naver-blog.png" alt="Naver Blog" class="size-full object-cover" />
          </a>
        </div>
      </section>
```

- [ ] **Step 2: Visual check**

The section should show the watermark heading, a subtitle, the flamingo CTA button (clicking it should open the Google Form modal), and four social icons in a row.

- [ ] **Step 3: Commit**

```bash
git add src/pages/contact-us.html
git commit -m "chore: add inquiry section to contact-us page"
```

---

### Task 4: Add "오시는 길" map / location section

**Files:**
- Modify: `src/pages/contact-us.html` — inside `<main>`, after the inquiry section

- [ ] **Step 1: Insert the location section after the inquiry section, before `</main>`**

```html
      <!-- 오시는 길 Section -->
      <section class="relative flex flex-col items-center gap-14 py-12 md:py-28">
        <h2
          class="border-flamingo-500 relative inline-block border-b pb-6 text-center text-4xl font-black text-zinc-950/5 after:absolute after:bottom-3 after:left-1/2 after:inline after:-translate-x-1/2 after:text-2xl after:font-semibold after:whitespace-nowrap after:text-zinc-950 after:content-['오시는_길'] md:text-5xl">
          오시는 길
        </h2>
        <div class="relative w-full px-4 lg:px-12">
          <div class="mx-auto flex w-full max-w-7xl flex-col bg-white shadow-xl md:flex-row">
            <div class="px-6 py-8 sm:px-10">
              <p class="font-medium sm:text-xl">
                서울특별시 강남구 언주로174길 17
                <br />
                서우빌딩 3층 로그엔코딩 학원
              </p>
              <hr class="text-flamingo-500 my-6 h-1 w-32" />
              <div
                class="xs:text-lg grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-sm sm:gap-x-8 lg:text-xl">
                <p class="font-medium">대표번호</p>
                <p class="text-zinc-600">+82 2-540-1628</p>
                <p class="font-medium">이메일</p>
                <p class="text-zinc-600">info@logncoding.com</p>
              </div>
              <div class="mt-6">
                <a
                  href="https://naver.me/xHg7gSXb"
                  target="_blank"
                  class="xs:text-lg group hover-transition text-flamingo-500 inline-flex items-center gap-1 border-b text-sm font-medium hover:opacity-60 lg:text-xl">
                  <span>네이버 지도 바로가기</span>
                  <span
                    class="heroicons--arrow-long-right hover-transition group-hover:translate-x-1"></span>
                </a>
              </div>
            </div>
            <div class="flex-5/7 p-4 pt-0 sm:p-6">
              <img class="size-full object-cover" src="../../assets/img/map.png" alt="오시는 길 지도" />
            </div>
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Visual check**

The section should show the watermark "오시는 길" heading, then a white card with address/phone/email/Naver link on the left and the map image on the right (stacked on mobile, side-by-side on md+).

- [ ] **Step 3: Commit**

```bash
git add src/pages/contact-us.html
git commit -m "chore: add location section to contact-us page"
```
