



function OptionsMenu(active, position, img, width, height, scale) {

    // if (!position) position = new Vector2();
    // this.position = position;
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

    // if (!aux) aux = "hola mundo";
    // this.aux = aux;

    // if (!onclick) onclick = function () { alert(aux) };
    // this.onclick = onclick;

    this.start();

}


OptionsMenu.prototype.start = function () {
    this.position = new Vector2(this.position.x - this.halfWidth, this.position.y - this.halfHeight);
}


OptionsMenu.prototype.update = function () {

    if (this.active && /*input.isKeyDown(KEY_SCAPE)*/input.tap.pressed) {
        //this.hide();
        PoolGame.ChangeSceneTo(scenesTAGs.GAME);
    }

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