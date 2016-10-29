var game = new Phaser.Game(608, 480, Phaser.AUTO, 'game');

game.state.add('boot', boot);
game.state.add('load', load);
game.state.add('menu', menu);
game.state.add('map', map);
game.state.add('play', play);

game.state.start('boot');
