//Declaramos y asignamos nuestro Canvas principal así como la dimensión en la cual trabajaremos (x,y)
let lienzo = document.getElementById("canvasGameSection")
let ctx = lienzo.getContext("2d")


//Dibujar piso
function dibujarPiso(){
 ctx.beginPath()
 ctx.moveTo(0,750)
 ctx.lineTo(1918,750)
 ctx.stroke();
 ctx.closePath()
}
dibujarPiso()



// PERSONAJES ---------------------------------------------------------------------------------

class Astronauta{
    constructor(x,y,w,h,color,vida){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.color=color
        this.vida=vida
    }
    avanzar(){
        console.log("Avanza")
    }
    retroceder(){
        console.log("Retrocede")
    }
    brincar(){
        console.log("Brinca")
    }
    disparar(){
        console.log("Dispara")
    }
    morir(){
        console.log("Tu personaje ha muerto")
    }
    dibujarse(){
        ctx.fillRect(this.x,this.y,this.w,this.h)
    }
} 

// MOVIMIENTO------------------------------------------------------------------------------------

//Función para identificar el tipo de tecla que se presiona
function teclas(astro){
    document.addEventListener("keyup", (evento) => {
        switch(evento.code){
            case "Space":
                console.log("Brinco")
                break;
            case "ArrowRight":
                console.log("Derecha")
                break;
                
            case "ArrowLeft":
                console.log("Izquierda")
                break                                            
            case "KeyF":
                    console.log("Disparo")
                    break                                                
        }
    });
}

//Base para el funcionamiento de nuestro juego.
// let idIntervalo = setInterval(() => {
// }, interval);

function iniciarJuego(){
    const astro = new Astronauta (250,630,80,200,"green",100) 
    teclas(astro)
    astro.dibujarse(); 
}

iniciarJuego()