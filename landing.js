import { obtenerUsuarioEnSesion, logout } from "./session.js";

document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivoElement = document.getElementById("usuarioActivo");
    const cerrarSesionButton = document.getElementById("cerrarSesion");

    const usuarioEnSesion = obtenerUsuarioEnSesion();
    if (usuarioEnSesion) {
        usuarioActivoElement.textContent = `Bienvenido, ${usuarioEnSesion.name} ${usuarioEnSesion.lastName}`;
        cerrarSesionButton.style.display = "block"; // Mostrar botón de cerrar sesión si hay un usuario en sesión
    } else {
        usuarioActivoElement.textContent = "Bienvenido a CozyGamer DB";
        cerrarSesionButton.style.display = "none"; // Ocultar botón de cerrar sesión si no hay usuario en sesión
    }

    cerrarSesionButton.addEventListener("click", () => {
        logout();
        window.location.href = "index.html";
    });
});
