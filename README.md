# Guccha Mo:Mo website

A static, single-page website for Guccha Mo:Mo (momo restaurant, Chandraman Maskey Marg, Kathmandu).
No backend, no database, no build step. Just HTML, CSS and JavaScript.

```
guccha-momo/
├── index.html      page structure and wording
├── style.css       design (colours and fonts are variables at the top)
├── script.js       CONFIG block at the top: details, hours, WhatsApp, menu, reviews
└── assets/
    ├── favicon.svg
    └── img/        photos (WebP) and the social-share image
```

## 1. How to run it

- **Quickest:** double-click `index.html`. Everything works except the Google Map, which needs an internet connection.
- **Like a real site (recommended for testing):** in this folder run `python3 -m http.server 8000`, then open `http://localhost:8000`. On Android you can do the same in Termux.

Fonts (Google Fonts) and the map need internet. If the fonts fail to load, the site falls back to system fonts.

## 2. Change the restaurant details

Open `script.js`. The first block, `CONFIG`, holds everything: name, phone, WhatsApp number, email, address, opening hours, social links, rating, menu and reviews. The page fills itself from it, so you do not need to touch the HTML for these.

Lines marked `⚠ CONFIRM` were **not** on the Google Maps listing this site was built from. Check each with the restaurant:

| Item | What is there now |
|---|---|
| WhatsApp number | The listing's phone number (984-1614918). Confirm it has WhatsApp. |
| Closing time and open days | Empty, so only "Opens 2:30 PM" is shown. |
| Email | Empty, so it is hidden. |
| Social links | Empty, so no icons are shown. |
| Menu names and descriptions | Written from the photos. No prices. |
| Reviews | Three sample quotes, clearly labelled "Sample". |

Copy that is not in `CONFIG` (the headline, the About text, the two feature dishes) lives in `index.html`. Search for the words you want to change. The page title and description for Google are in the `<head>` of `index.html`.

## 3. Update menu items and prices

In `script.js`, find `menuItems`. Each dish is one block:

```js
{
  id: "jhol-momo",
  category: "momo",            // must match an id in menuCategories
  name: "Jhol Momo",
  description: "Steamed momo sitting in a warm, golden jhol.",
  price: 180,                  // a number shows "Rs 180"; null shows no price
  tag: "Signature",            // small label; "" for none
  image: "assets/img/jhol-momo",
  alt: "Momo in a foil bowl with golden jhol",
  focus: "50% 45%",            // where the square thumbnail is cropped
}
```

- Add a dish: copy a block, change the values, add a comma between blocks.
- Remove a dish: delete its block.
- Add a category: add `{ id: "drinks", label: "Drinks" }` to `menuCategories`, then use `category: "drinks"` on dishes.
- The note under the menu is `menuNote`. Set it to `""` to hide it.

## 4. Change images

All photos are in `assets/img/`. Each dish photo exists in two sizes: `name-480.webp` (phones, thumbnails) and `name-720.webp` (larger screens and the gallery viewer).

- **Swap a photo:** make a 480 px wide and a 720 px wide WebP with the same base name and replace both files. (Squoosh.app does this in a browser.)
- **Use a different file for a dish:** set `image` in `script.js` to a full file name such as `"assets/img/my-photo.jpg"`. One file is then used at all sizes.
- **Gallery:** edit the `<ul class="gallery__grid">` list in `index.html`. Keep `width` and `height` equal to the real image size so the page does not jump while loading.
- **Hero circles:** `hero-bowl.webp` and `hero-skewers.webp` are square crops. Replace them with square images.
- **Social preview:** replace `assets/img/og-image.jpg` with a 1200 x 630 image.

## 5. Set up WhatsApp reservations

1. In `script.js`, set `whatsappNumber`: country code plus number, digits only, no `+` or spaces. Nepal example: `9779841614918`.
2. Set `hours.opensAt` (and `closesAt` when known). The form rejects times outside these.
3. Adjust `reservations.maxGuests` and `bookingWindowDays` if needed.

How it works: the visitor fills in the form, the page checks it, then opens `https://wa.me/<number>?text=...` with the details already typed. Nothing is stored or sent by the website. The visitor has to press send in WhatsApp, and the page says clearly that the table is **not reserved until the restaurant replies**. If WhatsApp does not open, the page shows an "Open WhatsApp" button and a "Copy message" button.

Test it once with your own phone before launch, and answer the first few requests promptly.

## 6. Colours and fonts

At the top of `style.css`, the `:root` block holds the colours (`--jhol`, `--dough`, `--walnut`, `--chili`, `--foil`) and fonts. Change them there and the whole site follows.

## 7. Deploy

All three options below are free and need no server.

**GitHub Pages:** create a repository, upload the contents of this folder (so `index.html` is at the top level), then go to Settings > Pages, choose the `main` branch and the `/ (root)` folder, and save. The site appears at `https://<username>.github.io/<repository>/`.

**Cloudflare Pages:** Workers & Pages > Create > Pages > Upload assets. Drag in this folder, name the project, deploy. Build command and output directory are left empty.

**Netlify:** open app.netlify.com/drop and drag the folder in.

**Normal web hosting (cPanel, vPanel and similar):** upload the contents of the folder into the public folder (often `htdocs` or `public_html`) so `index.html` sits directly inside it.

After deploying: open `assets/img/og-image.jpg` on your live address, then set `og:image` in the `<head>` of `index.html` to that full address so link previews show the photo.

## 8. Before you show it to the owner

- [ ] Confirm the WhatsApp number, closing time and open days
- [ ] Replace sample reviews, or set `reviews: []` to hide them
- [ ] Add real prices and check dish names against the real menu
- [ ] Add social links and an email if they have them
- [ ] Send yourself a test reservation request
- [ ] Open the site on a phone and scroll through every section
