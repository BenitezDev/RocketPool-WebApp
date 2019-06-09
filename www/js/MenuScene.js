//
// Author: Alejandro Benítez López
//
// © benitezdev 2019 (benitezdev.com)
// Creative Commons License:
// Attribution 4.0 International (CC BY 4.0)
//


function MenuScene() {

    this.startButton = null;
    this.optionsButton = null;
    this.menuOptions = null;
    this.background = null;

}

MenuScene.prototype.start = function () {

    this.background = sprites.rocket_pool;

    this.menuOptions =
        new OptionsMenu(
            false,
            Canvas.centerPoint,
            sprites.controles,
            sprites.controles.width,
            sprites.controles.height,
            1
        );


    this.startButton =
        new Button(
            Canvas.centerPoint,
            sprites.start_game,
            sprites.start_game.width,
            sprites.start_game.height,
            1,
            PoolGame.ChangeSceneTo,
            scenesTAGs.GAME
        );

    this.optionsButton =
        new Button(
            new Vector2(
                Canvas._canvas.width / 2, (Canvas._canvas.height / 2) + 80),
            sprites.options,
            sprites.options.width,
            sprites.options.height,
            1,
            MenuScene.prototype.activeElement,
            this.menuOptions
        );

}

MenuScene.prototype.update = function () {

    this.optionsButton.update();
    this.startButton.update();

    // Need to check because when the scene is unload, it can perform this.menuOptions.update();
    if (this.menuOptions != null)
        this.menuOptions.update();


};


MenuScene.prototype.draw = function () {

    Canvas.drawImageFill(this.background);

    this.startButton.draw();
    this.optionsButton.draw();

    this.menuOptions.draw();

};

MenuScene.prototype.activeElement = function (element) {

    element.show();

}
MenuScene.prototype.desactiveElement = function (element) {

    element.hide();

}

MenuScene.prototype.unloadScene = function () {

    this.startButtonFunction = null;
    this.startButton = null;


    this.optionsButton = null;
    this.menuOptions = null;
    this.background = null;

}

