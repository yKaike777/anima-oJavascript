let img = new Image();
img.src = './assets/shadow_dog.png';
img.onload = function(){
    init();
}

let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
const scale = 4;
const width = 100;
const height = 92;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

let isFacingLeft = false;

function drawFrame(posX, posY, canvasX, canvasY){
    context.save();

    if (isFacingLeft) {
        context.translate(canvasX + scaledWidth, canvasY);
        context.scale(-1, 1);
        context.drawImage(img, posX * width, posY * height, width, height, 10, 30, scaledWidth, scaledHeight);
    } else {
        context.translate(canvasX, canvasY);
        context.drawImage(img, posX * width, posY * height, width, height, 10, 30, scaledWidth, scaledHeight);
    }

    context.restore();
}

const images = [0, 1, 2, 3, 4, 5, 6];
const states = ["idle", "jump", "walk", "damage", "rolling"];
let indexImage = 0;
let counter = 0;
let currentDirection = 0;

console.log("Current Direction: " + currentDirection);

function nextAnimation(){
    currentDirection++;
    
    console.log("Current Direction: " + currentDirection);
}

// IR PRA DIREITA
document.addEventListener('keydown', (e) => {
    if(e.key === "d"){
        isFacingLeft = false;
        currentDirection = 3;
        console.log("Current Direction: " + currentDirection + ", facing left: " + isFacingLeft);
    }
});

document.addEventListener('keyup', (e) => {
    if(e.key === "d"){
        currentDirection = 0;
        console.log("Current Direction: " + currentDirection + ", facing left: " + isFacingLeft);
    }
})

// IR PRA ESQUERDA
document.addEventListener('keydown', (e) => {
    if(e.key === "a"){
        isFacingLeft = true;
        currentDirection = 3;
        console.log("Current Direction: " + currentDirection + ", facing left: " + isFacingLeft);
    }
})

document.addEventListener('keyup', (e) => {
    if(e.key === "a"){
        currentDirection = 0;
        console.log("Current Direction: " + currentDirection + ", facing left: " + isFacingLeft);
    }
})

// PULAR
document.addEventListener('keypress', (e) => {
    if(e.key === " " || e.key === "w"){
        currentDirection = 1;
        console.log("Current Direction: " + currentDirection);
    }
})

function previousAnimation(){
    if (currentDirection > 0 && currentDirection !== 3){
        currentDirection--;
        
        console.log("Current Direction: " + currentDirection);
    } else if(currentDirection === 3){
        currentDirection = 0;
        console.log("Current Direction: " + currentDirection);
    }
}

function step(){
    counter++;
    if (counter < 8){
        window.requestAnimationFrame(step);
        return;
    }

    counter = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawFrame(images[indexImage], currentDirection, 0, 0);

    indexImage++;
    if (indexImage >= images.length) {
        indexImage = 0;

        if (currentDirection === 5){
            currentDirection++;
            console.log("Skip to direction: " + currentDirection);
        }

        if (currentDirection === 1){
            currentDirection = 2;
            console.log("Skip to direction: " + currentDirection);
        }

        if (currentDirection === 2){
            setTimeout(() => {
                currentDirection = 0;
                console.log("Skip to direction: " + currentDirection);
            }, 250)
        }

        if (currentDirection > 6){
            currentDirection = 0;
        }
    }
    
    window.requestAnimationFrame(step);
}

function init(){
    window.requestAnimationFrame(step);
}