//Declaramos y asignamos nuestro Canvas principal así como la dimensión en la cual trabajaremos (x,y)
let lienzo = document.getElementById("canvasGameSection")
let ctx = lienzo.getContext("2d")

// const Background = new Image ()
// Background.src ="/Pictures/Captura2.PNG"

const Mike= new Image()
Mike.src = "./Pictures/Redman.png"

const Alienred= new Image()
Alienred.src = "./Pictures/Alien.Der.png"


const Alienblue= new Image()
Alienblue.src = "./Pictures/Blue.png"

const AlienAyellow= new Image()
AlienAyellow.src = "./Pictures/47.png"

const gasBomb= new Image()
gasBomb.src = "./Pictures/Gas.png"

const Mineral= new Image()
Mineral.src = "./Pictures/Mineral.png"

const Note1= new Image()
Note1.src = "./Pictures/Note3.png"

const Note2= new Image()
Note2.src = "./Pictures/Note5.png"

//Audio
const shoot = new Audio();
shoot.src ="./Music/sound (3).wav"

const shoot2 = new Audio();
shoot2.src ="./Music/sound (2).wav"

const loseHealth = new Audio();
loseHealth.src ="./Music/sound (5).wav"

const gelFuel = new Audio();
gelFuel.src ="./Music/sound (6).wav"

const treasure = new Audio();
treasure.src ="./Music/sound (7).wav"

const gameOver = new Audio();
gameOver.src ="./Music/endSong.mp3"



//LISTA DE enemigos / Otros elementos

// const backgroundImage = {
//     img: img,
//     x: 0,
//     speed: -1,
  
//     move: function() {
//       this.x += this.speed;
//       this.x %= canvas.width;
//     },
  
//     draw: function() {
//       ctx.drawImage(this.img, this.x, 0);
//       if (this.speed < 0) {
//         ctx.drawImage(this.img, this.x + canvas.width, 0);
//       } else {
//         ctx.drawImage(this.img, this.x - this.img.width, 0);
//       }
//     },
//   };
  
//   function updateCanvas() {
//     backgroundImage.move();
  
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     backgroundImage.draw();
  
//     requestAnimationFrame(updateCanvas);
//   }

//   img.onload = updateCanvas;

  

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
        const ProyectilDer = new Disparo (this.x + this.w,this.y + (this.h/2),20,40,Note1)
        ProyectilDerDeposito.push(ProyectilDer)
        
        shoot.play();
    }

    dispararizq(){
        const Proyectilizq = new DisparoIzq (this.x -20, this.y + (this.h/2),20,40,Note2)
        ProyectilDerDepositoIzq.push(Proyectilizq)
        
        shoot2.play();
    }
    
    dibujarse(){
        
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
       this.x -=35
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
        this.x +=35
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
    constructor(x,y,w,h,imagen){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.imagen=imagen
    }
    dibujarse(){
        
        ctx.drawImage(this.imagen, this.x, this.y,this.w,this.h);
        this.x +=10
    }
}

class DisparoIzq{
    constructor(x,y,w,h,imagen){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.imagen=imagen
        
    }
    dibujarse(){
        ctx.drawImage(this.imagen, this.x, this.y,this.w,this.h);
        this.x -=10
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
            case "KeyD":
                    astro.disparar()
                    break
            case "Space":
                    
                    break;
            case "KeyA":
                astro.dispararizq()
                break                   
        }
    });
}
// Mostar información------------------------------------------------------------------------------
function mostrarDatos(score,vida,medidor){ 
    ctx.fillStyle = "white"
    ctx.font = "55px Arial";
    //Titulo
    //Vida
    ctx.fillText(`Vida: ${vida}`,80,120)
    //Puntaje
    ctx.fillText(`Score ${score} puntos`,80,175)
    //Gasolina
    ctx.fillText(`Gasolina Total: ${medidor}`,80,235)
    
}

// ENEMIGOS----------------------------------------------------------------------------------------
 function crearAlien(){
        const num = Math.floor(Math.random()*150)
        if(num == 3){
        const redAliend = new AlienRojo (1860,710,40,200,Alienred) 
        aliensRojo.push(redAliend)   
        }}
function crearAlienIzq(){
        const num = Math.floor(Math.random()*150)
        if(num == 3){
        const redAliendIzq = new AlienRojoIzq (0,710,40,200,Alienblue) 
        alienRojoIzq.push(redAliendIzq)   
        }}
function crearAlienAmarillo(){
        const num = Math.floor(Math.random()*100)
        if(num == 3){
        const Amarillo = new AlienAmarillo (Math.floor(Math.random()*1850),0,60,60,AlienAyellow) 
        aliensAmarillo.push(Amarillo)  
        
        }}
function gasObjective(){
        const num = Math.floor(Math.random()*50)
        if(num == 3){           //Math.floor(Math.random()*1800)
        const Gasoline = new Gas (Math.floor(Math.random()*1800),0,60,60,gasBomb) 
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
                loseHealth.play()
           
                aliensRojo.splice(0,1)

            }if(astro.vida == 0){
                gameOver.play();
                alert("Game Over")
                
            }

        });
        alienRojoIzq.forEach((Rojoizq) => {
            
            Rojoizq.dibujarse();
            if (Rojoizq.x >= astro.x -40 ){
                alienRojoIzq.splice(0,1)
                astro.vida -=35
                score +=25 
                loseHealth.play()
            }
                if(astro.vida == 0){
                
            }if(astro.vida <0){
                gameOver.play();
                alert("Game Over")
                
                
            }
        });
        aliensAmarillo.forEach((Amarillo) => {
            Amarillo.dibujarse();

            if (
                astro.x + astro.w >= Amarillo.x &&
                astro.y <= Amarillo.y + Amarillo.h &&
                astro.y + astro.h >= Amarillo.y &&
                astro.x <= Amarillo.x + Amarillo.w

            ) {
                aliensAmarillo.splice(0,1)   
                astro.vida -=5
                loseHealth.play()
                
            }if(astro.vida <0){
                gameOver.play();
                alert("Game Over")
                
            }

      
        });
        
        // CREAR ELEMENTOS
        gasContainer.forEach((Gasolina) =>{
            Gasolina.dibujarse();
            if (Gasolina.y > 900){
                gasContainer.splice(0,1)
                
            }
            if (
                astro.x + astro.w >= Gasolina.x &&
                astro.y <= Gasolina.y + Gasolina.h &&
                astro.y + astro.h >= Gasolina.y &&
                astro.x <= Gasolina.x + Gasolina.w){
                    gasContainer.splice(0,1)
                    medidor+=25
                    gelFuel.play()   
                }

            if (medidor>=50){
                alert("Scape, you have enough fuel to escape")
                
            }
           
        });

        MineralDeposito.forEach((oro) => {
           oro.dibujarse(); 
           if (oro.y > 900){
            MineralDeposito.splice(0,1)
        }
        if (
            astro.x + astro.w >= oro.x &&
            astro.y <= oro.y + oro.h &&
            astro.y + astro.h >= oro.y &&
            astro.x <= oro.x + oro.w){
                MineralDeposito.splice(0,1)
                score+=100  
                treasure.play();
            }   
        });

        //ELIMINACIÓN DE ELEMENTOS
        ProyectilDerDeposito.forEach((ProyectilD, PIndex)=>{

            if(ProyectilD==4){
                ProyectilD=false
            }

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


