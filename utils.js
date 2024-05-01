export const getData = async () => {
    const response = await fetch('https://raw.githubusercontent.com/jeanalo/COZYGAMER--ENTREGA2/main/data.json');
    const juegos = await response.json();
    return juegos
}

class juego {
    constructor(ID, Descripcion, Studio, Titulo, Imagen){
        this.ID = ID;
        this.Descripcion = Descripcion;
        this.Studio = Studio;
        this.Titulo = Titulo;
        this.Imagen = Imagen;

    }
}