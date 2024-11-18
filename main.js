const body = document.querySelector('body');
body.style.backgroundColor = '#40c082';

const eyeCanvas = document.querySelector('#eye-canvas');
eyeCanvas.width = 500;
eyeCanvas.height = 400;
const eyeCtx = eyeCanvas.getContext("2d");

const sclera = document.querySelector('#sclera-img');
const iris = document.querySelector('#iris-img');
const chain = document.querySelector('#chain-img');
const eyeCover1 = document.querySelector('#eye-cover-1-img');
const eyeCover2 = document.querySelector('#eye-cover-2-img');
const eyeCover3 = document.querySelector('#eye-cover-3-img');

let eyeCover = eyeCover1;
let currentPage = 'drawings';

const chainCanvas = document.querySelector('#chain-canvas');
const chainCtx = eyeCanvas.getContext("2d");
chainCtx.drawImage(chain, 0, 0, chainCanvas.width, chainCanvas.height);

const pageSwitch = () => {
    console.log(currentPage);
    if (currentPage == 'design') {
        currentPage = 'drawings';
        body.style.backgroundColor = '#000';
        eyeCover = eyeCover2;
        document.querySelector("#drawings").style.display = 'grid';
        document.querySelector("#designs-heading").style.display = 'none';
        document.querySelector("#design").style.display = 'none';
        document.querySelector("#drawings-heading").style.display = 'block';
        // iris = document.querySelector('#mini-iris-img');
        renderEye();
        return;
    }
    if (currentPage == 'drawings') {
        currentPage = 'design';
        body.style.backgroundColor = '#d560a4';
        eyeCover = eyeCover3;
        document.querySelector("#drawings").style.display = 'none';
        document.querySelector("#drawings-heading").style.display = 'none';
        document.querySelector("#design").style.display = 'grid';
        document.querySelector("#designs-heading").style.display = 'block';
        // iris = document.querySelector('#iris-img');
        renderEye();
        return;
    }
    console.log('ish');
}

eyeCanvas.onclick = () => {
    body.style.backgroundColor = '#000';
    body.style.color = '#fff';
    eyeCover = eyeCover2;
    currentPage = 'drawings';
    document.querySelector("#title").hidden = true;
    document.querySelector("#drawings-heading").style.display = 'block';
    document.querySelector("#drawings").style.display = 'grid';
    // iris = document.querySelector('#mini-iris-img');
    renderEye();
    eyeCanvas.onclick = pageSwitch;
}

function clearCanvas(){
    eyeCtx.fillStyle = document.querySelector('body').style.getPropertyValue('background-color'); 
    eyeCtx.fillRect(0, 0, eyeCanvas.width, eyeCanvas.height);
}

function firstRender(){
    clearCanvas();
    eyeCtx.drawImage(sclera, 0, 0, eyeCanvas.width, eyeCanvas.height);
    eyeCtx.drawImage(iris, 0, 0, eyeCanvas.width, eyeCanvas.height);
    eyeCtx.drawImage(eyeCover, 0, 0, eyeCanvas.width, eyeCanvas.height);
}

const checkLimits = (value, limit) => {
    if (value > limit) {
        value = limit;
    }
    if (value < -limit) {
        value = -limit;
    }
    return value;
}

function renderEye(){
    clearCanvas();
    let irisX = (event.pageX / ((window.innerWidth/2) / 310)) -155;
    let irisY = (event.pageY / ((window.innerHeight/1.2) / 150)) -95;
    irisX = checkLimits(irisX, 155);
    irisY = checkLimits(irisY, 75);
    eyeCtx.drawImage(sclera, 0, 0, eyeCanvas.width, eyeCanvas.height);
    eyeCtx.drawImage(iris, irisX, irisY, eyeCanvas.width, eyeCanvas.height);
    eyeCtx.drawImage(eyeCover, 0, 0, eyeCanvas.width, eyeCanvas.height);
}
window.addEventListener("mousemove", renderEye, false);
firstRender();