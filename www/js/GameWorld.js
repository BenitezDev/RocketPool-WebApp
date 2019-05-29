// contain all objects of the game, in each frame update and draw them on canvas

let ballPools = [];
let holes = [];

let car = null;
let car2 = null;

function GameWorld() {

}

GameWorld.prototype.start = function () {

  // Create the cars
  car = new Car(
    sprites.car,
    { x: 150, y: 190 },
    KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN
  );
  car2 = new Car(
    sprites.car_2,
    { x: 150, y: 290 },
    KEY_A, KEY_D, KEY_W, KEY_S
  );

  // Create the ball pool
  ballPools.push(
    new Ball(
      sprites.ball_1,
      { x: 550, y: 240 },
      { x: sprites.ball_1.width / 2, y: sprites.ball_1.height / 2 },
      68,
      0.3)
  );
  ballPools.push(
    new Ball(
      sprites.ball_2,
      { x: 585, y: 220 },
      { x: sprites.ball_2.width / 2, y: sprites.ball_2.height / 2 },
      68,
      0.3)
  );
  ballPools.push(
    new Ball(
      sprites.ball_3,
      { x: 585, y: 260 },
      { x: sprites.ball_3.width / 2, y: sprites.ball_3.height / 2 },
      68,
      0.3)
  );

  // Create the holes
  holes.push(new Hole({ x: 0, y: 0 }, 25));
  holes.push(new Hole({ x: 400, y: 0 }, 5));
  holes.push(new Hole({ x: 800, y: 0 }, 25));
  holes.push(new Hole({ x: 0, y: 480 }, 25));
  holes.push(new Hole({ x: 400, y: 480 }, 5));
  holes.push(new Hole({ x: 800, y: 480 }, 25));

}

GameWorld.prototype.update = function () {

  input.update();

  car.update();
  car2.update();

  // Update all Balls
  ballPools.forEach(ball => ball.update());

  // Update holes. AKA check if a ball has entered a hole
  holes.forEach(hole => hole.update());

  // Last method
  input.postUpdate();

};

GameWorld.prototype.draw = function () {

  // 1º background img
  Canvas.drawImage(sprites.background, { x: 0, y: 0 }, 0, 1, { x: 0, y: 0 });

  // 2º Cars
  car.draw();
  car2.draw();

  // 3º Draw all Balls
  ballPools.forEach(ball => ball.draw());

  // 4º Holes Debug
  holes.forEach(hole => hole.draw());

  // 5º Box2d Debug
  world.DrawDebugData();  // Comment this line to disable Visual Debug Physics

};

