

// FPS
let time = 0;
let FPS = 60;
let frames = 0;
let acumDelta = 0;
let targetDT = 0;
let deltatime;
let deltatimeSeconds = 0;


function fps() {

}

fps.prototype.computeFPS = function () {

    deltatimeSeconds = 1 / FPS;

    // Compute FPS
    var now = Date.now();
    deltaTime = now - time;

    // If the time is greater than 1 sec is discarded
    if (deltaTime > 1000)
        deltaTime = 0;
    time = now;

    frames++;
    acumDelta += deltaTime;

    if (acumDelta > 1000) {
        FPS = frames;
        frames = 0;
        acumDelta -= 1000;
    }

    targetDT = (1 / FPS * 1000);
    
}

fps.prototype.draw = function (color) {

    color = typeof color !== 'undefined' ? color : 'black';
    Canvas.drawText('FPS: ' + FPS, { x: 80, y: 465 }, 30, color);
    Canvas.drawText('deltaTime: ' + Math.round(1000 / deltaTime), { x: 130, y: 465 }, 30, color);

}