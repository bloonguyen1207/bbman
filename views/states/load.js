var load = {

	preload: function() {

        var loading = game.add.text(game.world.centerX - 100, 204, 'Loading...0%', { font: '30px Coiny', fill: '#ffffff'});

        var progress = 0;
 

        var timerEvt = game.time.events.loop(20, function (){

            if(progress <= 100){

                if(progress < game.load.progress){

                    loading.text = 'Loading...'+ (++progress) + '%';

                    if (progress == 100) {
                        progress++;
                    }

                }

            } else {
                game.time.events.remove(timerEvt);

            }
        });

        // Map thubmails
        game.load.image('fire_thumb', 'res/tilesets/fire_thumb.png');
        game.load.image('ice_thumb', 'res/tilesets/ice_thumb.png');
        game.load.image('forest_thumb', 'res/tilesets/forest_thumb.png');
        game.load.image('underwater_thumb', 'res/tilesets/underwater_thumb.png');

        // Backgrounds
        game.load.image('menubg', 'res/tilesets/title.png');
        game.load.image('grassbg', 'res/tilesets/grass.png');
        
        // Sprites
        game.load.spritesheet('dude', 'res/spritesheets/test.png', 32, 32);
        game.load.image('brick', 'res/tilesets/brick.png');
        game.load.image('brick2', 'res/tilesets/brick2.png');
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