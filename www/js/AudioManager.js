//
// Author: Alejandro Benítez López
//
// © benitezdev 2019 (benitezdev.com)
// Creative Commons License:
// Attribution 4.0 International (CC BY 4.0)
//


function AudioManager() {

    this.backgroundAudio = null;
    this.loopBackground = null;

}


AudioManager.prototype.playFx = function (fx, volume) {

    fx.volume = volume;
    fx.play();

}


AudioManager.prototype.playBackgroundMusic = function (audio, loop) {

    this.backgroundAudio = audio;
    this.loopBackground = loop;

    this.backgroundAudio.play();
    this.backgroundAudio.loop = loop;

}