

function Hole(position, radius) {

    this.position = position;
    this.radius = radius;

    this.sfx = audio.hit;
}

Hole.prototype.start = function () {

}

Hole.prototype.update = function () {

    // Check if a ball has entered a hole
    currentScene.ballPools.forEach(ball => {
        if (CircleInsideCircle(this.position, this.radius, ball.position, ball.radius * ball.scale)) {

            if (ball.owner == 'player1') {
                currentScene.scores[0].addOnePoint(ball.img);
            } else if (ball.owner == 'player2')
                currentScene.scores[1].addOnePoint(ball.img);
            else {
                // rare rare case... just in case...
                currentScene.createBallInCenter(ball.img);
            }

            currentScene.ballPools.splice(currentScene.ballPools.indexOf(ball), 1);
            PoolGame.world.DestroyBody(ball.collider);
            audioManager.playFx(audio.hole, 1);

        }

    });

}


Hole.prototype.draw = function () {

    Canvas._ctx.save();
    Canvas._ctx.beginPath();
    Canvas._ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    Canvas._ctx.closePath();
    Canvas._ctx.stroke();
    Canvas._ctx.restore();

}

