// contain all objects of the game, in each frame update and draw them on canvas



function GameScene() {

  this.ballPools = [];
  this.holes = [];

  this.car = null;
  this.car2 = null;

  this.scores = [];

  this.finalScreen = null;

}

GameScene.prototype.start = function () {

  // This scene requires Physics
  PoolGame.PreparePhysics();

  // Create the colliders of the Pool Table
  this.createTableColliders();

  // Create the cars
  this.car = new Car(
    sprites.car,
    { x: 150, y: 240 },
    'player1',
    KEY_A, KEY_D, KEY_W, KEY_S,
    'right'
  );
  this.car.body.SetUserData(this.car);

  this.car2 = new Car(
    sprites.car_2,
    { x: 650, y: 240 },
    'player2',
    KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN,
    'left'
  );
  this.car2.body.SetUserData(this.car2);

  //Create the ball pool
  this.instantiateBallsInCircle();


  this.ballPools.forEach(ball => { ball.collider.SetUserData(ball); });

  // Create the holes
  this.holes.push(new Hole({ x: 40, y: 40 }, 30));
  this.holes.push(new Hole({ x: 400, y: 37 }, 30));
  this.holes.push(new Hole({ x: 765, y: 45 }, 30));
  this.holes.push(new Hole({ x: 40, y: 440 }, 30));
  this.holes.push(new Hole({ x: 400, y: 447 }, 30));
  this.holes.push(new Hole({ x: 763, y: 437 }, 30));

  this.ballsToWin = 5;

  // Scores
  this.score1 = new ScoreManager(this.ballsToWin, { x: 120, y: 14 });
  this.score2 = new ScoreManager(this.ballsToWin, { x: 500, y: 14 });

  this.scores.push(this.score1);
  this.scores.push(this.score2);

  // Timer
  //pos, size, maxSeconds, color
  this.timer = new Timer(new Vector2(550,480), '45px', 61, 'white');


  // Final Screen
  this.finalScreen = {
      active: false,
      winner : '',
      winnerSecondLine : '',
      winnerPos : new Vector2(200, Canvas.centerPoint.y - 120),
      winnerPosSecondLine : new Vector2(200, Canvas.centerPoint.y - 90),
      //position, img, width, height, scale, onclick, aux, rotation
      mainMenuButton : new Button(
        {x:480,y:380},
        sprites.start_game,
        sprites.start_game.width,
        sprites.start_game.height,
        1,
        PoolGame.ChangeSceneTo,
        scenesTAGs.INTRO
      ),
      backgroundImg : sprites.win_scene,

      // enable: function(){
      //     if(this.score1.)
      // },
      update : function(){
        if(this.active)
        this.mainMenuButton.update();
      },

      draw : function (){
        if(this.active){
         
          Canvas.semiTrasparentRect();
          
          Canvas.drawImage(this.backgroundImg, Canvas.centerPoint,0,1,new Vector2(this.backgroundImg.width/2, this.backgroundImg.height/2 ));
          
          // text, position, fontsize, color
          Canvas.drawText(this.winner, this.winnerPos, '30px', 'yellow');
          Canvas.drawText(this.winnerSecondLine, this.winnerPosSecondLine, '30px', 'yellow');
          
          this.mainMenuButton.draw();
          
        }
        
      }
  }
}

GameScene.prototype.update = function () {

  // Cars
  this.car.update();
  this.car2.update();

  // Update all Balls
  this.ballPools.forEach(ball => ball.update());

  // Update holes. AKA check if a ball has entered a hole
  this.holes.forEach(hole => hole.update());


  //this.scores.forEach(score => score.update());

  this.finalScreen.update();

  // Stop Countdown if there is a winner
  if(!this.finalScreen.active)
  {
    this.timer.update();
  }

};


GameScene.prototype.draw = function () {

  // 1º background img
  Canvas.drawImage(sprites.background, { x: 0, y: 0 }, 0, 1, { x: 0, y: 0 });

  // 2º Cars
  this.car.draw();
  this.car2.draw();

  // 3º Draw all Balls
  this.ballPools.forEach(ball => ball.draw());

  // 4º Holes Debug
  this.holes.forEach(hole => hole.draw());

  // 5º Draw Score
  // Player 1
  //Canvas.drawText("Player 1: " + "X", { x: 80, y: 27 }, '25px', 'yellow');

  this.scores.forEach(score => {
    score.draw();

  });

  this.finalScreen.draw();

  this.timer.draw();
};


GameScene.prototype.createTableColliders = function () {

  this.tableColliders = [
    // left
    { body: CreateBox(PoolGame.world, 0, 240, 40, 165, { type: b2Body.b2_staticBody }), type: 'wall' },
    // right
    { body: CreateBox(PoolGame.world, 800, 240, 40, 165, { type: b2Body.b2_staticBody }), type: 'wall' },
    // left up
    { body: CreateBox(PoolGame.world, 220, 0, 150, 40, { type: b2Body.b2_staticBody }), type: 'wall' },
    // left down
    { body: CreateBox(PoolGame.world, 220, 480, 150, 40, { type: b2Body.b2_staticBody }), type: 'wall' },
    // right up
    { body: CreateBox(PoolGame.world, 583, 0, 150, 40, { type: b2Body.b2_staticBody }), type: 'wall' },
    // right down
    { body: CreateBox(PoolGame.world, 583, 480, 150, 40, { type: b2Body.b2_staticBody }), type: 'wall' },
    // left limit
    { body: CreateBox(PoolGame.world, 0, 240, 10, 240, { type: b2Body.b2_staticBody }), type: 'wall' },
    //right limit
    { body: CreateBox(PoolGame.world, 800, 240, 10, 240, { type: b2Body.b2_staticBody }), type: 'wall' },
    // bot limit
    { body: CreateBox(PoolGame.world, 400, 480, 390, 10, { type: b2Body.b2_staticBody }), type: 'wall' },
    // top limit
    { body: CreateBox(PoolGame.world, 400, 0, 390, 5, { type: b2Body.b2_staticBody }), type: 'wall' }
  ];
  this.tableColliders.forEach(coll => { coll.body.SetUserData(coll); });

}


GameScene.prototype.unloadScene = function () {

  this.ballPools = [];
  this.holes = [];
  this.tableColliders = [];
  this.car = null;
  this.car2 = null;
  this.scores = [];
  this.score1 = null;
  this.score2 = null;

}

GameScene.prototype.createBallInCenter = function (img) {
  this.ballPools.push(
    new Ball(
      img,
      { x: 400, y: 240 },
      { x: sprites.ball_3.width / 2, y: sprites.ball_3.height / 2 },
      68,
      0.3)
  );
  audioManager.playFx(audio.table_hit, 1); // Max volume is half max audio
}



GameScene.prototype.instantiateBallsInDiamond = function () {
  this.ballPools.push(
    new Ball(
      sprites.ball_5,
      { x: 400, y: 240 },
      { x: sprites.ball_1.width / 2, y: sprites.ball_1.height / 2 },
      68,
      0.3)
  );
  this.ballPools.push(
    new Ball(
      sprites.ball_7,
      { x: 400, y: 285 },
      { x: sprites.ball_2.width / 2, y: sprites.ball_2.height / 2 },
      68,
      0.3)
  );
  this.ballPools.push(
    new Ball(
      sprites.ball_3,
      { x: 400, y: 195 },
      { x: sprites.ball_3.width / 2, y: sprites.ball_3.height / 2 },
      68,
      0.3)
  );

  this.ballPools.push(
    new Ball(
      sprites.ball_2,
      { x: 360, y: 217.5 },
      { x: sprites.ball_3.width / 2, y: sprites.ball_3.height / 2 },
      68,
      0.3)
  );
  this.ballPools.push(
    new Ball(
      sprites.ball_4,
      { x: 360, y: 262.5 },
      { x: sprites.ball_3.width / 2, y: sprites.ball_3.height / 2 },
      68,
      0.3)
  );
  this.ballPools.push(
    new Ball(
      sprites.ball_6,
      { x: 440, y: 217.5 },
      { x: sprites.ball_3.width / 2, y: sprites.ball_3.height / 2 },
      68,
      0.3)
  );
  this.ballPools.push(
    new Ball(
      sprites.ball_8,
      { x: 440, y: 262.5 },
      { x: sprites.ball_3.width / 2, y: sprites.ball_3.height / 2 },
      68,
      0.3)
  );
  this.ballPools.push(
    new Ball(
      sprites.ball_1,
      { x: 320, y: 240 },
      { x: sprites.ball_1.width / 2, y: sprites.ball_1.height / 2 },
      68,
      0.3)
  );
  this.ballPools.push(
    new Ball(
      sprites.ball_9,
      { x: 480, y: 240 },
      { x: sprites.ball_1.width / 2, y: sprites.ball_1.height / 2 },
      68,
      0.3)
  );

}


GameScene.prototype.instantiateBallsInCircle = function () {

  // angle = 40º in rads
  const angle = (45 * 2 * Math.PI) / 360;
  let currentAngle = 0;
  let radius = 70;

  let imgBallPool = [sprites.ball_5, sprites.ball_4, sprites.ball_3, sprites.ball_2, sprites.ball_1, sprites.ball_8, sprites.ball_7, sprites.ball_6];


  for (let index = 0; index < 8; index++) {

    console.log("--" + currentAngle);
    let pos = {
      x: Math.sin(currentAngle) * radius + Canvas.centerPoint.x,
      y: Math.cos(currentAngle) * radius + Canvas.centerPoint.y
    };

    this.ballPools.push(
      new Ball(
        imgBallPool[index],
        { x: pos.x, y: pos.y },
        { x: sprites.ball_1.width / 2, y: sprites.ball_1.height / 2 },
        68,
        0.3)
    );
    currentAngle += angle;

  }
  this.createBallInCenter(sprites.ball_9);

}


GameScene.prototype.checkEndGame = function(){

  if(this.score1.currentPoints >= this.ballsToWin){
    this.finalScreen.winner = 'Player 1 wins!';
    this.finalScreen.active = true;
  } 
  else if(this.score2.currentPoints >= this.ballsToWin){
    this.finalScreen.winner = 'Player 2 wins!';
    this.finalScreen.active = true;
  }
  
}


