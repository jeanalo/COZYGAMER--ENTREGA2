import { obtenerUsuarioEnSesion, logout } from "./session.js";

const render = () => {
  const usuarioActivo = obtenerUsuarioEnSesion();

  if (!usuarioActivo) {
    window.location.href = "./index.html";
    // redireccionar al login cuando el usuario no ha ingresado, ES EL CODIFGO DE ARRIBA
  }

  const body = document.querySelector("#usuarioActivo");
  body.innerHTML = "Bienvenido " + usuarioActivo.correo;

  const cerrarSesion = document.querySelector("#cerrarSesion");
  cerrarSesion.addEventListener("click", () => {
    logout();
    window.location.href = "./index.html";
  });
};

document.addEventListener("DOMContentLoaded", render);
