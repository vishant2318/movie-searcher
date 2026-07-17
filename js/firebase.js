import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDH4e6yjXkcuOl7floEi15k9cLGTBVzEmU",
  authDomain: "movie-searcher-b6732.firebaseapp.com",
  projectId: "movie-searcher-b6732",
  storageBucket: "movie-searcher-b6732.firebasestorage.app",
  messagingSenderId: "453216719288",
  appId: "1:453216719288:web:a44e139d7f63bea9c0ff4d",
  measurementId: "G-MKBED3DJS1"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);