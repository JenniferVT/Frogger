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

    ctx.fillStyle = "#B489E9"
    ctx.fillRect(0, 0, canvas.width, canvas.height / 10);
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
        console.log("Arriba");
        naveOnU = 1;
    }
    if(evento.key == "a" || evento.key == "A")
    {
        console.log("Izquierda");
        naveOnL = 1;
    }
    if(evento.key == "d" || evento.key == "D")
    {
        console.log("Derecha");
        naveOnR = 1;
    }
    if(evento.key == "s" || evento.key == "S")
    {
        console.log("Abajo");
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
    ctx.fillStyle = "#666970";
    ctx.fillRect(xUfo, yUfo, 50, 45);
    xUfo = xUfo - 2;
    if(roca == 1)
    {
        console.log(roca);
        xRoca = xRoca - 2;
        ctx.fillStyle = "#3BBB59";
        ctx.fillRect(xRoca, yRoca, 50, 45);
        if(xRoca == 0)
        {
            xRoca = 500;
            yRoca = Math.random() * (415 - canvas.height / 10) + canvas.height / 10;
        }
    }
    //Cuando ufo llega al final
    if(xUfo + 50 == 0)
    {
        xUfo = 500;
        yUfo = Math.random() * (415 - canvas.height / 10) + canvas.height / 10;
        control++;
        console.log(control);
        //roca = 0;
        //Cuando haya pasado 5 veces ufo de izquierda a derecha roca se activa
    }
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