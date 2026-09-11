
const cfg = window.PUSH_CONFIG;
const logo = document.getElementById("logo");
const fallback = document.getElementById("fallback");
const button = document.getElementById("logoButton");
const statusEl = document.getElementById("status");

logo.addEventListener("error", () => {
  logo.style.display = "none";
  fallback.style.display = "block";
});

function toast(message) {
  statusEl.textContent = message;
  statusEl.classList.add("show");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

async function saveSubscription(subscription) {
  const payload = subscription.toJSON();
  const endpoint = payload.endpoint;
  const body = {
    endpoint,
    p256dh: payload.keys?.p256dh ?? "",
    auth: payload.keys?.auth ?? "",
    user_agent: navigator.userAgent,
    active: true,
    updated_at: new Date().toISOString()
  };

  const response = await fetch(`${cfg.supabaseUrl}/rest/v1/push_subscriptions?on_conflict=endpoint`, {
    method: "POST",
    headers: {
      "apikey": cfg.supabaseAnonKey,
      "Content-Type": "application/json",
      "Prefer": "resolution=merge-duplicates,return=minimal"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase ${response.status}: ${text}`);
  }
}

async function enablePush() {
  if (!("serviceWorker" in navigator)) {
    toast("שגיאה: Service Worker לא נתמך");
    return;
  }
  if (!("PushManager" in window)) {
    toast("שגיאה: Push לא נתמך בדפדפן");
    return;
  }

  try {
    toast("1/4 רושם Service Worker...");
    const registration = await navigator.serviceWorker.register("./sw.js");
    await navigator.serviceWorker.ready;

    toast("2/4 מבקש הרשאת התראות...");
    let permission = Notification.permission;
    if (permission === "default") {
      permission = await Notification.requestPermission();
    }

    if (permission !== "granted") {
      toast("שגיאה: לא אושרה הרשאת התראות");
      return;
    }

    toast("3/4 יוצר רישום Push...");
    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(cfg.vapidPublicKey)
      });
    }

    toast("4/4 שומר ב-Supabase...");
    await saveSubscription(subscription);

    toast("✓ ההתראות הופעלו ונשמרו");
  } catch (err) {
    console.error("Push activation failed:", err);
    const msg = (err && err.message) ? err.message : String(err);
    toast("שגיאה: " + msg.slice(0, 110));
  }
}

button.addEventListener("click", enablePush);

// Register the service worker quietly on load.
// The notification permission itself is requested only after the user taps the logo.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(console.error);
}
