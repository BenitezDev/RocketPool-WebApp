//
// Author: Alejandro Benítez López
//
// © benitezdev 2019 (benitezdev.com)
// Creative Commons License:
// Attribution 4.0 International (CC BY 4.0)
//



const scenesTAGs = {
    INTRO: 0,
    GAME: 1
}

let currentScene = null;

let PoolGame = new Game();

let audioManager = null;

let mobileInputs = null;



function Game() {

    this.scenes = [];
    this.activeScene = scenesTAGs.INTRO;

}


Game.prototype.init = function () {

    PoolGame.scenes.push(new MenuScene());
    PoolGame.scenes.push(new GameScene());

    // Audio Background
    PoolGame.backgroundAudio = audio.main_Theme;
}


Game.prototype.start = function () {

    PoolGame.init();

    // Prevent right click
    document.addEventListener('contextmenu', event => event.preventDefault());

    PoolGame.SetupInput();

    mobileInputs = new MobileInputs();

    PoolGame.PrepareAudioManager();

    PoolGame.CreateFPSmanager();

    currentScene = PoolGame.scenes[PoolGame.activeScene];

    PoolGame.scenes[PoolGame.activeScene].start();


    PoolGame.mainLoop();

}


Game.prototype.mainLoop = function () {

    Canvas.clear();

    // Fps
    PoolGame.fpsManager.computeFPS();

    // Physics
    if (PoolGame.world) {
        PoolGame.world.Step(0.2, 8, 3);
        PoolGame.world.ClearForces();
    }

    input.update();
    mobileInputs.update();


    // Current Scene
    currentScene.update();
    currentScene.draw();


    // Debug

    // if (input.isKeyPressed(KEY_1)) PoolGame.ChangeSceneTo(scenesTAGs.INTRO);
    // if (input.isKeyPressed(KEY_2)) PoolGame.ChangeSceneTo(scenesTAGs.GAME);

    //if (PoolGame.world) PoolGame.world.DrawDebugData(); // Visual Debug Physics
    //PoolGame.fpsManager.draw('pink'); // FPS Stats

    PoolGame.postUpdate();

    requestAnimationFrame(PoolGame.mainLoop, targetDT);

}

Game.prototype.postUpdate = function () {

    input.postUpdate();

}


Game.prototype.SetupInput = function () {

    // setup keyboard events
    SetupKeyboardEvents();

    // setup mouse events
    SetupMouseEvents();

}

Game.prototype.PreparePhysics = function () {

    // zero gravity (0,0)
    let gravity = new b2Vec2();

    PoolGame.world = CreateWorld(Canvas._ctx, gravity);

}

Game.prototype.CreateFPSmanager = function () {

    // FPS
    this.fpsManager = new fps();

}

Game.prototype.ChangeSceneTo = function (newScene) {

    if (newScene == PoolGame.activeScene) return;

    if (PoolGame.world)
        delete PoolGame.world

    currentScene.unloadScene();

    PoolGame.activeScene = newScene;
    currentScene = PoolGame.scenes[PoolGame.activeScene];

    currentScene.start();

}

Game.prototype.PrepareAudioManager = function () {

    audioManager = new AudioManager();
    audioManager.playBackgroundMusic(PoolGame.backgroundAudio, true);

}