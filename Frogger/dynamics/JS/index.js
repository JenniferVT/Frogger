const canvas = document.getElementById("mi-canvas");
const ctx = canvas.getContext("2d");
// const up = document.getElementById("up");
// const left = document.getElementById("left");
// const right = document.getElementById("right");
// const down = document.getElementById("down");


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
function static()
{
    ctx.fillStyle = "#D398EB"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
    ctx.fillText("Record:", canvas.width / 4 * 3, 30);

}
//Detección de elementos de teclado
window.addEventListener("keypress", (evento) =>{
    if(evento.key == "w" || evento.key == "W")
    {
        naveOnU = 1;
    }
    if(evento.key == "a" || evento.key == "A")
    {
        naveOnL = 1;
    }
    if(evento.key == "d" || evento.key == "D")
    {
        naveOnR = 1;
    }
    if(evento.key == "s" || evento.key == "S")
    {
        naveOnD = 1;
    }
});
function nave()
{
    ctx.fillStyle = "#164285";
    ctx.fillRect(xNave, yNave, 50, 45);
}

window.setInterval(()=>{
    static();
    // Para que la nave no se pase de los límites del canvas
    console.log(canvas.width / 7);
    console.log(xNave);
    // if(yNave <= canvas.height / 10 && xNave + 50 >= 71.42857142857143 && xNave + 50 <= 71.42857142857143 * 2 ||  yNave <= canvas.height / 10 && xNave >= 71.42857142857143 * 3 && xNave <= 71.42857142857143 * 4)
    // {
    //     yNave = canvas.height / 10;
    // }
    if(yNave <= canvas.height / 10 && xNave + 50 >= canvas.width / 7 && xNave <= canvas.width / 7 * 2 || yNave <= canvas.height / 10 && xNave + 50 >= canvas.width / 7 * 3 && xNave <= canvas.width / 7 * 4 || yNave <= canvas.height / 10 && xNave + 50 >= canvas.width / 7 * 5 && xNave <= canvas.width / 7 * 6)
    {
        yNave = canvas.height / 10;
    }
    if(yNave <= canvas.height / 10 * 2 && xNave + 50 >= 0 && xNave <= canvas.width / 7 || yNave <= canvas.height / 10 * 2 && xNave + 50 >= canvas.width / 7 * 2 && xNave <= canvas.width / 7 * 3 || yNave <= canvas.height / 10 * 2 && xNave + 50 >= canvas.width / 7 * 6 && xNave <= canvas.width / 7 * 7)
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
    //Colisión con obstáculos


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
    ctx.fillRect(xUfo, yUfo, 50, 45);
    xUfo = xUfo - 2;
    if(roca == 1)
    {
        xRoca = xRoca - 2;
        ctx.fillStyle = "#3BBB59";
        ctx.fillRect(xRoca, yRoca, 50, 45);
        if(xRoca == 0)
        {
            xRoca = 500;
            yRoca = Math.random() * (415 - canvas.height / 10 * 2) + canvas.height / 10 * 2;
        }
    }
    //Cuando ufo llega al final
    if(xUfo + 50 == 0)
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
}, tempo);