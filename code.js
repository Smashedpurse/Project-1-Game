//Declaramos y asignamos nuestro Canvas principal así como la dimensión en la cual trabajaremos (x,y)
let lienzo = document.getElementById("canvasGameSection")
let ctx = lienzo.getContext("2d")

const Mike= new Image()
Mike.src = "/Pictures/Astronauta2.png"


//Dibujar piso
function dibujarPiso(){
 ctx.beginPath()
 ctx.moveTo(0,750)
 ctx.lineTo(1918,750)
 ctx.stroke();
 ctx.closePath()
}
dibujarPiso()


//LISTA DE enemigos / Otros elementos

const aliensRojo=[];
const alienRojoIzq=[]
const NotasMusicales=[]

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
       this.x +=1
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
    ctx.fillStyle = "white"
    ctx.font = "20px Arial";
    //Titulo
    ctx.fillText("SPACEMAN MUSICIAN",1600,55)
    //Vida
    ctx.fillText(`Vida: ${vida}`,80,35)
    //Puntaje
    ctx.fillText(`Score: puntos`,80,85)
    //Gasolina
    ctx.fillText(`Gasolina Total:`,80,135)
    
}
mostrarDatos()


// ENEMIGOS----------------------------------------------------------------------------------------
 //Crear enemigos

    function crearAlien(){
        const num = Math.floor(Math.random()*200)
        if(num == 3){
        const redAliend = new AlienRojo (1800,630,40,200,"red") 
        aliensRojo.push(redAliend)   
        }
    }

    function crearAlienIzq(){
        const num = Math.floor(Math.random()*100)
        if(num == 3){
        const redAliendIzq = new AlienRojoIzq (0,630,40,200,"red") 
        alienRojoIzq.push(redAliendIzq)   
        }
    }
    

function iniciarJuego(){
    
    //ASTRONAUTA
    const astro  = new Astronauta(900,630,80,200,"green",100,Mike) 
    teclas(astro)
    console.log(astro)
    astro.dibujarse(); 


 
    setInterval(() => {
        ctx.clearRect(0,0,1918,963)
        mostrarDatos(0,astro.vida,0)
        dibujarPiso()
        astro.dibujarse()
        // CREAR ENEMIGO
        aliensRojo.forEach((Rojo) => {
            Rojo.dibujarse();
            if(Rojo.x <= astro.x + astro.w){
                console.log(aliensRojo)
                aliensRojo.splice(0,1)
                astro.vida -=25
            }
        });

        NotasMusicales.forEach((Clave) => {
            Clave.dibujarse()
            
            
        });

        alienRojoIzq.forEach((Rojoizq) => {
            Rojoizq.dibujarse();
            if(Rojoizq.x >= astro.x -60 ){
                alienRojoIzq.splice(0,1)
                astro.vida -=25
            }
        });

        
        
        crearAlien();
        crearAlienIzq()
        }, 1000/ 30);
}

iniciarJuego()