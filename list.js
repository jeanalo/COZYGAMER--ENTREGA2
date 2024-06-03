import { Juego, getData } from './utils.js';
import { obtenerFavoritosUsuario, obtenerUsuarioEnSesion } from './session.js';

const render = async () => {
    if (!obtenerUsuarioEnSesion()) {
        window.location.href = 'index.html';
        return;
    }

    displayFavorites();
};

const displayFavorites = async () => {
    const juegos = await getData();
    const favoritos = obtenerFavoritosUsuario();
    const listItems = document.querySelector('.list-items');

    if (favoritos.length === 0) {
        const exploreList = document.querySelector('.explore__list');
        const empty = document.createElement('p');
        empty.textContent = 'Wow... such empty. Add some favorite games!';
        empty.classList.add('list-item__empty');
        exploreList.appendChild(empty);
        return;
    }

    favoritos.forEach(favorito => {
        const juegoData = juegos.find(juego => juego.id === favorito);
        const juego = new Juego(juegoData.id, juegoData.descripcion, juegoData.estudio, juegoData.titulo, juegoData.imagen, juegoData.link);
        const card = juego.renderGameCard();

        const listItem = document.createElement('li');
        listItem.classList.add('list-item__item');

        listItem.appendChild(card);
        listItems.appendChild(listItem);

        juego.addEventListeners();
    });
};

document.addEventListener('DOMContentLoaded', render);
