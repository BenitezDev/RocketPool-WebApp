// Load all the assets before starting starting the game

var sprites = {};
var audio = {};
var assetsStillLoading = 0;

function assetsLoadingLoop(callback) {

    if (assetsStillLoading) {
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
    }
    else {
        callback();
    }

}

function loadAssets(callback) {

    function loadSprite(fileName) {

        //Canvas.drawText(1 + "%");

        assetsStillLoading++;

        let spriteImage = new Image();
        spriteImage.src = "./assets/sprites/" + fileName;

        spriteImage.onload = function () {
            assetsStillLoading--;
        }

        return spriteImage;

    }


    function loadAudio(fileName, volume) {

        //assetsStillLoading++;

        let audio = new Audio("./assets/audio/" + fileName);
        audio.volume = volume;

        // audio.src = "./assets/audio/" + fileName;
        // audio.oncanplaythrough  = function () {
        //     assetsStillLoading--;
        //     audio.play();
        // }

        // audio.addEventListener("oncanplaythrough ", function () {
        //     assetsStillLoading--;
        //     audio.play();
        // });


        // audio.oncanplaythrough  = function () {
        //     assetsStillLoading--;
        // }

        return audio;
    }

    // Sprites
    sprites.background = loadSprite('background.png');
    sprites.car = loadSprite('car_1.png');
    sprites.car_2 = loadSprite('car_2.png');
    sprites.wheel = loadSprite('wheel.png')
    sprites.ball_1 = loadSprite('ball_1.png');
    sprites.ball_2 = loadSprite('ball_2.png');
    sprites.ball_3 = loadSprite('ball_3.png');
    sprites.ball_4 = loadSprite('ball_4.png');
    sprites.ball_5 = loadSprite('ball_5.png');
    sprites.ball_6 = loadSprite('ball_6.png');
    sprites.ball_7 = loadSprite('ball_7.png');
    sprites.ball_8 = loadSprite('ball_8.png');
    sprites.ball_9 = loadSprite('ball_9.png');
    sprites.left_arrow = loadSprite('flecha_izq.png');
    sprites.start_game = loadSprite('start_game.png');
    sprites.options = loadSprite('options.png');
    sprites.menu_background = loadSprite('menu_background.png');
    sprites.win_scene = loadSprite('win_screen.png');

    // Audio
    audio.main_Theme = loadAudio('main_theme.mp3', 0.5);
    audio.hit = loadAudio('hit.wav', 1);
    audio.balls_collide = loadAudio('balls_collide.wav', 1);
    audio.table_hit = loadAudio('table_hit.wav', 1);
    audio.strike = loadAudio('strike.wav', 1);
    audio.hole = loadAudio('hole.wav', 1);
    audio.pitido_futbol = loadAudio('pitido_futbol.mp3',1);

    assetsLoadingLoop(callback);

}