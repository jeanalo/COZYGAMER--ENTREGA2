const USUARIOS_KEY = "usuarios";
const USUARIO_ACTIVO_KEY = "usuario-activo";

const obtenerUsuarios = () => {
    const usuarios = localStorage.getItem(USUARIOS_KEY);

    if(!usuarios){
        return []
    }

    return JSON.parse(usuarios); 

};

export const registrar = (correo, contrasena, confirmarContrasena) => {
    if(contrasena !== confirmarContrasena) {
        throw new Error("Las contrasenas no coinciden");
    }
    const usuarios = obtenerUsuarios()
    
    for(const usuario of usuarios) {
        if(usuario.correo === correo) {
            throw new Error("El correo ya se encuentra registado");
        }
    }

        usuarios.push({
            id: new Date().getTime(),
            correo: correo,
            contrasena: contrasena,
            favoritos: [],
            // dentro de favoritos ira el id de los favoritos, solo el ID
            
        });

        localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
};

export const login = (correo, contrasena) => {

    const usuarios = obtenerUsuarios();
    for(const usuario of usuarios) {
        if(usuario.correo === correo && usuario.contrasena === contrasena) {
            localStorage.setItem(USUARIO_ACTIVO_KEY, usuario.id);
            return usuario
        }
    }

    throw new Error ("Usuario y/o contrasena incorrectos");
};

export const obtenerUsuarioEnSesion = () => {
    const usuarioActivo = localStorage.getItem(USUARIO_ACTIVO_KEY);

    if(!usuarioActivo) {
        return null
    }
    
    const usuarios = obtenerUsuarios();
    for (const usuario of usuarios) {
        	if (usuario.id === parseInt(usuarioActivo)) {
                return usuario;
            }

    }
    return null
}

export const logout = () => {
localStorage.removeItem(USUARIO_ACTIVO_KEY)
};