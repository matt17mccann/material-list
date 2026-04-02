# Cut List Pro — Deployment Guide

## What's in this folder
- `index.html` — The complete app
- `manifest.json` — PWA configuration (app name, icon, etc.)
- `sw.js` — Service worker for offline support
- `icon-192.png` — App icon (192×192)
- `icon-512.png` — App icon (512×512)

---

## How to Deploy (FREE — takes 5 minutes)

### Option A: Netlify (Easiest)
1. Go to **https://app.netlify.com/drop**
2. Drag and drop this entire folder onto the page
3. Done! You'll get a URL like `https://random-name.netlify.app`
4. (Optional) Sign up free to customize the URL

### Option B: Vercel
1. Go to **https://vercel.com** and sign up free
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel` in this folder
4. Follow the prompts — done!

### Option C: GitHub Pages (Free)
1. Create a GitHub account if you don't have one
2. Create a new repository
3. Upload all files from this folder
4. Go to Settings → Pages → Source: main branch
5. Your app will be at `https://yourusername.github.io/repo-name`

---

## How to Install on iPad

### For you:
1. Open the deployed URL in **Safari** on your iPad
2. Tap the **Share button** (square with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **Add**
5. The app now appears on your home screen with the Cut List Pro icon!

### For your coworkers:
Just text or email them the URL and have them follow the same steps above.

---

## How to Update the App
1. Edit the `index.html` file
2. Re-upload to Netlify (drag and drop again) or push to GitHub
3. Users will get the update next time they open the app
4. To force an update: change `cutlist-pro-v1` to `cutlist-pro-v2` in `sw.js`

---

## Features
- **Works offline** — Service worker caches the app for use on job sites with no signal
- **Save jobs** — Jobs are saved locally on each device
- **PDF export** — Generate and save PDF reports
- **Print** — Print reports directly from the app
- **Feels native** — Full-screen app with no browser chrome when added to home screen

---

## Customizing
- To change the app name: edit `manifest.json` and the title in `index.html`
- To add species options: search for `SPECIES` in `index.html` and add to the array
- To change formulas: search for `calcMaterials` in `index.html`
- To replace the icon: swap `icon-192.png` and `icon-512.png` with your own
