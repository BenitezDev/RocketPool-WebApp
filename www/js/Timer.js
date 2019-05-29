


function Timer(pos, size, maxSeconds, color){
    this.pos = pos;
    this.size = size;
    this.currentTime = maxSeconds;
    this.color = color;

    this.start();
}



Timer.prototype.start = function(){

}

Timer.prototype.update = function(){
    this.currentTime -= deltatimeSeconds;
    if(this.currentTime <= 0) 
    {
        audioManager.playFx(audio.pitido_futbol,1);
        //alert("lololo");

        if(currentScene == PoolGame.scenes[scenesTAGs.GAME]){
            currentScene.finalScreen.winner = 'Time out!';
            currentScene.finalScreen.active = true;

            
            if(currentScene.score1.currentPoints > currentScene.score2.currentPoints){
                currentScene.finalScreen.winnerSecondLine = ' Player1 wins!';
            }else if(currentScene.score2.currentPoints > currentScene.score1.currentPoints){
                currentScene.finalScreen.winnerSecondLine = ' Player2 wins!';
            }
            else{
                currentScene.finalScreen.winnerSecondLine = ' No winners'
            }
        }
        
    }
}

Timer.prototype.draw = function(){
    Canvas.drawText(Math.trunc(this.currentTime),this.pos,this.size,this.color)
}