/* ═══════════════════════════════════════
   auth.js — shared Firebase Auth helpers
   Imported by login.html and dashboard.html
═══════════════════════════════════════ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

import { firebaseConfig } from "../config/firebase-config.js";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function signUp(name, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => updateProfile(cred.user, { displayName: name }).then(() => cred));
}

export function logIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logOut() {
  return signOut(auth);
}

export function watchAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

// Human-readable messages for common Firebase Auth error codes
export function friendlyAuthError(error) {
  const map = {
    "auth/email-already-in-use": "That email is already registered — try logging in instead.",
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/too-many-requests": "Too many attempts — please wait a moment and try again."
  };
  return map[error.code] || "Something went wrong. Please try again.";
}
