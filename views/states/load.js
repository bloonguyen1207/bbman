var load = {

    preload: function () {

        var loading = game.add.text(game.world.centerX - 100, 204, 'Loading...0%', {
            font: '30px Coiny',
            fill: '#ffffff'
        });

        var progress = 0;


        var timerEvt = game.time.events.loop(10, function () {

            if (progress <= 100) {

                if (progress < game.load.progress) {

                    loading.text = 'Loading...' + (++progress) + '%';

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
        game.load.image('exit', 'res/spritesheets/Button.png');
        game.load.spritesheet('fire_room', 'res/spritesheets/fire_room.png', 128, 128);
        game.load.spritesheet('ice_room', 'res/spritesheets/ice_room.png');
        game.load.spritesheet('forest_room', 'res/spritesheets/forest_room.png', 271, 249);
        game.load.spritesheet('cave_room', 'res/spritesheets/cave_room.png');

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
        game.load.spritesheet('duck', 'res/spritesheets/ducks.png', 32, 32);
        game.load.spritesheet('dog', 'res/spritesheets/dogs.png', 32, 32);
        game.load.spritesheet('cat', 'res/spritesheets/cats.png', 32, 32);

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

        // Game Over
        game.load.image('game_over', 'res/tilesets/game_over.png');

        // Script
        game.load.script('Player', 'model/entities/player.js');
        game.load.script('Bomb', 'model/entities/bomb.js');
        game.load.script('Fire', 'model/entities/fire.js');
        game.load.script('Items', 'model/entities/items.js');

        // Sound effect
        game.load.audio('uiNavSfx', ['res/sound/ogg/sfx/Menu_Navigate_03.ogg', 'res/sound/mp3/sfx/Menu_Navigate_03.mp3']);
        game.load.audio('uiPickSfx', ['res/sound/ogg/sfx/Shoot_01.ogg', 'res/sound/mp3/sfx/Shoot_01.mp3']);
        game.load.audio('bombSfx', ['res/sound/ogg/sfx/explosion_dull.ogg', 'res/sound/mp3/sfx/explosion_dull.mp3']);
        game.load.audio('explodeSfx', ['res/sound/ogg/sfx/8bit_bomb_explosion.ogg', 'res/sound/mp3/sfx/8bit_bomb_explosion.mp3']);
        game.load.audio('deathSfx', ['res/sound/ogg/sfx/Hero_Death_00.ogg', 'res/sound/mp3/sfx/Hero_Death_00.mp3']);
        game.load.audio('pickupSfx', ['res/sound/ogg/sfx/Pickup_01.ogg', 'res/sound/mp3/sfx/Pickup_01.mp3']);

        // Background music
        game.load.audio('introBgm', ['res/sound/ogg/bgm/HUMANOID.ogg', 'res/sound/mp3/bgm/HUMANOID.mp3']);
        game.load.audio('fireBgm', ['res/sound/ogg/bgm/LEMONS.ogg', 'res/sound/mp3/bgm/LEMONS.mp3']);
        game.load.audio('iceBgm', ['res/sound/ogg/bgm/WINTER.ogg', 'res/sound/mp3/bgm/WINTER.mp3']);
        game.load.audio('forestBgm', ['res/sound/ogg/bgm/BUGS.ogg', 'res/sound/mp3/bgm/BUGS.mp3']);
        game.load.audio('caveBgm', ['res/sound/ogg/bgm/GO4YRGUN.ogg', 'res/sound/mp3/bgm/GO4YRGUN.mp3']);

    },

    create: function () {
        uiNavSfx = game.add.audio('uiNavSfx');
        uiPickSfx = game.add.audio('uiPickSfx');

        bombSfx = game.add.audio('bombSfx');
        explodeSfx = game.add.audio('explodeSfx');
        deathSfx = game.add.audio('deathSfx');
        pickupSfx = game.add.audio('pickupSfx', 0.5);

        introBgm = game.add.audio('introBgm', 0.5, true);
        fireBgm = game.add.audio('fireBgm', 0.5, true);
        iceBgm = game.add.audio('iceBgm', 0.5, true);
        forestBgm = game.add.audio('forestBgm', 0.5, true);
        caveBgm = game.add.audio('caveBgm', 0.5, true);
        Bgm = [introBgm, fireBgm, iceBgm, forestBgm, caveBgm];

        muteToggle = game.input.keyboard.addKey(Phaser.KeyCode.M);

        game.state.start('menu');

    }


};
function toggleAudio() {
    if (game.sound.mute) {
        game.sound.mute = false;
        console.log('Sound: ON');
    } else {
        game.sound.mute = true;
        console.log('Sound: OFF');
    }
}
var uiNavSfx;
var uiPickSfx;

var bombSfx;
var explodeSfx;
var deathSfx;
var pickupSfx;

var Bgm;

var muteToggle;