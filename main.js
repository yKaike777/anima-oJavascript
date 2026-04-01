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

function drawFrame(posX, posY, canvasX, canvasY){
    context.drawImage(img, posX * width, posY * height, width, height, canvasX, canvasY, scaledWidth, scaledHeight);
}

const images = [0, 1, 2, 3, 4, 5, 6];
let indexImage = 0;
let counter = 0;
let currentDirection = 0;

function nextAnimation(){
    currentDirection++;
    
    console.log("Index Image: " + indexImage);
    console.log("Current Direction: " + currentDirection);
}
function previousAnimation(){
    if (currentDirection > 0){
        currentDirection--;
        
        console.log("Index Image: " + indexImage);
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
        }

        if (currentDirection === 1){
            currentDirection = 3;
            console.log("Pulou para a direção " + currentDirection);
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