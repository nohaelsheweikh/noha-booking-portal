# Noha Booking Portal™

A fun joke booking site — because Noha is *notoriously* hard to get on the calendar.

Submit an official request, email her automatically, and save it to both calendars.

## Local development

```bash
npm install
cp .env.example .env
# Add your Web3Forms access key to .env
npm run dev
```

## Email notifications (required for auto-send)

When someone completes a booking, Noha gets an email at **nohaelsheweikh@gmail.com** with:

- Full booking details (guest, date, time, package)
- A **Google Calendar** one-click link
- A **.ics calendar invite** attachment — open it in Gmail to add to her calendar

### Setup (5 minutes)

1. Go to [web3forms.com](https://web3forms.com) and create a free account using **nohaelsheweikh@gmail.com**
2. Copy your **Access Key**
3. For local dev: paste it in `.env` as `VITE_WEB3FORMS_ACCESS_KEY`
4. For GitHub Pages: add a repo secret named `WEB3FORMS_ACCESS_KEY` with the same key
   - Repo → **Settings → Secrets and variables → Actions → New repository secret**

Redeploy after adding the secret. Bookings will email Noha automatically.

## Deploy to GitHub Pages

1. Create a GitHub repo named `noha-booking-portal` (must match the `base` in `vite.config.js`)
2. Push this code to the `main` branch
3. Add the `WEB3FORMS_ACCESS_KEY` secret (see above)
4. In repo **Settings → Pages**, set **Source** to **GitHub Actions**
5. Push to `main` — the workflow deploys automatically

Live URL: `https://<your-username>.github.io/noha-booking-portal/`

## Calendar integration

After requesting an appointment:

- **Noha gets emailed** with a calendar invite (if Web3Forms is configured)
- **Your calendar** — Google / Outlook / Apple buttons on the success page
- **Noha's calendar** — same buttons, or she uses the link from the email
- **Copy link for Noha** — send via WhatsApp if email isn't set up yet
