# SARA Sanctuary Website

Static site for [Society for Animal Rescue & Adoption](https://www.sarasanctuary.org). Built with [Eleventy](https://www.11ty.dev/), content managed through [Decap CMS](https://decapcms.org), hosted free on Netlify.

**Stack:** Eleventy + Nunjucks + Decap CMS + Netlify + GitHub
**Cost:** $0/month (Netlify free tier + GitHub free)
**Who edits content:** Tracy (shared account), via `/admin/`
**Who maintains the site:** Tucker (this repo)

---

## Quick start (local dev)

```bash
# one-time
npm install

# run the dev server with hot reload
npm run dev
# → http://localhost:8080

# production build
npm run build
# → outputs to _site/
```

---

## Repo layout

```
.
├── .eleventy.js              # Eleventy config, filters, collections
├── netlify.toml              # Build, headers, redirects
├── package.json
├── admin/                    # Decap CMS — copied as-is into _site/admin/
│   ├── index.html
│   └── config.yml
├── src/
│   ├── _data/
│   │   └── site.js           # Global site data (name, address, emails, links)
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk      # Shared HTML shell
│   │   │   └── post.njk      # Blog post layout
│   │   └── partials/
│   │       ├── nav.njk       # Top nav
│   │       └── footer.njk    # Footer
│   ├── posts/                # News posts (markdown, managed in CMS)
│   ├── events/               # Upcoming events (markdown, managed in CMS)
│   ├── tributes/             # Tribute cards (markdown, managed in CMS)
│   ├── index.njk             # Homepage
│   ├── about.njk             # Our Story
│   ├── adopt.njk             # Adopt & Foster
│   ├── sponsor.njk           # Sponsor an Animal
│   ├── give.njk              # Ways to Give
│   ├── visit.njk             # Book a Stay
│   ├── news.njk              # News & Events index
│   ├── tributes.njk          # Tributes index
│   ├── contact.njk           # Contact
│   └── styles.css            # Design system
└── _site/                    # Build output (gitignored)
```

---

## Content collections

Three collections are managed in the CMS, each a folder of markdown files.

| Collection | Folder         | URL                     | Generates individual pages? |
|------------|----------------|-------------------------|-----------------------------|
| Posts      | `src/posts/`   | `/news/<slug>/`         | Yes — uses `post.njk`       |
| Events     | `src/events/`  | (list only on `/news/`) | No                          |
| Tributes   | `src/tributes/`| (list only on `/tributes/`) | No                       |

All three are sorted and displayed by the relevant listing page.

---

## Deploy to Netlify

### 1. Push this repo to GitHub

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin git@github.com:<your-org>/sara-sanctuary.git
git push -u origin main
```

### 2. Connect to Netlify

1. [app.netlify.com](https://app.netlify.com) → **Add new site → Import from GitHub**
2. Pick the repo.
3. Netlify should auto-detect the `netlify.toml` settings. Build command: `npm run build`. Publish directory: `_site`.
4. Hit **Deploy**.
5. Point your domain (`sarasanctuary.org`) at the Netlify site. Netlify will issue a free Let's Encrypt cert.

### 3. Enable Netlify Identity + Git Gateway (for Tracy to log in)

This is the auth layer for Decap CMS. Without it, `/admin/` won't work.

1. In the Netlify dashboard for the site → **Integrations → Identity** → **Enable Identity**.
2. Under Identity settings:
   - **Registration preferences**: set to **Invite only** (don't leave it open).
   - **External providers**: leave off unless you want Google login (see note below).
3. Under **Services → Git Gateway** → **Enable Git Gateway**.
4. Go to **Identity → Invite users**. Invite **one** shared email (e.g. `editors@sarasanctuary.org` or similar).
5. Tracy accepts the invite, sets a password, and logs in at `/admin/`.

**Why a shared account:** Netlify Identity's free tier only covers 1 active user. A shared mailbox/account avoids the paid tier. Trade-off is audit trail — all commits will show the same identity. Acceptable for a single-editor workflow; reconsider if you add editors.

### 4. Verify

- Public site: `https://sarasanctuary.org/` should load.
- Admin: `https://sarasanctuary.org/admin/` should show the Decap login.
- After login, Tracy should see three collections: Posts, Events, Tributes.
- Any edit she makes commits back to `main` via Git Gateway. Netlify redeploys automatically on push.

---

## Editing content

### For Tracy (non-technical)

1. Go to `https://sarasanctuary.org/admin/`
2. Log in with the shared editor account.
3. Pick **News Posts**, **Events**, or **Tributes** in the sidebar.
4. Click **New <whatever>** or edit an existing entry.
5. Hit **Publish**. The site rebuilds automatically (takes ~1 min).

### For Tucker (direct repo edits)

Anything in `src/_data/`, layouts, partials, or pages is edited in the repo like normal. Push to `main`, Netlify rebuilds.

Tracy should **not** edit layout, CSS, or `_data/site.js` from the CMS — those are fenced to a read-only note.

---

## Forms

Two Netlify-backed forms are live:

- **Newsletter signup** (`/`, `/news/`) — form name `newsletter`
- **Contact form** (`/contact/`) — form name `contact`

Submissions show up in Netlify dashboard → **Forms**. Free tier allows 100 submissions/month; bump to Pro if we outgrow it.

---

## Design system

Defined in `src/styles.css`. Key variables at the top:

- **Forest green** `--forest: #2F4F3E`
- **Rust/terracotta** `--rust: #C9623F`
- **Cream** `--cream: #FAF6EC`
- **Display font** Fraunces (Google Fonts)
- **Body font** Inter (Google Fonts)

---

## Adding a new top-level page

1. Create `src/newpage.njk`:

   ```njk
   ---
   layout: layouts/base.njk
   title: New Page
   description: SEO description.
   permalink: /newpage/
   ---

   <header class="page-head">
     <div class="container">
       <h1>New page</h1>
     </div>
   </header>
   ```

2. Optional: add to nav in `src/_includes/partials/nav.njk`.
3. Push to `main`.

---

## Backups

Everything is in git. That's the backup. GitHub keeps history, Netlify keeps deploys for 30 days. If Tracy deletes something, revert the commit.

---

## Ownership & contacts

- **Site/repo:** Tucker
- **Content:** Tracy
- **Domain/DNS:** (your registrar)
- **Netlify account:** (shared ops email)

## License

All content © Society for Animal Rescue & Adoption. Site code © Tucker / SARA.
