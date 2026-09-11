PUSH TEST V1
============

Files:
- index.html
- app.js
- sw.js
- manifest.webmanifest
- config.js
- supabase.sql
- logo.png  <-- add the official Chamber logo with this exact filename

What happens:
1. Open the page on the phone.
2. Tap the Chamber logo.
3. Browser asks for notification permission.
4. If approved, a Web Push subscription is created.
5. The subscription is saved to Supabase table push_subscriptions.

Supabase:
Run supabase.sql once in the project's SQL Editor.

VAPID:
Public key already placed in config.js:
BPp3LI5LmuizQudfY3WvCyX32KPWKn3UDZNHNDCjzGYFLQHBQ2BNgNj-V4AI4vTL3isEB-YdCJ5Tsq9Zjwsk5Po

PRIVATE VAPID KEY - KEEP SERVER-SIDE ONLY:
LLq2ZekOY4BYRTgkowUKzfkPgGGSMF08Zi9Vs4Fgy7M

Do NOT put the private VAPID key in index.html/app.js/config.js or GitHub Pages.
We will store it as a server/Edge Function secret in the sending stage.

Hosting:
Must be HTTPS. GitHub Pages is suitable.

iPhone:
For Web Push on iPhone/iPad, install the site to the Home Screen first and then tap the logo to enable notifications.

V1.1 FIX
========
- Removed incorrect Authorization: Bearer <sb_publishable...> header.
- Added Supabase PostgreSQL grants patch.
- Added detailed 1/4 -> 4/4 activation diagnostics on the phone.
