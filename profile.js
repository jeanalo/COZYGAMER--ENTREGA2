import { logout, obtenerUsuarioEnSesion, modificarUsuario } from "./session.js";

const actualizarDataDisplay = (user) => {
    const displayName = document.querySelector('.leftside__user-handler');
    const displayFavorites = document.getElementById('favoritesNumber');
    const dateJoined = document.getElementById('dateJoined');
    
    displayName.textContent = `${user.name} ${user.lastName}`;
    displayFavorites.textContent = 'Favorites: ' + user.favoritos.length;
    
    // OPCIONES PARA IMPRESION DE LA FECHA DE REGISTRO GUARDADO EN EL ID DEL USUARIO ACTIVO
    const options = {
        year: "numeric",
        month: "long",
    };
    
    dateJoined.textContent = 'Joined on ' + (new Date(user.id)).toLocaleString("en-US", options);
};

const render = async () => {
    
    // Se carga la info del usuario activo por primera vez
    const usuarioActivo = obtenerUsuarioEnSesion();    
    actualizarDataDisplay(usuarioActivo);
    
    const changeDataForm = document.querySelector('.information');
    changeDataForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const usuarioActivo = obtenerUsuarioEnSesion();

        const firtName = e.target['user-fname'].value ? e.target['user-fname'].value : usuarioActivo.name;
        const lastName = e.target['user-lname'].value  ? e.target['user-lname'].value : usuarioActivo.lastName;
        const email = e.target['user-email'].value ? e.target['user-email'].value : usuarioActivo.email;
        
        // Logica para el cambio de password
        let userPassword;
        if((e.target['user-password'].value === e.target['user-confirm-password'].value) && e.target['user-password'].value){
            userPassword = e.target['user-password'].value;
        } else {
            userPassword = usuarioActivo.password;
            if(e.target['user-password'].value !== e.target['user-confirm-password'].value){
                alert('Las contraseñas no coinciden');
            }
        }
        
        const user = {
            id: usuarioActivo.id,
            name: firtName,
            lastName: lastName,
            email: email,
            password: userPassword,
            favoritos: usuarioActivo.favoritos,
        };

        // Se actualiza la informacion del usuario activo
        modificarUsuario(user);
        actualizarDataDisplay(user);
    });
    
    const logoutBtn = document.getElementById('button__logout');
    logoutBtn.addEventListener('click', ()=>{
        logout();
        window.location.href = 'index.html';
    });
};
document.addEventListener("DOMContentLoaded", render);