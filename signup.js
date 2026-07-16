import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

    const signupForm = document.getElementById("signupForm");
    const message = document.getElementById("message");

    signupForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {

            await createUserWithEmailAndPassword(auth, email, password);

            message.style.color = "green";
            message.textContent = "Account created successfully!";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);

        } catch (error) {

            message.style.color = "red";
            message.textContent = error.message;

        }

    });

});