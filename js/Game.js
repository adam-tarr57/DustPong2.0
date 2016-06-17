var DustPong = DustPong || {};

//title screen
DustPong.Game = function(){};

//varibales needed for objects
var bg;
var cursors;
var dustParticle;
var dustParticle2;
var dustParticle3;
var dustParticle4;
var iWall;
var paddle;
//variables for text
var livesText;
var scoreText;


DustPong.Game.prototype = {
  create: function() {
  	//set world dimensions
    //this.game.world.setBounds(0, 0, 800, 600);
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    ///show the space tile, repeated
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bg');
    
    //give it speed in x
    this.background.autoScroll(-20, 0);

    this.score = 0;
    this.lives = 5;

    //Display starting lives and score text
    this.scoreText = this.game.add.text(this.game.width-125, this.game.height-50, 'Score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
    this.livesText = this.game.add.text(32, this.game.height-50, 'Lives: 5', { font: "20px Arial", fill: "#ffffff", align: "left" });

    //  Enable physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //add player paddle
    this.paddle = this.game.add.sprite(100, this.game.world.centerY, 'paddle');
    this.game.physics.enable(this.paddle);
    this.paddle.body.collideWorldBounds = true;
    this.paddle.body.defaultRestitution = 0.8;
    this.paddle.body.immovable = true;
    this.paddle.body.checkCollision.up = false;
    this.paddle.body.checkCollision.left = false;
    this.paddle.body.checkCollision.down = false;

    //player input
    this.cursors = this.game.input.keyboard.createCursorKeys();

    //Invisible hitbox for dustParticle to collide with    
    this.iWall = this.game.add.sprite(1, 200, 'iWall');
    this.iWall.name = 'iWall';
    this.game.physics.enable(this.iWall);
    this.iWall.body.setSize(1, 600, 1, -200);
    this.iWall.body.immovable = true;

    //create dustParticle, give it random velocity and starting location
    this.dustParticle = this.game.add.sprite(this.game.width-100, Math.floor(Math.random() * (this.game.height)), 'dustParticle');
    this.dustParticle.name = 'dustParticle';
    this.game.physics.enable(this.dustParticle);
    this.dustParticle.body.velocity.setTo(this.game.rnd.integerInRange(150,400)*-1), this.game.rnd.integerInRange(150,400);
    this.dustParticle.body.collideWorldBounds = true;
    this.dustParticle.body.bounce.set(1);

  },
  update: function() {

    //set paddle velocity to zero, only moves with player input
    this.paddle.body.velocity.y = 0;
    
    //user controls up/down arrow keys and paddle speed
    if (this.cursors.up.isDown)
    {
      this.paddle.body.velocity.y = -400;
    }
    else if (this.cursors.down.isDown)
    {
      this.paddle.body.velocity.y = 400;
    }
    
    //collision detection for paddle and iWall
    this.game.physics.arcade.collide(this.paddle, this.dustParticle, this.dustpaddleCollision, null, this);
    this.game.physics.arcade.collide(this.iWall, this.dustParticle, this.dustiWallCollision, null, this);
    this.game.physics.arcade.collide(this.paddle, this.dustParticle2, this.dustpaddleCollision, null, this);
    this.game.physics.arcade.collide(this.iWall, this.dustParticle2, this.dustiWallCollision, null, this);
    this.game.physics.arcade.collide(this.paddle, this.dustParticle3, this.dustpaddleCollision, null, this);
    this.game.physics.arcade.collide(this.iWall, this.dustParticle3, this.dustiWallCollision, null, this);
    this.game.physics.arcade.collide(this.paddle, this.dustParticle4, this.dustpaddleCollision, null, this);
    this.game.physics.arcade.collide(this.iWall, this.dustParticle4, this.dustiWallCollision, null, this);

  },

//collision call with paddle
dustpaddleCollision: function(paddle, dustParticle) {

    //destroy dustParticle instance
    this.dustKill();
    
    //increment score and display new score
    this.incScore();

    //new dust instance
    this.newDust();

},

//collision call with iWall
dustiWallCollision: function(iWall, dustParticle) {

    //decrease lives, disply new lives, destroy dustParticle instance
    this.decLives();
    this.dustKill();

    //when lives = 0, gameover otherwise create new instance of dustParticle
    this.livesCheck();
},

//collision call with paddle
dustpaddleCollision: function(paddle, dustParticle2) {

    //destroy dustParticle instance
    this.dustKill();
    
    //increment score and display new score
    this.incScore();

    //new dust instance
    this.newDust();

},

//collision call with iWall
dustiWallCollision: function(iWall, dustParticle2) {

    //decrease lives, disply new lives, destroy dustParticle instance
    this.decLives();
    this.dustKill();

    //when lives = 0, gameover otherwise create new instance of dustParticle
    this.livesCheck();
},

//collision call with paddle
dustpaddleCollision: function(paddle, dustParticle3) {

    //destroy dustParticle instance
    this.dustKill();
    
    //increment score and display new score
    this.incScore();

    //new dust instance
    this.newDust();

},

//collision call with iWall
dustiWallCollision: function(iWall, dustParticle3) {

    //decrease lives, disply new lives, destroy dustParticle instance
    this.decLives();
    this.dustKill();

    //when lives = 0, gameover otherwise create new instance of dustParticle
    this.livesCheck();
},

//collision call with paddle
dustpaddleCollision: function(paddle, dustParticle4) {

    //destroy dustParticle instance
    this.dustKill();
    
    //increment score and display new score
    this.incScore();

    //new dust instance
    this.newDust();

},

//collision call with iWall
dustiWallCollision: function(iWall, dustParticle4) {

    //decrease lives, disply new lives, destroy dustParticle instance
    this.decLives();
    this.dustKill();

    //when lives = 0, gameover otherwise create new instance of dustParticle
    this.livesCheck();
},

//Check if lives = 0, run game over or new dust
livesCheck: function(){
    if (this.lives === 0)
    {
        this.gameOver();
    }
    else
    {
        this.newDust();
    }
},

//increment score
incScore: function(){
    if (this.score < 100)
    {
    this.score += 10;
    this.scoreText.text = 'Score: ' + this.score;
    }
    else if (this.score >= 100 && this.score < 200)
    {
    this.score += 20;
    this.scoreText.text = 'Score: ' + this.score;
    }
    else if (this.score >= 200 && this.score < 300)
    {
    this.score += 30;
    this.scoreText.text = 'Score: ' + this.score;
    }
    else if (this.score >= 300)
    {
    this.score += 40;
    this.scoreText.text = 'Score: ' + this.score;
    }

},

//decrement lives
decLives: function(){

    this.lives--;
    this.livesText.text = 'Lives: ' + this.lives;
},

//kill dust
dustKill: function(){
    if (this.score < 100)
    {
    this.dustParticle.kill();
    }
    else if (this.score >= 100 && this.score < 200)
    {
    this.dustParticle2.kill();
    }
    else if (this.score >= 200 && this.score < 300)
    {
    this.dustParticle3.kill();
    }
    else if (this.score >= 300)
    {
    this.dustParticle4.kill();
    }
},

//new dustParticle
newDust: function(){

    if (this.score < 100)
    {
        this.dustParticle.reset(this.game.width-100, Math.floor(Math.random() * (this.game.height)));
        this.dustParticle.body.velocity.setTo(this.game.rnd.integerInRange(150,400)*-1), this.game.rnd.integerInRange(150,400);
        // this.dust.trail.start(false, 800, 1);
        // this.dust.trail.x = this.dust.x-10;
        // this.dust.trail.y = this.dust.y;
    }
    else if (this.score >= 100 && this.score < 200)
    {
        this.dustParticle2 = this.game.add.sprite(this.game.width-100, Math.floor(Math.random() * (this.game.height)), 'dustParticle2');
        this.dustParticle2.name = 'dustParticle2';
        this.game.physics.enable(this.dustParticle2);
        this.dustParticle2.body.velocity.setTo(this.game.rnd.integerInRange(250,500)*-1), this.game.rnd.integerInRange(250,500);
        this.dustParticle2.body.collideWorldBounds = true;
        this.dustParticle2.body.bounce.set(1);
    }
    else if (this.score >= 200 && this.score < 300)
    {
        this.dustParticle3 = this.game.add.sprite(this.game.width-100, Math.floor(Math.random() * (this.game.height)), 'dustParticle3');
        this.dustParticle3.name = 'dustParticle3';
        this.game.physics.enable(this.dustParticle3);
        this.dustParticle3.body.velocity.setTo(this.game.rnd.integerInRange(350,600)*-1), this.game.rnd.integerInRange(350,600);
        this.dustParticle3.body.collideWorldBounds = true;
        this.dustParticle3.body.bounce.set(1);
    }
    else if (this.score >= 300)
    {
        this.dustParticle4 = this.game.add.sprite(this.game.width-100, Math.floor(Math.random() * (this.game.height)), 'dustParticle4');
        this.dustParticle4.name = 'dustParticle4';
        this.game.physics.enable(this.dustParticle4);
        this.dustParticle4.body.velocity.setTo(this.game.rnd.integerInRange(450,700)*-1), this.game.rnd.integerInRange(450,700);
        this.dustParticle4.body.collideWorldBounds = true;
        this.dustParticle4.body.bounce.set(1);
    }    
},

// addDustEmitterTrail: function(dust){

//     var dustTrail = this.game.add.emitter(this.dust.x-10, this.dustParticle.y, 100);
//     this.dustTrail.width = 10;
//     this.dustTrail.makeParticles('smoke');
//     this.dustTrail.setXSpeed(20, -20);
//     this.dustTrail.setRotation(50, -50);
//     this.dustTrail.setAlpha(0.4, 0, 800);
//     this.dustTrail.setScale(0.01, 0.1, 0.01, 0.1, 1000, Phaser.Easing.Qunitic.Out);
//     this.dust.trail = this.dustTrail;
// },

//game over, restart
gameOver: function() {    

    //pass it the score as a parameter
    this.game.state.start('GameOver', true, false, this.score);
},

};


