import { Juego, getJuegoById } from './utils.js';
import { obtenerUsuarioEnSesion } from './session.js';

const render = async () => {
    if (!obtenerUsuarioEnSesion()) {
        window.location.href = 'index.html';
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const juego = await getJuegoById(id);
    const juegoInstance = new Juego(juego.id, juego.descripcion, juego.estudio, juego.titulo, juego.imagen, juego.link);

    const frame = document.querySelector('.main-frame');

    const gameInfo = juegoInstance.renderGameDetails();
    const actions = juegoInstance.renderActionButtons();

    frame.appendChild(gameInfo);
    frame.appendChild(actions);
}

document.addEventListener('DOMContentLoaded', render);