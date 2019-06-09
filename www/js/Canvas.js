//
// Author: Alejandro Benítez López
//
// © benitezdev 2019 (benitezdev.com)
// Creative Commons License:
// Attribution 4.0 International (CC BY 4.0)
//


function Canvas2D() {

  this._canvas = document.getElementById("myCanvas");
  this._ctx = this._canvas.getContext("2d");

  this.centerPoint = new Vector2(this._canvas.width / 2, this._canvas.height / 2);

}


Canvas2D.prototype.clear = function () {

  this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

};


Canvas2D.prototype.drawImage = function (image, position, angle, scale, origin) {

  if (!position) position = new Vector2();
  if (!origin) origin = new Vector2();

  this._ctx.save();

  this._ctx.translate(position.x, position.y);
  this._ctx.rotate(angle);
  this._ctx.scale(scale, scale);

  this._ctx.drawImage(image, -origin.x, -origin.y);

  this._ctx.restore();

};


// https://riptutorial.com/html5-canvas/example/19169/scaling-image-to-fit-or-fill-
Canvas2D.prototype.drawImageFill = function (img) {

  // get the scale
  var scale = Math.max(this._canvas.width / img.width, this._canvas.height / img.height);

  // get the top left position of the image
  var x = (this._canvas.width / 2) - (img.width / 2) * scale;
  var y = (this._canvas.height / 2) - (img.height / 2) * scale;
  this._ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

}


Canvas2D.prototype.drawText = function (text, position, fontsize, color) {

  position = typeof position !== 'undefined' ? position : new Vector2();
  color = typeof color !== 'undefined' ? color : 'black';

  fontname = "Courier New";

  this._ctx.save();

  this._ctx.translate(position.x, position.y);
  this._ctx.font = fontsize + " " + fontname;
  this._ctx.fillStyle = color;

  this._ctx.fillText(text, 0, 0);

  this._ctx.restore();

}

Canvas2D.prototype.drawDebugPoint = function (pos, radius) {

  this._ctx.save();

  this._ctx.fillStyle = "red";
  this._ctx.beginPath();
  this._ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
  this._ctx.fill();
  this._ctx.stroke();

  this._ctx.restore();

}

Canvas2D.prototype.semiTrasparentRect = function () {

  this._ctx.fillStyle = "rgba(0,0,0,0.6)";
  this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);

}

let Canvas = new Canvas2D();
