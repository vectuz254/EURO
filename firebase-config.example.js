/* ═══════════════════════════════════════
   FIREBASE CONFIG — TEMPLATE
   ───────────────────────────────────────
   1. Copy this file and rename the copy to "firebase-config.js"
      (same folder). That filename is already in .gitignore so
      your real keys never get committed to GitHub.
   2. Go to Firebase Console → Project Settings → General →
      "Your apps" → Web app → copy the config object it gives you.
   3. Paste the values below, replacing the placeholders.
   4. In Firebase Console → Authentication → Sign-in method,
      enable "Email/Password".
═══════════════════════════════════════ */

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
