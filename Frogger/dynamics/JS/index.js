const canvas = document.getElementById("mi-canvas");
const ctx = canvas.getContext("2d");

const naveEspacial = new Image();
naveEspacial.src = "./statics/media/img/avionSprites.png";
naveEspacial.addEventListener('load', ()=>{
    console.log("Ya cargó nave espacial");
});
const fondo = new Image();
fondo.src = "./statics/media/img/space.jpg";
fondo.addEventListener('load', ()=>{
    console.log("Ya cargó fondo");
});
const ovni = new Image();
ovni.src = "./statics/media/img/ufo.png";
ovni.addEventListener('load', ()=>{
    console.log("Ya cargó UFO");
});
const acaba  = new Audio("./statics/media/sounds/end.mp3");
const choca  = new Audio("./statics/media/sounds/chocar.mp3");
const musicaFondo  = new Audio("./statics/media/sounds/ringtones-got-theme.mp3");
const madre = document.getElementById("madre");
const empezaraJ = document.getElementById("empezaraJ");
// const up = document.getElementById("up");
// const left = document.getElementById("left");
// const right = document.getElementById("right");
// const down = document.getElementById("down");

// class spaceCraft
// {
//     constructor(x, y, dx, dy, ruta)
//     {
//         const imagen = new image();
//         imagen.src = ruta;
//         this.x = x;
//         this.y = y;
//         this.dx = dx;
//         this.dy = dy;
//         this.spriteX = 0;
//         this.spriteY = 0;
//         this.img = imagen;
//     }
// }
// const gamer = new spaceCraft(10, 20, 28, 28, "./statics/media/img/avion.png");
// ctx.drawImage(gamer, 250, 250, 50, 45);

let tempo = 5;
let control = 0;
let roca = 0;
let paraRoca = 0;
let xRoca = 400;
let yRoca = 250;
let xUfo = 400;
let yUfo = 250 + 45;
let xNave = 250 - 25;
let yNave = 453;
let naveOnU = 0;
let naveOnL = 0;
let naveOnR = 0;
let naveOnD = 0;
let vidas = 3;
let aJugar = false;
let vez = 0;
let juego;
let temporizador = 0;
let duracion = 0;
let empiezaDeNuevo;
let direccionNave = [0, 15, 90, 97, 244, 11, 103, 95, 125, 130, 97, 92, 517, 20, 95, 97];
let llaveCero;
let llaveUno;
let llaveDos;
let llaveTres;
let anchOvni = 100;
let altOvni = 20;

function static()
{
    ctx.fillStyle = "#D398EB"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(fondo, 0, 0, 960, 640, 0, 0, canvas.width, canvas.height);
    //Informacipon de tiempo y record
    ctx.fillStyle = "#B489E9"
    ctx.fillRect(0, 0, canvas.width, canvas.height / 10);
    //Meta
    ctx.fillStyle = "#B489E9"
    ctx.fillRect(0, canvas.height / 10, canvas.width / 7, canvas.height / 10);
    ctx.fillRect(canvas.width / 7 * 2, canvas.height / 10, canvas.width / 7, canvas.height / 10);
    ctx.fillRect(canvas.width / 7 * 4, canvas.height / 10, canvas.width / 7, canvas.height / 10);
    ctx.fillRect(canvas.width / 7 * 6, canvas.height / 10, canvas.width / 7, canvas.height / 10);
    //Rectangulito de inicio
    ctx.fillStyle = "#B489E9"
    ctx.fillRect(0, 450, canvas.width, canvas.height / 10);

    ctx.fillStyle = "#000000";
    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Tiempo:", canvas.width / 4, 30);
    ctx.fillText("Vidas:", canvas.width / 4 * 2, 30);
    ctx.fillText(vidas, canvas.width / 4 * 2 + 50, 30);
    ctx.fillText("Record:", canvas.width / 4 * 3, 30);
    musicaFondo.volume = 0.1;
    musicaFondo.play();
}
//Detección de elementos de teclado
window.addEventListener("keypress", (evento) =>{
    
    if(evento.key == "p" || evento.key == "P")
    {
        aJugar = true;
        empezaraJ.style.display = "none";
    }
    if(aJugar == true)
    {
        vez++;
        console.log("Pausa");
        canvas.style.display = "block";
        if(evento.key == "w" || evento.key == "W")
        {
            naveOnU = 1;
            //Imagen direccion dada por estas localidades
            llaveCero = 0;
            llaveUno = 1;
            llaveDos = 2;
            llaveTres = 3;
        }
        if(evento.key == "a" || evento.key == "A")
        {
            naveOnL = 1;
            //Imagen direccion dada por estas localidades
            llaveCero = 4;
            llaveUno = 5;
            llaveDos = 6;
            llaveTres = 7;
        }
        if(evento.key == "d" || evento.key == "D")
        {
            naveOnR = 1;
            //Imagen direccion dada por estas localidades
            llaveCero = 8;
            llaveUno = 9;
            llaveDos = 10;
            llaveTres = 11;
        }
        if(evento.key == "s" || evento.key == "S")
        {
            naveOnD = 1;
            //Imagen direccion dada por estas localidades
            llaveCero = 12;
            llaveUno = 13;
            llaveDos = 14;
            llaveTres = 15;
        }
    }
});
function nave()
{
    ctx.drawImage(naveEspacial, direccionNave[llaveCero], direccionNave[llaveUno], direccionNave[llaveDos], direccionNave[llaveTres], xNave, yNave, 50, 45);
}

juego = window.setInterval(()=>{
        static();
        // if(yNave <= canvas.height / 10 && xNave + 50 >= 71.42857142857143 && xNave + 50 <= 71.42857142857143 * 2 ||  yNave <= canvas.height / 10 && xNave >= 71.42857142857143 * 3 && xNave <= 71.42857142857143 * 4)
        // {
        //     yNave = canvas.height / 10;
        // }
        // Para que la nave no se pase de los límites del canvas
        //Ha ganado
        if(yNave <= canvas.height / 10 && xNave + 50 >= canvas.width / 7 && xNave <= canvas.width / 7 * 2 || yNave <= canvas.height / 10 && xNave + 50 >= canvas.width / 7 * 3 && xNave <= canvas.width / 7 * 4 || yNave <= canvas.height / 10 && xNave + 50 >= canvas.width / 7 * 5 && xNave <= canvas.width / 7 * 6)
        {
            yNave = canvas.height / 10;
            //Sonido de ganador
            empiezaDeNuevo =  confirm("¡¡¡¡Has ganado!!!!");
            vidas = 3;
            duracion = 0;
            temporizador = 0;
            clearInterval(juego);
            if(empiezaDeNuevo == true)
            {
                console.log("Termina");
                window.location = "./index.html";
            }
        }
        if(yNave <= canvas.height / 10 * 2 && xNave + 50 >= 0 && xNave <= canvas.width / 7 || yNave <= canvas.height / 10 * 2 && xNave + 50 >= canvas.width / 7 * 2 && xNave <= canvas.width / 7 * 3 || yNave <= canvas.height / 10 * 2 && xNave + 50 >= canvas.width / 7 * 4 && xNave <= canvas.width / 7 * 5 || yNave <= canvas.height / 10 * 2 && xNave + 50 >= canvas.width / 7 * 6 && xNave <= canvas.width / 7 * 7)
        {
            yNave = canvas.height / 10 * 2;
        }
        if(yNave >= 453)
        {
            yNave = 453;
        }
        if(xNave <= 0)
        {
            xNave = 0;
        }
        if(xNave >= 500 - 50)
        {
            xNave = 500 - 50;
        }
        
        //Movimiento de nave
        if(naveOnU == 1)
        {
            yNave = yNave - 8;
            naveOnU = 0;
        }
        if(naveOnL == 1)
        {
            xNave = xNave - 8;
            naveOnL = 0;
        }
        if(naveOnR == 1)
        {
            xNave = xNave + 8;
            naveOnR = 0;
        }
        if(naveOnD == 1)
        {
            yNave = yNave + 8;
            naveOnD = 0;
        }
        
        nave();
        //Obstáculos
        ctx.fillStyle = "#666970";
        //ctx.fillRect(xUfo, yUfo, 50, 45);
        ctx.drawImage(ovni, 0, 15, 199, 42, xUfo, yUfo, anchOvni, altOvni);
        //Mueve el Ovni
        xUfo = xUfo - 2;
        if(roca == 1)
        {
            xRoca = xRoca - 2;
            ctx.fillStyle = "#3BBB59";
            //ctx.fillRect(xRoca, yRoca, 50, 45);
            ctx.drawImage(ovni, 0, 15, 199, 42, xRoca, yRoca, anchOvni, altOvni);
            if(xRoca == 0)
            {
                xRoca = 500;
                yRoca = Math.random() * (415 - canvas.height / 10 * 2) + canvas.height / 10 * 2;
            }
        }
        //Cuando ufo llega al final
        if(xUfo + anchOvni == 0)
        {
            xUfo = 500;
            yUfo = Math.random() * (415 - canvas.height / 10 * 2) + canvas.height / 10 * 2;
            control++;
            //roca = 0;
        }
        //Cuando haya pasado 5 veces ufo de izquierda a derecha roca se activa
        if(control == 5)
        {
            roca = 1;
            //console.log(roca);        
        }
        if(control == 10)
        {
            control = 0;
            roca = 0;
        }
        //Colisión con obstáculos
        // Si ( x1 > x2+w2 ) ==> No hay colisión
        // Si ( x1+w1 < x2 ) ==> No hay colisión
        // Si ( y1 > y2+h2 ) ==> No hay colisión
        // Si ( y1+h1 < y2 ) ==> No hay colisión
        // if(!(x1 > x2+w2) && !(x1+w1 < x2) && !(y1 > y2+h2) && !(y1+h1 < y2))
        if(!(xNave > xUfo + anchOvni) && !(xNave + 50 < xUfo) && !(yNave > yUfo + altOvni) && !(yNave+45 < yUfo) || !(xNave > xRoca+anchOvni) && !(xNave+50 < xRoca) && !(yNave > yRoca+altOvni) && !(yNave+45 < yRoca))
        {
            vidas--;
            choca.volume = 0.3;
            choca.play();
            if(vidas == 0)
            {
                acaba.volume = 0.2;
                acaba.play();
                empiezaDeNuevo = confirm("Has perdido");
                vidas = 3;
                duracion = 0;
                temporizador = 0;
                clearInterval(juego);
                if(empiezaDeNuevo == true)
                {
                    console.log("Termina");
                    window.location = "./index.html";
                }
            }
            xNave = 250 - 25;
            yNave = 453;
        }
        temporizador++;
        if(temporizador == 200)
        {
            duracion++;
            temporizador = 0;
        }
        ctx.fillStyle = "#000000";
        ctx.font = "20px sans-serif";
        ctx.fillText(duracion, canvas.width / 4 + 50, 30);
}, tempo);