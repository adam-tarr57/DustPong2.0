var DustPong = DustPong || {};

DustPong.game = new Phaser.Game(1200, 600, Phaser.AUTO, '');

DustPong.game.state.add('Boot', DustPong.Boot);
DustPong.game.state.add('Preload', DustPong.Preload);
DustPong.game.state.add('MainMenu', DustPong.MainMenu);
DustPong.game.state.add('Game', DustPong.Game);
DustPong.game.state.add('GameOver', DustPong.GameOver);


DustPong.game.state.start('Boot');