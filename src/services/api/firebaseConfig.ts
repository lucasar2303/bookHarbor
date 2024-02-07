// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_GOOGLE_BOOKS_API_KEY,
    authDomain: "bookharbor.firebaseapp.com",
    projectId: "bookharbor",
    storageBucket: "bookharbor.appspot.com",
    messagingSenderId: "517485743716",
    appId: "1:517485743716:web:25f39e9b40893ecfab5971",
    measurementId: "G-7Z8995JXE3"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export { app, analytics, auth };
