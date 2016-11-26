var load = {

	preload: function() {

        var loading = game.add.text(game.world.centerX - 100, 204, 'Loading...0%', { font: '30px Coiny', fill: '#ffffff'});

        var progress = 0;
 

        var timerEvt = game.time.events.loop(10, function (){

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

        // Room
        game.load.image('empty_room', 'res/tilesets/room.png');

        // Player
        game.load.image('player_1', 'res/spritesheets/player1.png');
        game.load.image('player_2', 'res/spritesheets/player2.png');
        game.load.image('player_3', 'res/spritesheets/player3.png');
        game.load.image('player_4', 'res/spritesheets/player4.png');

        // Map thubmails
        game.load.image('fire_thumb', 'res/tilesets/fire_thumb.png');
        game.load.image('ice_thumb', 'res/tilesets/ice_thumb.png');
        game.load.image('forest_thumb', 'res/tilesets/forest_thumb.png');
        game.load.image('underwater_thumb', 'res/tilesets/underwater_thumb.png');
        game.load.image('cave_thumb', 'res/tilesets/cave.png');

        // Backgrounds
        game.load.image('menubg', 'res/tilesets/title.png');
        game.load.image('grassbg', 'res/tilesets/grass.png');
        game.load.image('lavabg', 'res/tilesets/lavabg.png');
        
        // Sprites
        game.load.spritesheet('dude', 'res/spritesheets/test.png', 32, 32);

        // Map 1
        game.load.image('volcano', 'res/tilesets/brick2.png');
        game.load.image('fossil', 'res/tilesets/fossil.png');

        // Map 2
        game.load.image('steel', 'res/tilesets/steel.png');
        game.load.image('ice', 'res/tilesets/ice.png');

        // Map 3
        game.load.image('tree', 'res/tilesets/tree.png');
        game.load.image('shrub', 'res/tilesets/shrub.png');

        // Map 4
        game.load.image('iron', 'res/tilesets/iron.png');
        game.load.image('brick', 'res/tilesets/brick.png');

        // Bomb
        game.load.image('bomb', 'res/tilesets/bomb.png');
        game.load.spritesheet('fire', 'res/spritesheets/sprite_fire.png', 32, 32);
        game.load.text('map1', 'data/maps/map1.txt');
        game.load.text('map2', 'data/maps/map2.txt');
        game.load.text('map3', 'data/maps/map3.txt');
        game.load.text('map4', 'data/maps/map4.txt');
        
        //Item
        game.load.image('bomb_num', 'res/tilesets/item1.png');
        game.load.image('bomb_length', 'res/tilesets/item2.png');
        game.load.image('speed', 'res/tilesets/item3.png');

        // Script
        game.load.script('Player', 'model/entities/player.js');
        game.load.script('Bomb', 'model/entities/bomb.js');
        game.load.script('Fire', 'model/entities/fire.js');
        game.load.script('Items', 'model/entities/items.js');

	},

	create: function() {

		game.state.start('menu');

	}
};