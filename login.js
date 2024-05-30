import { login, obtenerUsuarioEnSesion, logout } from "./session.js";

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
  console.log("Usuario en sesión:", usuarioEnSesion);
  // Aquí puedes agregar lógica para mostrar información del usuario en la página
} else {
  console.log("No hay usuario en sesión");
}
const loginButton = document.getElementById("form__log");
loginButton.addEventListener("click", () => {
  logout();
  window.location.href = "index.html";
});
