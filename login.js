import { login, obtenerUsuarioEnSesion, logout } from "./session.js";

const render = () => {
    const formularioLogin = document.getElementById("login");
    const emailInput = document.getElementById("correo");
    const passwordInput = document.getElementById("contrasena");

    formularioLogin.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        try {
            const usuario = login(email, password);
            console.log("Usuario logueado:", usuario);
            window.location.href = "main.html";
        } catch (error) {
            alert(error.message);
            emailInput.value = "";
            passwordInput.value = "";
        }
    });

    const usuarioEnSesion = obtenerUsuarioEnSesion();
    if (usuarioEnSesion) {
        window.location.href = "main.html";
    }
};

document.addEventListener("DOMContentLoaded", render);
