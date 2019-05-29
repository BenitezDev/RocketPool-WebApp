// contain all objects of the game, in each frame update and draw them on canvas





function MenuScene() {

    this.startButton = null;
    this.optionsButton = null;
    this.menuOptions = null;

}

MenuScene.prototype.start = function () {

    this.menuOptions =
        new OptionsMenu(
            false,
            Canvas.centerPoint,
            sprites.menu_background,
            sprites.menu_background.width,
            sprites.menu_background.height,
            1
        );
    this.f = this.menuOptions.show;

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


    console.log(this.menuOptions.show)


}

MenuScene.prototype.update = function () {

   
    
    this.optionsButton.update();
    this.startButton.update();
    // Need to check because when the scene is unload, it can perform this.menuOptions.update();
    if(this.menuOptions != null)
        this.menuOptions.update();
    
};


MenuScene.prototype.draw = function () {

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

    this.startButtonFunction = function () { };
    this.startButton = null;


    this.optionsButton = null;
    this.menuOptions = null;

}
