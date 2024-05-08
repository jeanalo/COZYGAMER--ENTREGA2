import { Juego, getData } from './utils.js';

const displayFavorites = async () => {
    const juegos = await getData();
    const listItems = document.querySelector('.list-items');

    for (let i = 0; i < 6; i++) {
        const rand = Math.floor(Math.random() * juegos.length);
        const selection = juegos[rand];
        const juegoInstance = new Juego(selection.id, selection.descripcion, selection.estudio, selection.titulo, selection.imagen, selection.link);
        const card = juegoInstance.renderGameCard();

        const listItem = document.createElement('li');
        listItem.classList.add('list-item__item');
        listItem.appendChild(card);
        listItems.appendChild(listItem);

        juegoInstance.addEventListeners();
    }
};

document.addEventListener('DOMContentLoaded', displayFavorites);
