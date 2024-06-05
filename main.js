import { Juego, getData } from './utils.js';
import { obtenerUsuarioEnSesion } from './session.js';

var swiper = new Swiper(".mySwiper", {
    pagination: {
        el: ".swiper-pagination",
    },
});

const displayCards = (juegos) => {
    const list = document.querySelector('.list-items');

    for (const juego of juegos) {
        const juegoInstance = new Juego(juego.id, juego.descripcion, juego.estudio, juego.titulo, juego.imagen, juego.link);
        const card = juegoInstance.renderGameCard(); 
        list.appendChild(card);
        juegoInstance.addEventListeners();
    }
};

const displayForYou = (juegos) => {
    // Colocar list-item en vez de swiper
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    // copiar el for
    for (let i = 0; i < 3; i++) {
        const rand = Math.floor(Math.random() * juegos.length);
        const selection = juegos[rand];
        const juegoInstance = new Juego(selection.id, selection.descripcion, selection.estudio, selection.titulo, selection.imagen, selection.link);
        const card = juegoInstance.renderGameCard();

        // Ignorar las partes de slide y reemplazar para insertar en el list-items
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');

        // insertar en list-items 
        slide.appendChild(card);
        swiperWrapper.appendChild(slide);

        // se copia esta linea despues del appendChild tal cual
        juegoInstance.addEventListeners();
    }
}

const render = async () => {
    const usuarioActivo = obtenerUsuarioEnSesion();
    if (!usuarioActivo) {
        window.location.href = 'index.html';
        return;
    }

    await renderData('');

    const searchBar = document.querySelector('#explore__search-SearchBar');
    searchBar.addEventListener("input", async (event) => {
        const searchText = event.target.value;
        await renderData(searchText);
    });


    const juegos = await getData();
    
    displayCards(juegos);
    displayForYou(juegos);
};

// barradebusqueda

const renderData = async (searchInput) => {
    const data = await getData();
    const cleanText = searchInput.toLowerCase();
    console.log(cleanText);
    const list = document.querySelector('.list-items');
    list.innerHTML = '';
    
    for(const juego of data){        
        if(juego.id === null || juego.titulo === null || juego.estudio === null || juego.descripcion === null || juego.imagen === null || juego.link === null){
            continue;
        }
        else {
            const juegosInstance = new Juego(juego.id, juego.descripcion, juego.estudio, juego.titulo, juego.imagen, juego.link);
            const juegoCard = juegosInstance.renderGameCard();
            
            if (cleanText === '' || juego.titulo.toLowerCase().includes(cleanText)) {         
                list.appendChild(juegoCard);
                juegosInstance.addEventListeners();
            }    
        }
    }
};

document.addEventListener('DOMContentLoaded', render);
