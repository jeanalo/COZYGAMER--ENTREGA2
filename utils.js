export const getData = async () => {
    const response = await fetch('https://raw.githubusercontent.com/jeanalo/COZYGAMER--ENTREGA2/main/data.json');
    const juegos = await response.json();
    return juegos
};

export const getJuegoById = async (id) => {
    const juegos = await getData();
    
    for (const juego of juegos) {
        if (juego.id === parseInt(id)) {
            return juego;
        }
    }
    
    throw new Error ('Juego no encontrado');
};

export class Juego {
    #id;
    #nodo;
    #nodoBotonSteam;
    #nodoBotonFavoritos;
    descripcion;
    estudio;
    titulo;
    imagen;
    link;

    constructor(id, descripcion, estudio, titulo, imagen, link){
        this.#id = id;
        this.descripcion = descripcion;
        this.estudio = estudio;
        this.titulo = titulo;
        this.imagen = imagen;
        this.link = link;
    }

    renderGameCard(){
        const card = document.createElement('li');
        card.classList.add('list-item__item');

        const img = document.createElement('img');
        img.classList.add('item__image');
        img.src = this.imagen;
        img.alt = this.titulo;

        const title = document.createElement('h4');
        title.classList.add('item__name');
        title.textContent = this.titulo;

        card.appendChild(img);
        card.appendChild(title);

        this.#nodo = card;

        return card;
    }

    renderGameDetails() {
        const detailsFrame = document.createElement('div');
        detailsFrame.classList.add('main-frame__info-section');

        const img = document.createElement('img');
        img.classList.add('info-section__game-image');
        img.src = this.imagen;
        img.alt = this.titulo;

        const gameDetails = document.createElement('div');
        gameDetails.classList.add('info-section__game-details');

        // ======================= TITLE =======================
        const titleFrame = document.createElement('div');
        titleFrame.classList.add('info-section__game-description--horizontal');

        const nameTitle = document.createElement('h3');
        nameTitle.classList.add('info-section__section-title');
        nameTitle.textContent = 'Title';

        const name = document.createElement('p');
        name.textContent = this.titulo;

        titleFrame.appendChild(nameTitle);
        titleFrame.appendChild(name);
        // ======================= TITLE =======================

        // ======================= STUDIO =======================
        const studioFrame = document.createElement('div');
        studioFrame.classList.add('info-section__game-description--horizontal');

        const studioTitle = document.createElement('h3');
        studioTitle.classList.add('info-section__section-title');
        studioTitle.textContent = 'Studio';

        const studio = document.createElement('p');
        studio.textContent = this.estudio;

        studioFrame.appendChild(studioTitle);
        studioFrame.appendChild(studio);
        // ======================= STUDIO =======================

        // ======================= DESCRIPTION =======================
        const descriptionFrame = document.createElement('div');
        descriptionFrame.classList.add('info-section__game-description--vertical');

        const descriptionTitle = document.createElement('h3');
        descriptionTitle.classList.add('info-section__section-title');
        descriptionTitle.textContent = 'Description';

        const description = document.createElement('p');
        description.textContent = this.descripcion;

        descriptionFrame.appendChild(descriptionTitle);
        descriptionFrame.appendChild(description);
        // ======================= DESCRIPTION =======================

        gameDetails.appendChild(titleFrame);
        gameDetails.appendChild(studioFrame);
        gameDetails.appendChild(descriptionFrame);

        detailsFrame.appendChild(img);
        detailsFrame.appendChild(gameDetails);

        return detailsFrame;
    }

    renderActionButtons() {
        // ======================= BUTTONS =======================
        const buttonsFrame = document.createElement('div');
        buttonsFrame.classList.add('actions');

        const buttonSteam = document.createElement('a');
        buttonSteam.classList.add('actions__button');
        buttonSteam.href = this.link;
        buttonSteam.target = '_blank';
        this.#nodoBotonSteam = buttonSteam;

        const iconSteam = document.createElement('i');
        iconSteam.classList.add('fa-brands', 'fa-steam');

        const buttonSteamText = document.createElement('p');
        buttonSteamText.textContent = 'Steam';

        buttonSteam.appendChild(iconSteam);
        buttonSteam.appendChild(buttonSteamText);

        const buttonFav = document.createElement('div');
        buttonFav.classList.add('actions__button');
        this.#nodoBotonFavoritos = buttonFav;

        const iconFav = document.createElement('i');
        iconFav.classList.add('fa-solid', 'fa-heart');

        const buttonFavText = document.createElement('p');
        buttonFavText.textContent = 'Favorite';

        buttonFav.appendChild(iconFav);
        buttonFav.appendChild(buttonFavText);

        buttonsFrame.appendChild(buttonSteam);
        buttonsFrame.appendChild(buttonFav);

        return buttonsFrame;
    }

    addEventListeners() {
        this.#nodo.addEventListener('click', () => {
            window.location.href = `./game_detail.html?id=${this.#id}`;
        });
    }
};