var DustPong = DustPong || {};

DustPong.Game = function(){};

DustPong.Game.prototype = {

  create: function() {

    this.setUpBG();
    this.setUpPaddle();
    this.setUpiWall();
    this.setUpParticles();
    this.setUpScoreLives();
    //player input
    this.cursors = this.game.input.keyboard.createCursorKeys();

  },
  update: function() {
    
    this.collisionsCheck();
    this.spawnParticles();
    this.processPlayerInput();

  },

//create () functions
setUpBG: function() {

    //Scale the gamespace to window size
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    ///show the space tile, repeated
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bg');
    
    //give it speed in x
    this.background.autoScroll(DustPong.BG_SCROLL_SPEED, 0);

},

setUpPaddle: function() {

    //add player paddle
    this.paddle = this.game.add.sprite(100, this.game.world.centerY, 'paddle');
    this.game.physics.enable(this.paddle, Phaser.Physics.ARCADE);
    this.paddle.anchor.setTo(0.5, 0.5);
    this.paddle.body.collideWorldBounds = true;
    this.paddle.body.defaultRestitution = 0.8;
    this.paddle.body.immovable = true;
    this.paddle.body.checkCollision.up = false;
    this.paddle.body.checkCollision.left = false;
    this.paddle.body.checkCollision.down = false;

},

setUpiWall: function () {

    //Invisible hitbox for dustParticle to collide with    
    this.iWall = this.game.add.sprite(1, 200, 'iWall');
    this.iWall.name = 'iWall';
    this.game.physics.enable(this.iWall, Phaser.Physics.ARCADE);
    this.iWall.body.setSize(1, 600, 1, -200);
    this.iWall.body.immovable = true;

},

setUpParticles: function() {

    //dustParticle group setup
    this.dustPool = this.add.group();
    this.dustPool.enableBody = true;
    this.dustPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.dustPool.createMultiple(10, 'dustParticle');
    this.dustPool.setAll('anchor.x', 0.5);
    this.dustPool.setAll('anchor.y', 0.5);
    this.dustPool.setAll('body.collideWorldBounds', true);
    this.dustPool.setAll('body.bounce.x', 1);
    this.dustPool.setAll('body.bounce.y', 1);
    this.nextDustAt = 0;
    this.dustDelay = 2000;

    this.dustPool2 = this.add.group();
    this.dustPool2.enableBody = true;
    this.dustPool2.physicsBodyType = Phaser.Physics.ARCADE;
    this.dustPool2.createMultiple(10, 'dustParticle2');
    this.dustPool2.setAll('anchor.x', 0.5);
    this.dustPool2.setAll('anchor.y', 0.5);
    this.dustPool2.setAll('body.collideWorldBounds', true);
    this.dustPool2.setAll('body.bounce.x', 1);
    this.dustPool2.setAll('body.bounce.y', 1);
    this.nextDust2At = 8000;
    this.dustDelay2 = 7000;

    this.dustPool3 = this.add.group();
    this.dustPool3.enableBody = true;
    this.dustPool3.physicsBodyType = Phaser.Physics.ARCADE;
    this.dustPool3.createMultiple(10, 'dustParticle3');
    this.dustPool3.setAll('anchor.x', 0.5);
    this.dustPool3.setAll('anchor.y', 0.5);
    this.dustPool3.setAll('body.collideWorldBounds', true);
    this.dustPool3.setAll('body.bounce.x', 1);
    this.dustPool3.setAll('body.bounce.y', 1);
    this.nextDust3At = 14500;
    this.dustDelay3 = 14500;

    this.dustPool4 = this.add.group();
    this.dustPool4.enableBody = true;
    this.dustPool4.physicsBodyType = Phaser.Physics.ARCADE;
    this.dustPool4.createMultiple(10, 'dustParticle4');
    this.dustPool4.setAll('anchor.x', 0.5);
    this.dustPool4.setAll('anchor.y', 0.5);
    this.dustPool4.setAll('body.collideWorldBounds', true);
    this.dustPool4.setAll('body.bounce.x', 1);
    this.dustPool4.setAll('body.bounce.y', 1);
    this.nextDust4At = 19000;
    this.dustDelay4 = 19000;

},

setUpScoreLives: function() {

    this.score = 0;
    this.lives = 5;

    //Display starting lives and score text
    this.scoreText = this.game.add.text(this.game.width-125, this.game.height-50, 'Score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
    this.livesText = this.game.add.text(32, this.game.height-50, 'Lives: 5', { font: "20px Arial", fill: "#ffffff", align: "left" });

},

//update () functions
collisionsCheck: function() {

    //collision dectection for paddle and iWall with dust groups
    this.game.physics.arcade.collide(this.paddle, this.dustPool, this.paddleCollision, null, this);
    this.game.physics.arcade.collide(this.iWall, this.dustPool, this.wallCollision, null, this);
    this.game.physics.arcade.collide(this.paddle, this.dustPool2, this.paddleCollision2, null, this);
    this.game.physics.arcade.collide(this.iWall, this.dustPool2, this.wallCollision2, null, this);
    this.game.physics.arcade.collide(this.paddle, this.dustPool3, this.paddleCollision3, null, this);
    this.game.physics.arcade.collide(this.iWall, this.dustPool3, this.wallCollision3, null, this);
    this.game.physics.arcade.collide(this.paddle, this.dustPool4, this.paddleCollision4, null, this);
    this.game.physics.arcade.collide(this.iWall, this.dustPool4, this.wallCollision4, null, this);
},

spawnParticles: function() {

    //setup to deploy dustParticles from dustPool based on how many are alive vs dead.
    if (this.nextDustAt < this.time.now && this.dustPool.countDead() > 0){
        this.nextDustAt = this.time.now + this.dustDelay;
        var dust = this.dustPool.getFirstExists(false);
        dust.reset((this.game.width-100), Math.floor(Math.random() * this.game.height));
        dust.body.velocity.setTo(this.game.rnd.integerInRange(150,300)*-1), this.game.rnd.integerInRange(150,400);
    }

    if (this.nextDust2At < this.time.now && this.dustPool2.countDead() > 0){
        this.nextDust2At = this.time.now + this.dustDelay2;
        var dust2 = this.dustPool2.getFirstExists(false);
        dust2.reset((this.game.width-100), Math.floor(Math.random() * this.game.height));
        dust2.body.velocity.setTo(this.game.rnd.integerInRange(200,400)*-1), this.game.rnd.integerInRange(250,500);
    }

    if (this.nextDust3At < this.time.now && this.dustPool3.countDead() > 0){
        this.nextDust3At = this.time.now + this.dustDelay3;
        var dust3 = this.dustPool3.getFirstExists(false);
        dust3.reset((this.game.width-100), Math.floor(Math.random() * this.game.height));
        dust3.body.velocity.setTo(this.game.rnd.integerInRange(300,600)*-1), this.game.rnd.integerInRange(350,600);
    }

    if (this.nextDust4At < this.time.now && this.dustPool4.countDead() > 0){
        this.nextDust4At = this.time.now + this.dustDelay4;
        var dust4 = this.dustPool4.getFirstExists(false);
        dust4.reset((this.game.width-100), Math.floor(Math.random() * this.game.height));
        dust4.body.velocity.setTo(this.game.rnd.integerInRange(400,800)*-1), this.game.rnd.integerInRange(450,700);
    }
},

processPlayerInput: function() {

    //set paddle velocity to zero, only moves with player input
    this.paddle.body.velocity.y = DustPong.PADDLE_SPEED;
    
    //user controls up/down arrow keys and paddle speed
    if (this.cursors.up.isDown)
    {
      this.paddle.body.velocity.y = -400;
    }
    else if (this.cursors.down.isDown)
    {
      this.paddle.body.velocity.y = 400;
    }

},

paddleCollision: function(paddle, dust){

    dust.kill();
    this.incScore();
},

wallCollision: function(iWall, dust){

    dust.kill();
    this.decLives();
    this.livesCheck();
},

paddleCollision2: function(paddle, dust){

    dust.kill();
    this.incScore();
},

wallCollision2: function(iWall, dust){

    dust.kill();
    this.decLives();
    this.livesCheck();
},

paddleCollision3: function(paddle, dust){

    dust.kill();
    this.incScore();
},

wallCollision3: function(iWall, dust){

    dust.kill();
    this.decLives();
    this.livesCheck();
},

paddleCollision4: function(paddle, dust){

    dust.kill();
    this.incScore();
},

wallCollision4: function(iWall, dust){

    dust.kill();
    this.decLives();
    this.livesCheck();
},



//Check if lives = 0, run game over or new dust
livesCheck: function(){
    if (this.lives === 0)
    {
        this.game.time.removeAll();
        this.gameOver();
    }
},

//increment score
incScore: function(){
    
    this.score += 10;
    this.scoreText.text = 'Score: ' + this.score;

},

//decrement lives
decLives: function(){

    this.lives--;
    this.livesText.text = 'Lives: ' + this.lives;
},

//game over, restart
gameOver: function(pointer) {    

    //pass it the score as a parameter
    this.game.state.start('GameOver', true, false, this.score);
},

};


