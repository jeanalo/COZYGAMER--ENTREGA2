export const getData = async () => {
    const response = await fetch('https://raw.githubusercontent.com/jeanalo/COZYGAMER--ENTREGA2/main/data.json');
    const juegos = await response.json();
    return juegos
}

export class Juego {
    #id;
    #nodo;
    descripcion;
    estudio;
    titulo;
    imagen;

    constructor(id, descripcion, estudio, titulo, imagen){
        this.#id = id;
        this.descripcion = descripcion;
        this.estudio = estudio;
        this.titulo = titulo;
        this.imagen = imagen;
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
}