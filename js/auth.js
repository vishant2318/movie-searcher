import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const protectedPages = [
    "watchlist.html",
    "profile.html"
];

const currentPage = window.location.pathname.split("/").pop();

if (protectedPages.includes(currentPage)) {

    onAuthStateChanged(auth, (user) => {

        if (!user) {
            window.location.href = "login.html";
        } else {
            const userEmail = document.getElementById("userEmail");
            if (userEmail) {
                userEmail.textContent = user.email;
            }
        }

    });

}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        try {

            await signOut(auth);
            window.location.href = "login.html";

        } catch (error) {

            alert(error.message);

        }

    });

}