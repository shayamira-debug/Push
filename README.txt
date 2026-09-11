PUSH TEST V1.2
==============

Files:
- index.html
- app.js
- sw.js
- manifest.webmanifest
- config.js
- supabase.sql
- supabase-permissions-patch.sql
- logo.png

What happens:
1. Open the page on the phone.
2. Tap the Chamber logo.
3. Browser asks for notification permission.
4. If approved, a Web Push subscription is created.
5. The subscription is saved to Supabase table push_subscriptions.

Supabase:
Run supabase.sql once in the project's SQL Editor.
Run supabase-permissions-patch.sql once if not already done.

VAPID PUBLIC KEY:
BJ_5dpzwyodIDjn5GLYPaTxZH6VAAMuCTQLEAj3tpOJlQR6oRcKyf7AKhPnrJ3_PTyaoh7f-RCuGBQ4WGZGK8Hs

IMPORTANT:
The VAPID PRIVATE KEY must NEVER be stored in this GitHub repository.
Keep it only as a server-side secret (for example, Supabase Edge Function secret).

Hosting:
Must be HTTPS. GitHub Pages is suitable.

iPhone:
Install the site to the Home Screen first, then open it from the Home Screen and tap the logo to enable notifications.

V1.2
====
- Rotated VAPID keys after accidental exposure of the old private key.
- Removed the private key from README.
- Keeps the V1.1 Supabase/API fixes and diagnostics.


V1.3
====
- Diagnostic status is now large and centered on screen.
- Status no longer disappears automatically.
- Easier to identify exactly which activation step fails.
