# Contact Us Page Design

**Date:** 2026-05-28  
**File:** `src/pages/contact-us.html`  
**Scope:** Fill the empty `<main>` tag; fix `<title>`; no new assets needed.

---

## What We're Building

A dedicated Contact Us page for LognCoding that gives visitors a clear path to reach out and find the academy in person.

## Structure (inside `<main>`)

### 1. Fix `<title>`
Change `Capstone | LognCoding` → `Contact Us | LognCoding`.

### 2. Hero Banner
Thin dark-gradient splash image, identical to other inner pages:
```html
<div class="flex h-16 w-full items-end bg-[linear-gradient(...),url(../../assets/img/splash-2.png)] bg-cover bg-center bg-no-repeat sm:h-40"></div>
```

### 3. "문의하기" Section
- Watermark heading pattern (`CONTACT US` big, `문의하기` overlay) — same style used in `index.html` sections.
- Short descriptor line (e.g. "궁금한 점이 있으시면 언제든지 문의해주세요").
- Large CTA button that opens the existing `contactForm` modal (`data-modal-target="contactForm" data-modal-show="contactForm"`).
- Social channel icons row: Kakao, Instagram, YouTube, Naver Blog — same `size-8 rounded-lg` icon style as footer.

### 4. "오시는 길" Section
- Watermark heading pattern (`오시는 길`).
- White card with `shadow-xl`, horizontal split on md+:
  - **Left:** address, phone (`+82 2-540-1628`), email (`info@logncoding.com`), Naver Maps link (`https://naver.me/xHg7gSXb`).
  - **Right:** `map.png` (`../../assets/img/map.png`), fills the panel with `object-cover`.
- Exact reuse of the pattern from `index.html` lines 578–615.

## Style Rules
- All Tailwind classes follow the existing site conventions (flamingo-500 accent, zinc-800/zinc-950 darks, zinc-100 background).
- Section padding: `py-12 md:py-28`.
- Container: `max-w-7xl mx-auto px-4 lg:px-12`.
- No new CSS, no new JS files needed.

## Out of Scope
- Business hours (not provided).
- Embedded interactive map (map.png is sufficient).
- Any changes to footer, floating buttons, or modal — already present in the file.
