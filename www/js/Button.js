


function Button(position, img, width, height, scale, onclick, aux, rotation) {
    this.rotation = typeof rotation !== 'undefined' ? rotation : null;
    if (!position) position = new Vector2();
    this.position = position;

    if (!scale) scale = 1;
    this.scale = scale;

    this.img = img;

    this.width = width;
    this.height = height;

    this.halfWidth = width / 2;
    this.halfHeight = height / 2;

    this.rectangle = {
        position: new Vector2(this.position.x - this.halfWidth, this.position.y - this.halfHeight),
        width: this.width,
        height: this.height
    }
    //if (!aux) aux = "hola mundo";
    this.aux = aux;

    if (!onclick) onclick = function () { alert(aux) };
    this.onclick = onclick;

    this.start();

}


Button.prototype.start = function () {

    this.position = new Vector2(this.position.x - this.halfWidth, this.position.y - this.halfHeight);

    this.enable();

}


Button.prototype.update = function () {

    if ( 
        PointInsideRectangle(input.tap, this.rectangle) /*&& input.tap.pressed*/|| 
        (PointInsideRectangle(input.mouse, this.rectangle) && input.mouse.pressed)
     ) {

        console.log("Click on button");
        this.onclick(this.aux);

    }

}

Button.prototype.enable = function(){
   // Canvas._canvas.addEventListener("mouseup", this.mouseUp.bind(this), false);
}

Button.prototype.disable = function(){
    //Canvas._canvas.removeEventListener("mouseup", this.mouseUp, false);
}


Button.prototype.draw = function () {

    Canvas.drawImage(this.img, this.position, this.rotation);


    // Canvas._ctx.beginPath();
    // Canvas._ctx.lineWidth = "1.5";
    // Canvas._ctx.strokeStyle = "green";
    // Canvas._ctx.rect(this.rectangle.position.x, this.rectangle.position.y, this.rectangle.width, this.rectangle.height);
    // Canvas._ctx.closePath();
    // Canvas._ctx.stroke();

}

Button.prototype.mouseUp = function () {
    
    // if (PointInsideRectangle(input.mouse, this.rectangle)) {
    //     console.log("Click on button " + this.mouseUp);
    //     this.onclick(this.aux);
    //     Canvas._canvas.removeEventListener("mouseup", this.mouseUp.bind(this), false);

    // }
}

