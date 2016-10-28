var load = {

	preload: function() {

		var loading = game.add.text(320, 400, "Loading...", {
            font: '30px Courier', fill: '#fffffff'
        });

		game.load.spritesheet('dude', 'res/spritesheets/test.png', 32, 32);
        game.load.image('brick', 'res/tilesets/brick.png');
        game.load.image('brick2', 'res/tilesets/brick2.png');
        game.load.image('grassbg', 'res/tilesets/grass.png');
        game.load.image('ice', 'res/tilesets/ice.png');
        game.load.image('iron', 'res/tilesets/iron.png');
        game.load.image('steel', 'res/tilesets/steel.png');
        game.load.image('shrub', 'res/tilesets/bush.gif');
        game.load.text('map1', 'data/maps/map1.txt');
        game.load.text('map2', 'data/maps/map2.txt');
        game.load.text('map3', 'data/maps/map3.txt');
        game.load.text('map4', 'data/maps/map4.txt');

	},

	create: function() {

		game.state.start('menu');

	}
}