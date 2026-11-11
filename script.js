/* =============================================================================
   Guccha Mo:Mo — script.js

   PART 1 (below) is the only part most people ever need to edit:
   business details, WhatsApp number, hours, social links, menu and reviews.

   Items marked  ⚠ CONFIRM  were NOT on the Google Maps listing this site was
   built from. Check each one with the restaurant before the site goes live.
   ============================================================================= */

"use strict";

const CONFIG = {
  /* ---------- Identity ---------- */
  name: "Guccha Mo:Mo",
  nepaliName: "गुच्छा मोमो",              // shown small above the headline; set "" to hide
  tagline: "Jhol momo and skewers in Kathmandu.",

  /* ---------- Contact ---------- */
  // Phone number exactly as it should be displayed, and in international format for tap-to-call.
  phoneDisplay: "984-1614918",
  phoneTel: "+9779841614918",

  // WhatsApp number for reservation requests: country code + number, digits only, no "+".
  // ⚠ CONFIRM: this reuses the phone number from the listing. Check that it has WhatsApp.
  whatsappNumber: "9779841614918",

  // ⚠ CONFIRM: no email was on the listing. Leave "" to hide it everywhere.
  email: "",

  address: {
    line1: "Chandraman Maskey Marg",
    city: "Kathmandu",
    region: "Bagmati Province",
    postalCode: "44600",
    country: "Nepal",
  },

  // What Google Maps searches for (map, directions, reviews link).
  mapsQuery: "Guccha Mo:Mo, Chandraman Maskey Marg, Kathmandu 44600, Nepal",

  /* ---------- Opening hours ---------- */
  hours: {
    opensAt: "14:30",   // 24-hour HH:MM. The reservation form won't accept earlier times.
    closesAt: "",       // ⚠ CONFIRM: 24-hour HH:MM, e.g. "20:30". "" = unknown, nothing is shown.
    days: "",           // ⚠ CONFIRM: e.g. "Every day". "" = unknown, nothing is shown.
    note: "Closing time can vary. Message us on WhatsApp to check before you come.",
  },

  /* ---------- Google rating (from the Google Maps listing) ---------- */
  rating: { score: 4.3, count: 127 },
  priceRange: "Rs 1–500",

  /* ---------- Social links ---------- */
  // ⚠ CONFIRM: none were on the listing. Paste full links; empty ones are hidden.
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
  },

  /* ---------- Reservation form rules ---------- */
  reservations: {
    maxGuests: 12,          // bigger groups are asked to message the restaurant directly
    bookingWindowDays: 60,  // how far ahead a table can be requested
  },

  /* ---------- Menu ---------- */
  currency: "Rs",
  // Shown under the menu. Set to "" to hide.
  menuNote: "Items and prices change. Ask on WhatsApp or at the counter for today's menu.",

  menuCategories: [
    { id: "momo", label: "Momo" },
    { id: "skewers", label: "Skewers" },
    { id: "combos", label: "Combos" },
  ],

  /* ⚠ CONFIRM: dish names and descriptions were written from the photos supplied
     (no menu was available). Check them against the real menu.

     price: a number (e.g. 180) shows "Rs 180". Use null to show no price.
     tag:   a small label such as "Signature". Use "" for none.
     image: either a base name like "assets/img/jhol-momo" (uses -480.webp and
            -720.webp), or a single file such as "assets/img/my-photo.jpg".
     focus: where the photo is cropped in the square thumbnail ("50% 50%" = centre). */
  menuItems: [
    {
      id: "jhol-momo",
      category: "momo",
      name: "Jhol Momo",
      description: "Steamed momo sitting in a warm, golden jhol.",
      price: null,
      tag: "Signature",
      image: "assets/img/jhol-momo",
      alt: "Momo in a foil bowl with golden jhol",
      focus: "50% 45%",
    },
    {
      id: "chilli-jhol-momo",
      category: "momo",
      name: "Chilli Jhol Momo",
      description: "Jhol momo finished with a spoon of red chilli on top.",
      price: null,
      tag: "",
      image: "assets/img/chilli-jhol-momo",
      alt: "Momo in jhol with red chilli on top",
      focus: "52% 50%",
    },
    {
      id: "masala-skewers",
      category: "skewers",
      name: "Masala Skewers",
      description: "Skewers coated in golden masala, with a little sauce underneath.",
      price: null,
      tag: "",
      image: "assets/img/masala-skewers",
      alt: "Skewers coated in golden masala on a foil plate",
      focus: "50% 45%",
    },
    {
      id: "spiral-skewer",
      category: "skewers",
      name: "Spiral Skewer",
      description: "A long, spiral-cut skewer in a glossy orange glaze.",
      price: null,
      tag: "Signature",
      image: "assets/img/twister-skewer",
      alt: "A spiral-cut skewer in orange glaze",
      focus: "45% 40%",
    },
    {
      id: "momo-and-fry",
      category: "combos",
      name: "Momo and Crispy Fry",
      description: "A bowl of jhol momo with a side of crispy, spiced fry.",
      price: null,
      tag: "",
      image: "assets/img/momo-and-fry",
      alt: "Momo in jhol next to a bowl of crispy spiced fry",
      focus: "50% 70%",
    },
    {
      id: "table-spread",
      category: "combos",
      name: "Momo and Skewers for the Table",
      description: "Momo and skewers together, made for sharing.",
      price: null,
      tag: "For sharing",
      image: "assets/img/table-spread",
      alt: "Momo and skewers on a wooden table",
      focus: "50% 55%",
    },
  ],

  /* ---------- Reviews ----------
     The rating block above is real (from Google Maps). The three entries below are
     SAMPLE TEXT so the layout can be seen. They are labelled "Sample" on the page.
     Replace them with real reviews (and remove `sample: true`) before launch.
     Set the list to [] to hide the quote section completely. */
  reviews: [
    { sample: true, name: "Sample guest", rating: 5, text: "Hot momo, golden jhol, and the chilli on top does the rest." },
    { sample: true, name: "Sample guest", rating: 4, text: "Come for the momo, stay for the skewers. Easy place to share a table." },
    { sample: true, name: "Sample guest", rating: 5, text: "Simple food, served hot, exactly how it should be." },
  ],
};

/* =============================================================================
   PART 2 — site behaviour. You normally don't need to change anything below.
   ============================================================================= */

/* ---------- Small helpers ---------- */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Create an element: h("div", { class: "x", text: "Hi" }, child1, child2) */
function h(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined || value === false) continue;
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else node.setAttribute(key, value === true ? "" : value);
  }
  children.flat().forEach((child) => child !== null && child !== undefined && node.append(child));
  return node;
}

/** Inline SVG icon from the sprite in index.html */
function icon(name, className = "icon") {
  const template = document.createElement("template");
  template.innerHTML = `<svg class="${className}" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`;
  return template.content.firstElementChild;
}

/** Wrap a function so one failing feature never stops the others from starting */
function safely(fn) {
  try { fn(); } catch (error) { console.error(`[${fn.name}]`, error); }
}

/* ---------- Derived values (computed once from CONFIG) ---------- */
function formatTime(hhmm) {
  const [hours, minutes] = hhmm.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

function toISODate(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

const addressShort = `${CONFIG.address.line1}, ${CONFIG.address.city}`;
const addressFull = [CONFIG.address.line1, CONFIG.address.city, CONFIG.address.region, CONFIG.address.postalCode]
  .filter(Boolean).join(", ");

const hoursLine = (() => {
  const { opensAt, closesAt, days } = CONFIG.hours;
  const range = closesAt ? `${formatTime(opensAt)} – ${formatTime(closesAt)}` : `Opens ${formatTime(opensAt)}`;
  return days ? `${days}: ${range}` : range;
})();

const mapsQueryEncoded = encodeURIComponent(CONFIG.mapsQuery);
const URLS = {
  directions: `https://www.google.com/maps/dir/?api=1&destination=${mapsQueryEncoded}`,
  listing: `https://www.google.com/maps/search/?api=1&query=${mapsQueryEncoded}`,
  mapEmbed: `https://www.google.com/maps?q=${mapsQueryEncoded}&output=embed`,
};

/** Build a wa.me link. The number must be digits only. */
function whatsappLink(message) {
  const number = CONFIG.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

const GENERAL_MESSAGE = `Hello ${CONFIG.name}! I found your website and have a question.`;

/* ---------- 1. Fill text and links from CONFIG ---------- */
function initBindings() {
  const text = {
    name: CONFIG.name,
    nepaliName: CONFIG.nepaliName,
    tagline: CONFIG.tagline,
    phone: CONFIG.phoneDisplay,
    email: CONFIG.email,
    addressShort,
    addressFull,
    hoursLine,
    hoursNote: CONFIG.hours.note,
    ratingLine: `${CONFIG.rating.score} on Google (${CONFIG.rating.count} reviews)`,
  };

  const links = {
    tel: `tel:${CONFIG.phoneTel}`,
    whatsapp: whatsappLink(GENERAL_MESSAGE),
    mailto: CONFIG.email ? `mailto:${CONFIG.email}` : "",
    directions: URLS.directions,
    reviews: URLS.listing,
  };

  $$("[data-text]").forEach((el) => {
    const value = text[el.dataset.text] || "";
    el.textContent = value;
    const optional = el.closest("[data-optional]");
    if (optional) optional.hidden = !value;
  });

  $$("[data-href]").forEach((el) => {
    const value = links[el.dataset.href];
    if (value) el.setAttribute("href", value);
  });

  $$("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });

  // Anything that only makes sense with JavaScript is revealed now
  $$("[data-needs-js]").forEach((el) => { el.hidden = false; });
}

/* ---------- 2. Social links ---------- */
function initSocial() {
  const labels = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok" };
  const entries = Object.entries(CONFIG.social).filter(([, url]) => url);

  $$("[data-social]").forEach((list) => {
    list.replaceChildren(
      ...entries.map(([key, url]) =>
        h("li", {}, h("a", { href: url, target: "_blank", rel: "noopener noreferrer", "aria-label": labels[key] || key }, icon(key in labels ? key : "link"))))
    );
  });
}

/* ---------- 3. Navigation ---------- */
function initNav() {
  const header = $("#site-header");
  const toggle = $("#nav-toggle");
  const panel = $("#nav-panel");
  const desktop = window.matchMedia("(min-width: 880px)");

  const setOpen = (open) => {
    panel.dataset.open = String(open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    toggle.firstElementChild.firstElementChild.setAttribute("href", open ? "#i-close" : "#i-menu");
  };
  const isOpen = () => panel.dataset.open === "true";

  toggle.addEventListener("click", () => setOpen(!isOpen()));
  panel.addEventListener("click", (event) => { if (event.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) { setOpen(false); toggle.focus(); }
  });
  document.addEventListener("click", (event) => {
    if (isOpen() && !header.contains(event.target)) setOpen(false);
  });
  desktop.addEventListener("change", () => setOpen(false));
  setOpen(false);

  // Shadow under the header once the page has scrolled, and the active link
  const sections = $$("section[data-nav]");
  const links = $$("[data-nav-link]");
  let ticking = false;

  const update = () => {
    ticking = false;
    header.classList.toggle("is-scrolled", window.scrollY > 8);

    const line = header.offsetHeight + window.innerHeight * 0.25;
    let current = "";
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= line) current = section.dataset.nav;
    }
    links.forEach((link) => {
      if (link.dataset.navLink === current && current !== "") link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* ---------- 4. Menu (rendered from CONFIG.menuItems) ---------- */
let setMenuFilter = () => {};

function imageAttributes(path) {
  const hasExtension = /\.\w{3,4}$/.test(path);
  if (hasExtension) return { src: path };
  return { src: `${path}-480.webp`, srcset: `${path}-480.webp 480w, ${path}-720.webp 720w`, sizes: "(min-width: 820px) 120px, 100px" };
}

function formatPrice(price) {
  return typeof price === "number" ? `${CONFIG.currency} ${price}` : "";
}

function dishElement(item) {
  const price = formatPrice(item.price);
  return h("li", { class: "dish" },
    h("div", { class: "dish__img" },
      h("img", { ...imageAttributes(item.image), alt: item.alt || item.name, width: 240, height: 240, loading: "lazy", style: `object-position:${item.focus || "50% 50%"}` })),
    h("div", { class: "dish__body" },
      h("div", { class: "dish__top" },
        h("h3", { class: "dish__name", text: item.name }),
        price ? h("span", { class: "dish__price", text: price }) : null),
      h("p", { class: "dish__desc", text: item.description }),
      item.tag ? h("span", { class: "dish__tag", text: item.tag }) : null));
}

function initMenu() {
  const list = $("#menu-list");
  const filters = $("#menu-filters");
  const note = $("#menu-note");
  let active = "all";

  const render = (animate) => {
    const items = CONFIG.menuItems.filter((item) => active === "all" || item.category === active);
    list.replaceChildren(...items.map(dishElement));
    if (animate && !prefersReducedMotion) {
      list.classList.remove("is-swapping");
      void list.offsetWidth;            // restart the CSS animation
      list.classList.add("is-swapping");
    }
    $$(".chip", filters).forEach((chip) => chip.setAttribute("aria-pressed", String(chip.dataset.filter === active)));
  };

  const categories = [{ id: "all", label: "All" }, ...CONFIG.menuCategories];
  filters.replaceChildren(...categories.map((category) =>
    h("button", { class: "chip", type: "button", "data-filter": category.id, "aria-pressed": "false", text: category.label })));
  filters.addEventListener("click", (event) => {
    const chip = event.target.closest(".chip");
    if (chip) { active = chip.dataset.filter; render(true); }
  });

  // "See momo on the menu" buttons elsewhere on the page pre-select a category
  setMenuFilter = (id) => {
    if (id === active || !categories.some((category) => category.id === id)) return;
    active = id;
    render(true);
  };
  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-filter-link]");
    if (link) setMenuFilter(link.dataset.filterLink);
  });

  if (CONFIG.menuNote) {
    note.replaceChildren(
      document.createTextNode(`${CONFIG.menuNote} `),
      h("a", { href: whatsappLink(`Hello ${CONFIG.name}! Could you tell me today's menu and prices?`), target: "_blank", rel: "noopener noreferrer", text: "Ask on WhatsApp" }));
  } else {
    note.hidden = true;
  }

  render(false);
}

/* ---------- 5. Reviews ---------- */
function starsRow(score) {
  const percent = Math.max(0, Math.min(5, score)) / 5 * 100;
  const fiveStars = () => h("span", {}, ...Array.from({ length: 5 }, () => icon("star")));
  return h("span", { class: "stars", role: "img", "aria-label": `${score} out of 5 stars` },
    fiveStars(),
    h("span", { class: "stars__fill", style: `width:${percent}%`, "aria-hidden": "true" }, fiveStars()));
}

function initReviews() {
  $("#rating-score").textContent = CONFIG.rating.score.toFixed(1);
  $("#rating-stars").replaceWith(Object.assign(starsRow(CONFIG.rating.score), { id: "rating-stars" }));
  $("#rating-count").textContent = `${CONFIG.rating.count} reviews on Google Maps`;

  const list = $("#quotes");
  const note = $("#quotes-note");
  list.replaceChildren(...CONFIG.reviews.map((review) =>
    h("li", { "data-reveal": "" },
      h("figure", { class: "quote" },
        starsRow(review.rating),
        h("blockquote", { text: `\u201C${review.text}\u201D` }),
        h("figcaption", {},
          h("span", { text: review.name }),
          review.sample ? h("span", { class: "quote__badge", text: "Sample" }) : null)))));

  if (CONFIG.reviews.some((review) => review.sample)) {
    note.textContent = "The three quotes above are sample text showing how reviews will look. The rating is from Google Maps.";
    note.hidden = false;
  }
}

/* ---------- 6. Gallery lightbox ---------- */
function initLightbox() {
  const dialog = $("#lightbox");
  const anchors = $$("[data-lightbox]");
  if (!dialog || typeof dialog.showModal !== "function" || !anchors.length) return;  // links still open the image

  const image = $("#lb-img");
  const caption = $("#lb-caption");
  let index = 0;

  const show = (next) => {
    index = (next + anchors.length) % anchors.length;
    const anchor = anchors[index];
    const alt = $("img", anchor).alt;
    image.src = anchor.getAttribute("href");
    image.alt = alt;
    caption.textContent = `${alt} (${index + 1} of ${anchors.length})`;
  };

  const open = (next) => {
    show(next);
    if (!dialog.open) dialog.showModal();
    document.body.classList.add("is-locked");
  };
  const close = () => dialog.open && dialog.close();

  anchors.forEach((anchor, i) => anchor.addEventListener("click", (event) => { event.preventDefault(); open(i); }));

  dialog.addEventListener("click", (event) => {
    const action = event.target.closest("[data-lb]")?.dataset.lb;
    if (action === "close") close();
    else if (action === "prev") show(index - 1);
    else if (action === "next") show(index + 1);
    else if (event.target === dialog || event.target.classList.contains("lb__stage")) close();  // click outside the photo
  });
  dialog.addEventListener("close", () => document.body.classList.remove("is-locked"));
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") show(index - 1);
    if (event.key === "ArrowRight") show(index + 1);
  });

  // Swipe left / right on touch screens
  let startX = null;
  dialog.addEventListener("touchstart", (event) => { startX = event.changedTouches[0].clientX; }, { passive: true });
  dialog.addEventListener("touchend", (event) => {
    if (startX === null) return;
    const deltaX = event.changedTouches[0].clientX - startX;
    startX = null;
    if (Math.abs(deltaX) > 50) show(index + (deltaX < 0 ? 1 : -1));
  }, { passive: true });
}

/* ---------- 7. Reservation form (opens WhatsApp, no server involved) ---------- */
function validateReservation(values) {
  const errors = {};
  const { opensAt, closesAt } = CONFIG.hours;
  const { maxGuests, bookingWindowDays } = CONFIG.reservations;

  if (values.name.trim().length < 2) errors.name = "Please enter your name.";

  const phoneDigits = values.phone.replace(/\D/g, "");
  if (!/^[+()\d\s-]+$/.test(values.phone.trim()) || phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = "Enter a phone number we can reach, for example 98XXXXXXXX.";
  }

  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(values.date);
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let chosenDate = null;
  if (!dateMatch) {
    errors.date = "Choose a date.";
  } else {
    chosenDate = new Date(Number(dateMatch[1]), Number(dateMatch[2]) - 1, Number(dateMatch[3]));
    const lastDay = new Date(todayStart);
    lastDay.setDate(lastDay.getDate() + bookingWindowDays);
    if (chosenDate < todayStart) errors.date = "That date has passed. Choose today or a later day.";
    else if (chosenDate > lastDay) errors.date = `We can only take requests up to ${bookingWindowDays} days ahead.`;
  }

  if (!/^\d{2}:\d{2}$/.test(values.time)) {
    errors.time = "Choose a time.";
  } else if (values.time < opensAt) {
    errors.time = `We open at ${formatTime(opensAt)}. Choose a later time.`;
  } else if (closesAt && values.time > closesAt) {
    errors.time = `Please choose a time before ${formatTime(closesAt)}.`;
  } else if (chosenDate && chosenDate.getTime() === todayStart.getTime()) {
    const [hours, minutes] = values.time.split(":").map(Number);
    if (new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes) <= today) {
      errors.time = "That time has already passed today.";
    }
  }

  const guests = Number(values.guests);
  if (!Number.isInteger(guests) || guests < 1) errors.guests = "Enter at least 1 guest.";
  else if (guests > maxGuests) errors.guests = `For more than ${maxGuests} guests, please message us on WhatsApp.`;

  return errors;
}

function buildReservationMessage(values) {
  const lines = [
    `Hello ${CONFIG.name}! I'd like to request a table.`,
    "",
    `*Name:* ${values.name.trim()}`,
    `*Phone:* ${values.phone.trim()}`,
    `*Date:* ${formatDate(values.date)}`,
    `*Time:* ${formatTime(values.time)}`,
    `*Guests:* ${Number(values.guests)}`,
  ];
  if (values.notes.trim()) lines.push(`*Special requests:* ${values.notes.trim()}`);
  lines.push("", "Please let me know if this works. Thank you!");
  return lines.join("\n");
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try { await navigator.clipboard.writeText(text); return true; } catch { /* fall through */ }
  }
  const box = h("textarea", { "aria-hidden": "true", style: "position:fixed;opacity:0;top:0;left:0" });
  box.value = text;
  document.body.append(box);
  box.select();
  let copied = false;
  try { copied = document.execCommand("copy"); } catch { copied = false; }
  box.remove();
  return copied;
}

function initReservation() {
  const form = $("#reserve-form");
  const fields = {
    name: $("#rf-name"), phone: $("#rf-phone"), date: $("#rf-date"),
    time: $("#rf-time"), guests: $("#rf-guests"), notes: $("#rf-notes"),
  };
  const result = $("#reserve-result");
  const resultText = $("#reserve-result-text");
  const resultMessage = $("#reserve-msg");
  const openLink = $("#reserve-open");
  const copyButton = $("#reserve-copy");

  // Date and time limits come from CONFIG
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + CONFIG.reservations.bookingWindowDays);
  fields.date.min = toISODate(today);
  fields.date.max = toISODate(lastDay);
  fields.time.min = CONFIG.hours.opensAt;
  if (CONFIG.hours.closesAt) fields.time.max = CONFIG.hours.closesAt;
  fields.guests.max = CONFIG.reservations.maxGuests;

  const showError = (field, message) => {
    const input = fields[field];
    const holder = $(`#rf-${field}-err`);
    if (message) { input.setAttribute("aria-invalid", "true"); holder.textContent = message; }
    else { input.removeAttribute("aria-invalid"); holder.textContent = ""; }
  };

  const readValues = () => Object.fromEntries(Object.entries(fields).map(([key, input]) => [key, input.value]));

  // Guest stepper
  $$(".stepper__btn", form).forEach((button) => button.addEventListener("click", () => {
    const next = (Number(fields.guests.value) || 1) + Number(button.dataset.step);
    fields.guests.value = Math.min(CONFIG.reservations.maxGuests, Math.max(1, next));
    showError("guests", "");
  }));

  // Clear a field's error as soon as the person edits it
  ["name", "phone", "date", "time", "guests"].forEach((field) => {
    fields[field].addEventListener("input", () => showError(field, ""));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const values = readValues();
    const errors = validateReservation(values);
    ["name", "phone", "date", "time", "guests"].forEach((field) => showError(field, errors[field]));

    const firstInvalid = ["name", "phone", "date", "time", "guests"].find((field) => errors[field]);
    if (firstInvalid) { result.hidden = true; fields[firstInvalid].focus(); return; }

    const message = buildReservationMessage(values);
    const url = whatsappLink(message);

    resultMessage.textContent = message;
    openLink.href = url;
    copyButton.lastElementChild.textContent = "Copy message";

    // Opened straight from the click, so browsers allow it
    const opened = window.open(url, "_blank");
    if (opened) opened.opener = null;

    resultText.textContent = opened
      ? "WhatsApp should now be open with this message ready. Press send there. Your table is not reserved until the restaurant replies to confirm."
      : "WhatsApp did not open by itself. Use the button below to open it, or copy the message and send it to the restaurant. Your table is not reserved until the restaurant replies to confirm.";
    result.hidden = false;
    result.focus();
  });

  copyButton.addEventListener("click", async () => {
    const copied = await copyText(resultMessage.textContent);
    copyButton.lastElementChild.textContent = copied ? "Copied" : "Copy failed. Select the text above.";
  });
}

/* ---------- 8. Map ---------- */
function initMap() {
  const holder = $("#map");
  holder.replaceChildren(h("iframe", {
    src: URLS.mapEmbed,
    title: `Map showing ${CONFIG.name}`,
    loading: "lazy",
    referrerpolicy: "no-referrer-when-downgrade",
    allowfullscreen: "",
  }));
}

/* ---------- 9. Scroll reveal ---------- */
function initReveal() {
  const targets = $$("[data-reveal]");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  targets.forEach((el) => observer.observe(el));
}

/* ---------- 10. Back-to-top button ---------- */
function initBackToTop() {
  const button = $("#back-to-top");
  const toggle = () => button.classList.toggle("is-visible", window.scrollY > 700);
  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
}

/* ---------- 11. Structured data for search engines ---------- */
function initStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: CONFIG.name,
    servesCuisine: ["Momo", "Nepali street food"],
    priceRange: CONFIG.priceRange,
    telephone: CONFIG.phoneTel,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONFIG.address.line1,
      addressLocality: CONFIG.address.city,
      addressRegion: CONFIG.address.region,
      postalCode: CONFIG.address.postalCode,
      addressCountry: "NP",
    },
    hasMap: URLS.listing,
  };
  if (CONFIG.email) data.email = CONFIG.email;
  const sameAs = Object.values(CONFIG.social).filter(Boolean);
  if (sameAs.length) data.sameAs = sameAs;

  const script = h("script", { type: "application/ld+json" });
  script.textContent = JSON.stringify(data);
  document.head.append(script);
}

/* ---------- Start everything ---------- */
[
  initBindings, initSocial, initNav, initMenu, initReviews, initLightbox,
  initReservation, initMap, initReveal, initBackToTop, initStructuredData,
].forEach(safely);
