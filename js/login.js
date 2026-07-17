import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");
    const message = document.getElementById("message");

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {

            await signInWithEmailAndPassword(auth, email, password);

            message.style.color = "green";
            message.textContent = "Login Successful!";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);

        } catch (error) {

            message.style.color = "red";
            message.textContent = error.message;

        }

    });

});