var DustPong = DustPong || {};

//loading the game assets
DustPong.Preload = function(){};

DustPong.Preload.prototype = {
  preload: function() {
  	//show loading screen
  	this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

  	//load game assets
  	this.load.image('paddle', 'images/paddle.png');
    this.load.image('bg', 'images/bg.png');
    this.load.image('dustParticle', 'images/dustParticle.png');
    this.load.image('dustParticle2', 'images/dustParticle2.png');
    this.load.image('dustParticle3', 'images/dustParticle3.png');
    this.load.image('dustParticle4', 'images/dustParticle4.png');
    this.load.image('iWall', 'images/iWall.png');
    this.load.image('smoke', 'images/smoke.png');
  },
  create: function() {
  	this.state.start('MainMenu');
  }
};