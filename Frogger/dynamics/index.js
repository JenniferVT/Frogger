const divBoard = document.getElementById("div-board");
const divStart = document.getElementById("div-start");
const divRoad = document.getElementById("div-road");
const divGrass = document.getElementById("div-grass");
const divWater = document.getElementById("div-water");
const divGoal = document.getElementById("div-goal");
const divFrog = document.getElementById("div-frog");

let animating = false;
const jumpFrogAnimation = (delta) => {
  if (!animating) {
    const spriteSheetFrogWidth = 400;
    const eachSpriteFrogWidth = 57.2;
    const diff = eachSpriteFrogWidth;
    const speed = 50;
    let spriteCount = 0;
    let spritePosition = eachSpriteFrogWidth;
    const initialFrogPosition = {
      top: parseInt(
        divFrog.style.top ? divFrog.style.top.replace("px", "") : 0
      ),
      left: parseInt(
        divFrog.style.left ? divFrog.style.left.replace("px", "") : 0
      ),
    };
    let frogPosition = {
      top: parseInt(
        divFrog.style.top ? divFrog.style.top.replace("px", "") : 0
      ),
      left: parseInt(
        divFrog.style.left ? divFrog.style.left.replace("px", "") : 0
      ),
    };
    let interval = setInterval(() => {
      animating = true;
      spriteCount++;
      divFrog.style.backgroundPosition = `-${spritePosition}px ${0}px`;
      if (spritePosition < spriteSheetFrogWidth) {
        spritePosition = spritePosition + diff;
      } else {
        spritePosition = eachSpriteFrogWidth;
        animating = false;
        clearInterval(interval);
      }
      if (spriteCount === 2) {
        frogPosition.top = frogPosition.top + delta / 13;
      } else if (spriteCount === 3) {
        frogPosition.top = frogPosition.top + delta / 11;
      } else if (spriteCount === 4) {
        frogPosition.top = frogPosition.top + delta / 9;
      } else if (spriteCount === 5) {
        frogPosition.top = frogPosition.top + delta / 7;
      } else if (spriteCount === 6) {
        frogPosition.top = frogPosition.top + delta / 5;
      } else if (spriteCount === 7) {
        frogPosition.top = initialFrogPosition.top + delta;
      }
      divFrog.style.top = `${frogPosition.top}px`;
    }, speed);
  }
};

divBoard.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp" && divFrog.style.top !== "0px") {
    divFrog.style.background =
      'url("statics/images/frog-sprite-forward.png") 0px 0px';
    jumpFrogAnimation(-75);
  } else if (e.key === "ArrowDown" && divFrog.style.top !== "675px") {
    divFrog.style.background =
      'url("statics/images/frog-sprite-back.png") 0px 0px';
    jumpFrogAnimation(75);
  }
});

// Dibuja la linea de inicio
for (let i = 0; i < 10; i++) {
  const div = document.createElement("div");
  div.classList.add("grass");
  div.style.left = `${i * 75}px`;
  divStart.appendChild(div);
}
// Dibuja las lineas del camino
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 4; j++) {
    const div = document.createElement("div");
    div.classList.add("road");
    div.style.left = `${i * 75}px`;
    div.style.top = `${j * 75}px`;
    divRoad.appendChild(div);
  }
}
// Dibuja una linea de pasto
for (let i = 0; i < 10; i++) {
  const div = document.createElement("div");
  div.classList.add("grass");
  div.style.left = `${i * 75}px`;
  divGrass.appendChild(div);
}
// Dibuja las lineas de agua
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 4; j++) {
    const div = document.createElement("div");
    div.classList.add("water");
    div.style.left = `${i * 75}px`;
    div.style.top = `${j * 75}px`;
    divWater.appendChild(div);
  }
}
// Dibuja la linea de meta
for (let i = 0; i < 10; i++) {
  const div = document.createElement("div");
  div.classList.add("grass");
  div.style.left = `${i * 75}px`;
  divGoal.appendChild(div);
}

divBoard.focus();
