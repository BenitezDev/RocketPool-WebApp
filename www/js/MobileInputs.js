
//////////////////////////////////////////
function holdit(btn, action, start, speedup) {
    var t;
    var repeat = function () {
        action();
        t = setTimeout(repeat, start);
        start = start / speedup;

    }

    btn.mousedown = function () {
        repeat();
    }

    btn.mouseup = function () {
        clearTimeout(t);
    }

    console.log(btn.onclick);

};

/////////////////////////////////////////////////////////////////

// Player 1
let movingfLeft1 = false;
let movingfRight1 = false;
let movingForware1 = false;
let movingBackwards1 = false;

// Player 2
let movingfLeft2 = false;
let movingfRight2 = false;
let movingForware2 = false;
let movingBackwards2 = false;

function MobileInputs(){
    
    // Player 1
    this.l1 = document.getElementById('L1');
    this.L1 = new Hammer.Manager(this.l1);
    this.L1.add(new Hammer.Press({
        event: 'press',
        pointer: 1,
        threshold: 1000,
        time: 1,
    }));

    this.r1 = document.getElementById('R1');
    this.R1 = new Hammer.Manager(this.r1);
    this.R1.add(new Hammer.Press({
        event: 'press',
        pointer: 1,
        threshold: 1000,
        time: 1,
    }));

    this.f1 = document.getElementById('F1');
    this.F1 = new Hammer.Manager(this.f1);
    this.F1.add(new Hammer.Press({
        event: 'press',
        pointer: 1,
        threshold: 1000,
        time: 1,
    }));

    this.b1 = document.getElementById('B1');
    this.B1 = new Hammer.Manager(this.b1);
    this.B1.add(new Hammer.Press({
        event: 'press',
        pointer: 1,
        threshold: 1000,
        time: 1,
    }));

    // Player 2
    this.l2 = document.getElementById('L2');
    this.L2 = new Hammer.Manager(this.l2);
    this.L2.add(new Hammer.Press({
        event: 'press',
        pointer: 1,
        threshold: 1000,
        time: 1,
    }));

    this.r2 = document.getElementById('R2');
    this.R2 = new Hammer.Manager(this.r2);
    this.R2.add(new Hammer.Press({
        event: 'press',
        pointer: 1,
        threshold: 1000,
        time: 1,
    }));

    this.f2 = document.getElementById('F2');
    this.F2 = new Hammer.Manager(this.f2);
    this.F2.add(new Hammer.Press({
        event: 'press',
        pointer: 1,
        threshold: 1000,
        time: 1,
    }));

    this.b2 = document.getElementById('B2');
    this.B2 = new Hammer.Manager(this.b2);
    this.B2.add(new Hammer.Press({
        event: 'press',
        pointer: 1,
        threshold: 1000,
        time: 1,
    }));



    this.start();
}


MobileInputs.prototype.start = function (){

    // Player 1
    this.L1.on("press", function (ev) {
           movingfLeft1 = true;
    });
    this.L1.on("pressup",function (ev) {
        movingfLeft1 = false;
    });

    this.R1.on("press", function (ev) {
        movingfRight1 = true;
    });
    this.R1.on("pressup",function (ev) {
        movingfRight1 = false;
    });

    this.F1.on("press", function (ev) {
        movingForware1 = true;
    });
    this.F1.on("pressup",function (ev) {
        movingForware1 = false;
    });
    
    this.B1.on("press", function (ev) {
        movingBackwards1 = true;
    });
    this.B1.on("pressup",function (ev) {
        movingBackwards1 = false;
    });

    // Player 2
    this.L2.on("press", function (ev) {
        movingfLeft2 = true;
    });
    this.L2.on("pressup",function (ev) {
        movingfLeft2 = false;
    });

    this.R2.on("press", function (ev) {
        movingfRight2 = true;
    });
    this.R2.on("pressup",function (ev) {
        movingfRight2 = false;
    });

    this.F2.on("press", function (ev) {
        movingForware2 = true;
    });
    this.F2.on("pressup",function (ev) {
        movingForware2 = false;
    });
    
    this.B2.on("press", function (ev) {
        movingBackwards2 = true;
    });
    this.B2.on("pressup",function (ev) {
        movingBackwards2 = false;
 });

}


MobileInputs.prototype.update = function(){
    
    // Game Scene
    if(currentScene ==PoolGame.scenes[scenesTAGs.GAME]){
        // if(movingfLeft1 == true){
        //     currentScene.car.moveLeft(currentScene.car);
        // }
        // if(movingfRight == true){
        //     currentScene.car.moveRight(currentScene.car);
        // }
        // if(movingForware == true){
        //     currentScene.car.moveForward(currentScene.car);
        // }
        // if(movingBackwards == true){
        //     currentScene.car.moveBackward(currentScene.car);
        // }

        if(!movingfLeft1 && !movingfRight1){
            currentScene.car.stopEngine();
        }
        currentScene.car.pressingForward = movingForware1;
        currentScene.car.pressingBackward = movingBackwards1;
        currentScene.car.pressingLeft = movingfLeft1;
        currentScene.car.pressingRight = movingfRight1;

        if(!movingfLeft2 && !movingfRight2){
            currentScene.car.stopEngine();
        }
        currentScene.car2.pressingForward = movingForware2;
        currentScene.car2.pressingBackward = movingBackwards2;
        currentScene.car2.pressingLeft = movingfLeft2;
        currentScene.car2.pressingRight = movingfRight2;

    }
    
}

