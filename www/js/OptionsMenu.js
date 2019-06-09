//
// Author: Alejandro Benítez López
//
// © benitezdev 2019 (benitezdev.com)
// Creative Commons License:
// Attribution 4.0 International (CC BY 4.0)
//


function OptionsMenu(active, position, img, width, height, scale) {

    this.active = active;

    if (!scale) scale = 1;
    this.scale = scale;

    this.img = img;

    this.width = width;
    this.height = height;

    this.halfWidth = width / 2;
    this.halfHeight = height / 2;

    this.position = position;

    this.rectangle = {
        position: new Vector2(this.position.x - this.halfWidth, this.position.y - this.halfHeight),
        width: Canvas._canvas.width,
        height: Canvas._canvas.height
    }


    this.start();

}


OptionsMenu.prototype.start = function () {

    this.position = new Vector2(this.position.x - this.halfWidth, this.position.y - this.halfHeight);

}


OptionsMenu.prototype.update = function () {

    if (this.active && input.tap.pressed)
        PoolGame.ChangeSceneTo(scenesTAGs.GAME);

}



OptionsMenu.prototype.draw = function () {

    if (this.active)
        Canvas.drawImage(this.img, this.position);

}

OptionsMenu.prototype.show = function () {

    this.active = true;

}



OptionsMenu.prototype.hide = function () {

    this.active = false;

}