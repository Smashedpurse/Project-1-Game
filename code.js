//Declaramos y asignamos nuestro Canvas principal así como la dimensión en la cual trabajaremos (x,y)
let lienzo = document.getElementById("canvasGameSection")
let ctx = lienzo.getContext("2d")

const Mike= new Image()
Mike.src = "/Pictures/xp.png"

const Alienred= new Image()
Alienred.src = "/Pictures/AlienRojo.png"


const Alienblue= new Image()
Alienblue.src = "/Pictures/Alienazul.png"

const AlienAyellow= new Image()
AlienAyellow.src = "/Pictures/Bomba.png"

const gasBomb= new Image()
gasBomb.src = "/Pictures/Gas.png"

//Dibujar piso
// function dibujarPiso(){
//  ctx.beginPath()
//  ctx.moveTo(0,750)
//  ctx.lineTo(1918,750)
//  ctx.stroke();
//  ctx.closePath()
// }
// dibujarPiso()


//LISTA DE enemigos / Otros elementos

const aliensRojo=[];
const aliensAmarillo=[];
const alienRojoIzq=[]
const NotasMusicales=[]
const gasContainer=[]


// PERSONAJES ---------------------------------------------------------------------------------

class Astronauta{ 
    constructor(x,y,w,h,color,vida,imagen){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.color=color
        this.vida=vida
        this.imagen=imagen
    }
    avanzar(){
        console.log("Avanza")
        if(this.x + this.w <1800){
            this.x += 100
        }
    }
    retroceder(){
        console.log("Retrocede")
        if(this.x >0){
            this.x -= 100
        }
    }
    brincar(){
        console.log("Brinca")
    }
    disparar(){
        const disparo = new Musica (this.x + this.w, this.y + (this.h/2),30,40)
        NotasMusicales.push(disparo)
        console.log(NotasMusicales)
    }
    morir(){
        console.log("Tu personaje ha muerto")
    }
    dibujarse(){
        ctx.fillRect(this.x,this.y,this.w,this.h)
        ctx.drawImage(this.imagen, this.x, this.y,this.w,this.h);
    }
} 

class AlienRojo{
    constructor(x,y,w,h,imagen,){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.imagen=imagen
    }
    dibujarse(){
        ctx.fillStyle = "red"
        ctx.fillRect(this.x,this.y,this.w,this.h)
        ctx.drawImage(this.imagen, this.x, this.y,this.w,this.h);
       this.x -=1
    }
}

class AlienRojoIzq{
    constructor(x,y,w,h,imagen,){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.imagen=imagen
    }
    dibujarse(){
        ctx.fillStyle = "blue"
        ctx.fillRect(this.x,this.y,this.w,this.h)
        ctx.drawImage(this.imagen, this.x, this.y,this.w,this.h);
        this.x +=1
    }
}
class AlienAmarillo{
    constructor(x,y,w,h,imagen,){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.imagen=imagen
    }
    dibujarse(){
        ctx.fillStyle = "yellow"
        ctx.fillRect(this.x,this.y,this.w,this.h)
        ctx.drawImage(this.imagen, this.x, this.y,this.w,this.h);
       this.y +=10
    }
}

class Gas{
    constructor(x,y,w,h,imagen,){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.imagen=imagen
    }
    dibujarse(){
        ctx.fillStyle = "yellow"
        ctx.fillRect(this.x,this.y,this.w,this.h)
        ctx.drawImage(this.imagen, this.x, this.y,this.w,this.h);
       this.y +=10
    }
}

//PROYECIL

class Musica{
    constructor(x,y,w,h){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
    }
    dibujarse(){
        ctx.fillStyle = "dodgerblue"
        ctx.fillRect(this.x,this.y,this.w,this.h)
        this.x +=3
    }
}


// MOVIMIENTO------------------------------------------------------------------------------------

//Función para identificar el tipo de tecla que se presiona
function teclas(astro){
    document.addEventListener("keyup", (evento) => {
        switch(evento.code){
            case "ArrowRight":
                astro.avanzar();
                break;
            case "ArrowLeft":
                astro.retroceder()
                break                                            
            case "KeyF":
                    astro.disparar()
                    break
            case "Space":
                    console.log("Brinco")
                    break;
        }
    });
}




// Mostar información------------------------------------------------------------------------------

function mostrarDatos(score,vida,Gasolina){ 
    ctx.fillStyle = "black"
    ctx.font = "35px Arial";
    //Titulo
    //Vida
    ctx.fillText(`Vida: ${vida}`,80,35)
    //Puntaje
    ctx.fillText(`Score:${score} puntos`,80,85)
    //Gasolina
    ctx.fillText(`Gasolina Total:`,80,135)
    
}
mostrarDatos()


// ENEMIGOS----------------------------------------------------------------------------------------
 //Crear enemigos

    function crearAlien(){
        const num = Math.floor(Math.random()*100)
        if(num == 3){
        const redAliend = new AlienRojo (1800,710,40,200,Alienred) 
        aliensRojo.push(redAliend)   
        }
    }

    function crearAlienIzq(){
        const num = Math.floor(Math.random()*100)
        if(num == 3){
        const redAliendIzq = new AlienRojoIzq (0,710,40,200,Alienblue) 
        alienRojoIzq.push(redAliendIzq)   
        }
    }

    function crearAlienAmarillo(){
        const num = Math.floor(Math.random()*50)
        if(num == 3){
        const Amarillo = new AlienAmarillo (Math.floor(Math.random()*1900),0,60,60,AlienAyellow) 
        aliensAmarillo.push(Amarillo)   
        }
    }

    function gasObjective(){
        const num = Math.floor(Math.random()*200)
        if(num == 3){
        const Amarillo = new AlienAmarillo (Math.floor(Math.random()*1900),0,60,60,gasBomb) 
        aliensAmarillo.push(Amarillo)   
        }
    }
    

function iniciarJuego(){
    
    //ASTRONAUTA
    const astro  = new Astronauta(900,710,80,200,"green",100,Mike) 
    teclas(astro)
    console.log(astro)
    astro.dibujarse(); 


 
    setInterval(() => {
        ctx.clearRect(0,0,1918,963)
        mostrarDatos(astro.score,astro.vida,0)
        // dibujarPiso()
        astro.dibujarse()
        
        // CREAR ENEMIGO
        aliensRojo.forEach((Rojo) => {
            Rojo.dibujarse();
            if(Rojo.x <= astro.x + astro.w){
                aliensRojo.splice(0,1)
                astro.vida -=25
                astro.score +=50
            }
            if(astro.vida <0){
                console.log("El juego terminó")
            }

        });

        alienRojoIzq.forEach((Rojoizq) => {
            Rojoizq.dibujarse();
            if(Rojoizq.x >= astro.x -40 ){
                alienRojoIzq.splice(0,1)
                astro.vida -=25
                astro.score +=50
            }
            if(astro.vida == 0){
                console.log("El juego terminó")
            }
        });

        aliensAmarillo.forEach((Amarillo) => {
            Amarillo.dibujarse();
        });

        gasContainer.forEach((Gasolina) =>{
            Gasolina.dibujarse();
        });

        NotasMusicales.forEach((Clave) => {
            Clave.dibujarse()
        });

       

        crearAlien();
        crearAlienIzq();
        crearAlienAmarillo();
        gasObjective()
        }, 1000/ 30);
}

iniciarJuego()