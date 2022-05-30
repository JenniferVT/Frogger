const canvas = document.getElementById("mi-canvas");
const ctx = canvas.getContext("2d");

let xRoca = 400;
let yRoca = 250;

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

window.setInterval(()=>{
    static();
    ctx.fillStyle = "#666970";
    ctx.fillRect(xRoca, yRoca, 50, 45);
    xRoca = xRoca - 2;
    if(xRoca + 50 == 0)
    {
        xRoca = 500;
        yRoca = Math.random() * (415 - canvas.height / 10) + canvas.height / 10;
    }

}, 10);