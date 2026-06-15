# Nataka.inc — SEO Launch Checklist
## Do these steps AFTER you deploy the website. They are FREE and take about 1 hour total.

---

## ✅ DONE (already built into the website)

- [x] All page titles and descriptions contain "marketing agency Nairobi", "production company Kenya" etc.
- [x] Sitemap at /sitemap.xml — tells Google every page on your site
- [x] Robots.txt — tells Google it's allowed to index your site
- [x] JSON-LD structured data — LocalBusiness, Organization, FAQ, Services schemas
- [x] Geographic meta tags — tells Google you are in Nairobi, Kenya
- [x] Open Graph / Twitter cards — how your site looks when shared on social media
- [x] Keyword-rich alt text on all images
- [x] FAQ structured data — can appear in Google's "People also ask" boxes
- [x] Mobile-friendly and fast (Next.js)

---

## 🔲 YOU MUST DO THESE (free, ~1 hour)

### 1. Google Search Console — MOST IMPORTANT
**This tells Google your site exists. Without this, Google may not find you for months.**

1. Go to: https://search.google.com/search-console
2. Sign in with a Google account
3. Click "Add property" → enter your website URL
4. Google will give you a verification code
5. Open `app/layout.tsx`, find this line:
   ```
   // google: "your-verification-code",
   ```
   Replace with your actual code, e.g.:
   ```
   google: "abc123xyz",
   ```
6. After verifying, click **"Request Indexing"** for your homepage URL
7. Submit your sitemap: go to Sitemaps → enter `sitemap.xml`

---

### 2. Google Business Profile — CRITICAL FOR LOCAL SEARCH
**This is what makes you appear on Google Maps and "agencies near me" searches.**

1. Go to: https://business.google.com
2. Click "Manage now" and sign in
3. Search for "Nataka Inc" — if it exists, claim it. If not, create it.
4. Fill in EXACTLY:
   - Business name: **Nataka Inc**
   - Category: **Marketing Agency** (add secondary: Video Production Service, Advertising Agency)
   - Address: Westlands, Nairobi, Kenya
   - Phone: +254 725 107 294
   - Email: niajekoki@gmail.com
   - Website: your website URL
   - Hours: Monday–Friday 9am–6pm
5. Upload your best photos and videos
6. Write a description using these words: *"Nataka Inc is a media and marketing agency in Nairobi, Kenya offering video production, brand strategy, digital marketing, and PR for businesses across East Africa."*
7. Ask 5–10 clients to leave Google Reviews — this is the #1 ranking factor for local search

---

### 3. Bing Webmaster Tools (Microsoft/Bing search)
1. Go to: https://www.bing.com/webmasters
2. Sign in → Add your site
3. Submit your sitemap URL

---

### 4. Submit to these free directories (copy-paste your info)
Each listing is a "citation" — Google uses them to confirm you are a real business.

| Directory | Link |
|-----------|------|
| Yellow Pages Kenya | https://www.yellowpages.co.ke |
| BizKenya | https://www.bizkenya.com |
| Kenya Business Directory | https://www.kenyabusinessdirectory.co.ke |
| Hotfrog Kenya | https://www.hotfrog.co.ke |
| Yelp | https://www.yelp.com (search Nairobi) |

Use IDENTICAL name, address and phone everywhere:
- Name: **Nataka Inc**
- Phone: **+254 725 107 294**
- Email: **niajekoki@gmail.com**
- Address: **Westlands, Nairobi, Kenya**

---

### 5. Social media profiles (if you don't have them)
Create/update these with your website link in the bio — Google crawls them:

- Instagram: @natakainc → add website link
- LinkedIn: Create company page → add website
- Twitter/X: @natakainc → add website link
- YouTube: Create channel, upload your videos

---

### 6. Get backlinks (other websites linking to you)
This is what makes Google trust you. Aim for 10+ in the first 3 months.

- **Ask past clients** to mention Nataka Inc on their website with a link
- **Guest post** on marketing/business blogs in Kenya
- **Press release**: Write a short article about Nataka Inc, submit to:
  - https://www.businessdailyafrica.com (pitch a story)
  - https://www.techweez.com (Kenya tech/business site)
  - https://disrupt-africa.com
- **Chambers of commerce**: Join Kenya National Chamber of Commerce — they list members online

---

## 📊 How to track your rankings (free)

- **Google Search Console** (set up above): shows exactly which searches are finding you
- **Google Analytics**: Go to analytics.google.com → add your site → paste the tracking ID into your website
- **Ubersuggest** (free tier): https://neilpatel.com/ubersuggest → track your keyword rankings

---

## ⏱ When to expect results

| Timeframe | What happens |
|-----------|-------------|
| 1–2 weeks | Google indexes your site (shows up in search) |
| 1 month | You appear for your brand name "Nataka Inc" |
| 2–3 months | You appear for "marketing agency Nairobi" type searches |
| 6 months | Consistent top-10 rankings for local keywords with reviews + backlinks |

SEO is a long game — the work done today pays off over the next 6–12 months.
