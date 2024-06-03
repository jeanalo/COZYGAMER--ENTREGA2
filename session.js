const USUARIOS_KEY = "usuarios";
const USUARIO_ACTIVO_KEY = "usuario-activo";
export const usuarioRegistrado = JSON.parse(localStorage.getItem(USUARIOS_KEY)) || [];
export const obtenerUsuarios = () => {
    const usuarios = localStorage.getItem(USUARIOS_KEY);
    if (!usuarios) {
        return [];
    }
    return JSON.parse(usuarios);
};

export const registrarUsuario = (event) => {
    event.preventDefault();

    const userName = document.getElementById('nombre');
    const userLastName = document.getElementById('apellido');
    const userEmail = document.getElementById('email');
    const userPassword = document.getElementById('contrasena');

        const usuarioNuevo = {
        id: new Date().getTime(),
        name: userName.value,
        lastName: userLastName.value,
        email: userEmail.value,
        password: userPassword.value,
        favoritos: [],
    };

    if (
        userName.value === '' || userLastName.value === '' || userEmail.value === '' || userPassword.value === ''
    ) {
        alert('Por favor, llena los campos');
    } else if (usuarioRegistrado.find(user => user.email === userEmail.value)) {
        alert('El usuario ya se encuentra registrado');
    } else {
        usuarioRegistrado.push(usuarioNuevo);
        localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarioRegistrado));
        window.location.href = 'login.html';
    }
};

export const modificarUsuario = (modifiedUser) => {
    const usuarios = obtenerUsuarios();
    for(const usuario of usuarios){
        if(usuario.id === modifiedUser.id){
            usuario.name = modifiedUser.name;
            usuario.lastName = modifiedUser.lastName;
            usuario.email = modifiedUser.email;
            usuario.password = modifiedUser.password;
            usuario.favoritos = modifiedUser.favoritos;
            localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
        }
    }
};

export const login = (correo, contrasena) => {
    const usuarios = obtenerUsuarios();
    for (const usuario of usuarios) {
        if (usuario.email === correo && usuario.password === contrasena) {
            localStorage.setItem(USUARIO_ACTIVO_KEY, usuario.id);
            return usuario;
        }
    }
    throw new Error("Usuario y/o contraseña incorrectos");
};

export const obtenerUsuarioEnSesion = () => {
    const usuarioActivo = localStorage.getItem(USUARIO_ACTIVO_KEY);
    if (!usuarioActivo) {
        return null;
    }
    const usuarios = obtenerUsuarios();
    for (const usuario of usuarios) {
        if (usuario.id === parseInt(usuarioActivo)) {
            return usuario;
        }
    }
    return null;
};

export const obtenerFavoritosUsuario = () => {
    const usuario = obtenerUsuarioEnSesion();
    if (!usuario) {
        return [];
    }
    return usuario.favoritos;
};

export const logout = () => {
    localStorage.removeItem(USUARIO_ACTIVO_KEY);
};
