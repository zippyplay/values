// auth-check.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCtbDymdYFYSBjcR0NvAMt5HE-9AWDcf2U",
  authDomain: "zippyplay-auth.firebaseapp.com",
  projectId: "zippyplay-auth",
  storageBucket: "zippyplay-auth.firebasestorage.app",
  messagingSenderId: "545965083013",
  appId: "1:545965083013:web:82fe27fa7c3a80ac201cec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Function to check authentication status
export function checkAuth(redirectIfNotSignedIn = true) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (user.emailVerified) {
        console.log("User is signed in:", user.email);
        const userInfo = document.getElementById("user-info");
        if (userInfo) {
          userInfo.textContent = "Signed in as: " + user.email;
        }
      } else {
        console.log("User signed in but not verified");
        alert("⚠️ Please verify your email before continuing.");
        auth.signOut();
        window.location.href = "entry.html";
      }
    } else {
      console.log("No user signed in");
      if (redirectIfNotSignedIn) {
        window.location.href = "entry.html";
      }
    }
  });
}

// ✅ Export auth for use in other scripts (e.g. logout)
export { auth };

