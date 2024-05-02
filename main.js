import { Juego, getData } from './utils.js';

var swiper = new Swiper(".mySwiper", {
    pagination: {
        el: ".swiper-pagination",
    },
});

const displayCards = (juegos) => {
    const list = document.querySelector('.list-items');

    for (const juego of juegos) {
        const juegoInstance = new Juego(juego.id, juego.descripcion, juego.estudio, juego.titulo, juego.imagen);
        const card = juegoInstance.renderGameCard(); 
        list.appendChild(card);
    }
};

const displayForYou = (juegos) => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    for (let i = 0; i < 3; i++) {
        const rand = Math.floor(Math.random() * juegos.length);
        const selection = juegos[rand];
        const juegoInstance = new Juego(selection.id, selection.descripcion, selection.estudio, selection.titulo, selection.imagen);
        const card = juegoInstance.renderGameCard();

        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');

        slide.appendChild(card);
        swiperWrapper.appendChild(slide);
    }
}

const render = async () => {
    const juegos = await getData();
    
    displayCards(juegos);
    displayForYou(juegos);
};

document.addEventListener('DOMContentLoaded', render);