//Declaramos y asignamos nuestro Canvas principal así como la dimensión en la cual trabajaremos (x,y)
let lienzo = document.getElementById("canvasGameSection")
let ctx = lienzo.getContext("2d")

const Mike= new Image()
Mike.src = "/Pictures/Redman.png"

const Alienred= new Image()
Alienred.src = "/Pictures/Alien.Der.png"


const Alienblue= new Image()
Alienblue.src = "/Pictures/Blue.png"

const AlienAyellow= new Image()
AlienAyellow.src = "/Pictures/47.png"

const gasBomb= new Image()
gasBomb.src = "/Pictures/Gas.png"

const Mineral= new Image()
Mineral.src = "/Pictures/Mineral.png"

const Note1= new Image()
Note1.src = "/Pictures/ProyectilDer.png"

const Note2= new Image()
Note2.src = "/Pictures/Proyectilizq.png"

//LISTA DE enemigos / Otros elementos

const aliensRojo=[];
const aliensAmarillo=[];
const alienRojoIzq=[]
const gasContainer=[]
const MineralDeposito=[]
const ProyectilDerDeposito=[]
const ProyectilDerDepositoIzq=[]


// PERSONAJES ---------------------------------------------------------------------------------

class Astronauta{ 
    constructor(x,y,w,h,vida,imagen){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.vida=vida
        this.imagen=imagen
    }
    avanzar(){
       
        if(this.x + this.w <1800){
            this.x += 100
        }
    }
    retroceder(){
       
        if(this.x >0){
            this.x -= 100
        }
    }
    disparar(){
        const ProyectilDer = new Disparo (this.x + this.w,this.y + (this.h/2),20,40)
        ProyectilDerDeposito.push(ProyectilDer)
        console.log(ProyectilDerDeposito)
    }

    dispararizq(){
        const Proyectilizq = new DisparoIzq (this.x -20, this.y + (this.h/2),20,40)
        ProyectilDerDepositoIzq.push(Proyectilizq)
        console.log(ProyectilDerDepositoIzq)
    }
    
    morir(){
    }
    
    dibujarse(){
        ctx.fillRect(this.x, this.y,this.w,this.h);
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
        ctx.fillStyle = "dodgerblue"
        ctx.fillRect(this.x,this.y,this.w,this.h)
        ctx.drawImage(this.imagen, this.x, this.y,this.w,this.h);
        this.y +=5 
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
        
        ctx.drawImage(this.imagen, this.x, this.y,this.w,this.h);
       this.y +=5
    }
}
class MineralCoin{
    constructor(x,y,w,h,imagen,){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.imagen=imagen
    }
    dibujarse(){
        
        ctx.drawImage(this.imagen, this.x, this.y,this.w,this.h);
        this.y +=5
    }
}

class Disparo{
    constructor(x,y,w,h){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        
    }
    dibujarse(){
        ctx.fillStyle = "green"
        ctx.fillRect(this.x, this.y,this.w,this.h)
        
        this.x +=5
    }
}

class DisparoIzq{
    constructor(x,y,w,h){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        
    }
    dibujarse(){
        ctx.fillStyle = "green"
        ctx.fillRect(this.x, this.y,this.w,this.h)
        
        this.x -=5
    }
}

// MOVIMIENTO------------------------------------------------------------------------------------
//Función para identificar el tipo de tecla que se presiona
function teclas(astro){
    document.addEventListener("keyup", (evento) => {
         console.log("Tecla tocada",evento.code)
      switch(evento.code){
            case "ArrowRight":
                astro.avanzar();
                break;
            case "ArrowLeft":
                astro.retroceder()
                break                                            
            case "KeyD":
                    astro.disparar()
                    break
            case "Space":
                    console.log("Brinco")
                    break;
            case "KeyA":
                astro.dispararizq()
                break                   
        }
    });
}
// Mostar información------------------------------------------------------------------------------
function mostrarDatos(score,vida,medidor){ 
    ctx.fillStyle = "black"
    ctx.font = "35px Arial";
    //Titulo
    //Vida
    ctx.fillText(`Vida: ${vida}`,80,35)
    //Puntaje
    ctx.fillText(`Score ${score} puntos`,80,85)
    //Gasolina
    ctx.fillText(`Gasolina Total: ${medidor}`,80,135)
    
}

// ENEMIGOS----------------------------------------------------------------------------------------
 function crearAlien(){
        const num = Math.floor(Math.random()*50)
        if(num == 3){
        const redAliend = new AlienRojo (1860,710,40,200,Alienred) 
        aliensRojo.push(redAliend)   
        }}
function crearAlienIzq(){
        const num = Math.floor(Math.random()*50)
        if(num == 3){
        const redAliendIzq = new AlienRojoIzq (0,710,40,200,Alienblue) 
        alienRojoIzq.push(redAliendIzq)   
        }}
function crearAlienAmarillo(){
        const num = Math.floor(Math.random()*50)
        if(num == 3){
        const Amarillo = new AlienAmarillo (Math.floor(Math.random()*1850),0,60,60,AlienAyellow) 
        aliensAmarillo.push(Amarillo)  
        console.log 
        }}
function gasObjective(){
        const num = Math.floor(Math.random()*50)
        if(num == 3){           //Math.floor(Math.random()*1800)
        const Gasoline = new Gas (900,0,60,60,gasBomb) 
        gasContainer.push(Gasoline)   
        }}
function generateCoin(){
        const num = Math.floor(Math.random()*300)
        if(num == 3){
        const Gold = new MineralCoin (Math.floor(Math.random()*1800),0,60,60,Mineral) 
        MineralDeposito.push(Gold)   
        }}
    
    
function iniciarJuego(){
    let score=0;
    let medidor=0
    const astro = new Astronauta(900,710,80,200,100,Mike)
    teclas(astro)
    console.log(astro)
    astro.dibujarse(); 
    

setInterval(() => {
        
        ctx.clearRect(0,0,1918,963)
        mostrarDatos(score,astro.vida,medidor)
        astro.dibujarse()

        // CREAR ENEMIGO

        aliensRojo.forEach((Rojo) => {
            Rojo.dibujarse();
            
            if(Rojo.x <= astro.x + astro.w){
                aliensRojo.splice(0,1)
                astro.vida -=25
                
           
                aliensRojo.splice(0,1)

            }if(astro.vida <0){
                console.log("El juego terminó")
            }

        });
        alienRojoIzq.forEach((Rojoizq) => {
            
            Rojoizq.dibujarse();
            if (Rojoizq.x >= astro.x -40 ){
                alienRojoIzq.splice(0,1)
                astro.vida -=35
                score +=25 
            }
                if(astro.vida == 0){
                console.log("El juego terminó")
            }
        });
        aliensAmarillo.forEach((Amarillo) => {
            Amarillo.dibujarse();

            if (Amarillo.y >= astro.y && 
                Amarillo.x >= astro.x && 
                 Amarillo.x + Amarillo.w <= astro.x + astro.w) {
                aliensAmarillo.splice(0,1)   
                astro.vida -=15
                
                
            }

      
        });
        
        // CREAR ELEMENTOS
        gasContainer.forEach((Gasolina) =>{
            Gasolina.dibujarse();
            if (Gasolina.y > 900){
                gasContainer.splice(0,1)
                
            }
            if (Gasolina.y >= astro.y && Gasolina.x >= astro.x && Gasolina.x + Gasolina.w <= astro.x + astro.w) {   
                gasContainer.splice(0,1)
                medidor+=25
            }

            // if (medidor>=300){
            //     alert("Escapa, tienes suficiente combustible para escapar")
                
            // }
           
        });

        MineralDeposito.forEach((oro) => {
           oro.dibujarse(); 
           if (oro.y > 900){
            MineralDeposito.splice(0,1)
        }
            
        });

        //ELIMINACIÓN DE ELEMENTOS
        ProyectilDerDeposito.forEach((ProyectilD, PIndex)=>{
            if(ProyectilD.x + ProyectilD.w >1750){
                ProyectilDerDeposito.splice(0,1)
            }
            ProyectilD.dibujarse();
            aliensRojo.forEach((Rojo, RIndex) => {
             if(ProyectilD.x+ProyectilD.w >= Rojo.x ){
                score +=25
                ProyectilDerDeposito.splice(PIndex,1)
                aliensRojo.splice(RIndex,1)
             }  
          })
        })
        

        ProyectilDerDepositoIzq.forEach((ProyectilIzq, PIzqndex)=>{
            if(ProyectilIzq.x + ProyectilIzq.w == 150){
                ProyectilDerDepositoIzq.splice(0,1)
            }
            ProyectilIzq.dibujarse();
            alienRojoIzq.forEach((Rojoizq, RIzqndex) => {
            if(ProyectilIzq.x+ProyectilIzq.w <= Rojoizq.x+40){
                score +=25
                ProyectilDerDepositoIzq.splice(PIzqndex,1)
                alienRojoIzq.splice(RIzqndex,1)
             }  
          })
        })


        crearAlien();
        crearAlienIzq();
        crearAlienAmarillo();
        gasObjective();
        generateCoin();
        
    }, 1000/ 30);
}

iniciarJuego()


