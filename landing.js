import { obtenerUsuarioEnSesion, logout } from "./session.js";

const render = () => {
    const usuarioActivo = obtenerUsuarioEnSesion();

    if(usuarioActivo) {
        window.location.href = "/main.html";
    }
};

document.addEventListener("DOMContentLoaded", render);