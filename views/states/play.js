// Map tiles
var unbreakables;
var shrubs;
var breakables;
var mapText;
var bombs;
var fire;
var bg_map1 = "#602320";
var bg_map2 = "#A5F2F3";
var bg_map4 = "#261712";

var space_bar;
var flipFlop;

var play = {

	create: function() {

        if (val == 1) {
            game.stage.backgroundColor = bg_map1;
        } else if (val == 2) {
            game.stage.backgroundColor = bg_map2;
        } else if (val == 3) {
            var bg = game.add.sprite(0, 0, 'grassbg');
        } else if (val == 4) {
            game.stage.backgroundColor = bg_map4;
        }


        // Create unbreakable unbreakable
        unbreakables = game.add.group();
        unbreakables.enableBody = true;

        var unbreakable;

        // Create Shrubs
        shrubs = game.add.group();
        shrubs.enableBody = true;

        var shrub;

        // Create breakables
        breakables = game.add.group();
        breakables.enableBody = true;

        var breakable;


        // Load mapfile
        var mapFile = game.cache.getText('map' + val);
        mapText = mapFile.split('\n');
        for (i = 0; i < 15; i++) {
            for (var j = 0; j < 19; j++) {
                if (mapText[i][j] == 1) {
                    if (val == 1) {
                        unbreakable = unbreakables.create(j * 32, i * 32, 'volcano');
                        unbreakable.scale.setTo(0.2, 0.2);
                    } else if (val == 2) {
                        unbreakable = unbreakables.create(j * 32, i * 32, 'steel');
                        unbreakable.scale.setTo(0.32, 0.32);
                    } else if (val == 3) {
                        unbreakable = unbreakables.create(j * 32, i * 32, 'tree');
                    } else if (val == 4) {
                        unbreakable = unbreakables.create(j * 32, i * 32, 'iron');
                        unbreakable.scale.setTo(0.4, 0.4);
                    }
                    unbreakable.body.immovable = true;
                } else if (mapText[i][j] == 2) {
                    if (val == 1) {
                        breakable = breakables.create(j * 32, i * 32, 'fossil');
                    } else if (val == 2) {
                        breakable = breakables.create(j * 32, i * 32, 'ice');
                        breakable.scale.setTo(0.5, 0.5);
                    } else if (val == 3) {
                        breakable = breakables.create(j * 32, i * 32, 'shrub');
                        // breakable.scale.setTo(0.5, 0.5);
                    } else if (val == 4) {
                        breakable = unbreakables.create(j * 32, i * 32, 'brick');
                        breakable.scale.setTo(0.5, 0.5);
                    }

                    breakable.body.immovable = true;
                    
                } else if (mapText[i][j] == 'x') {
                    // The player and its settings
                    player = game.add.sprite(j * 32, i * 32, 'dude');
                    //  We need to enable physics on the player
                    game.physics.arcade.enable(player);
                    player.body.setCircle(14);
                }
            }

        }

        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('down', [0, 1, 2, 3], 10, true);
        player.animations.add('left', [12, 13, 14, 15], 10, true);
        player.animations.add('right', [24, 25, 26, 27], 10, true);
        player.animations.add('up', [36, 37, 38, 39], 10, true);

        // Create Bombs + Fire
        bombs = game.add.group();
        bombs.enableBody = true;

        fire = game.add.group();
        fire.enableBody = true;

        game.world.bringToTop(player);

        cursors = game.input.keyboard.createCursorKeys();
        space_bar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
	},

    update: function () {

		//  Collide the player with the obstacles
        game.physics.arcade.collide(player, unbreakables);
        game.physics.arcade.collide(player, breakables);
        game.physics.arcade.collide(player, shrubs);
        //game.physics.arcade.collide(player, bombs);


        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('right');
        } 
        else if (cursors.up.isDown){

            player.body.velocity.y = -150;
            player.animations.play('up');
        } 
        else if (cursors.down.isDown){

            player.body.velocity.y = 150;

            player.animations.play('down');
        }
        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }

        if (space_bar.isDown) {
            if (!flipFlop) { //flipFlop is used to set one press to one callback (instead of multi)
                console.log("BOMB!!!");
                console.log(player.x);
                this.dropBomb(player);
                flipFlop = true;
                //player.body.enable = false;
            }
        }
        if (space_bar.isUp) {
            flipFlop = false;
        }

        // bombs.forEach(function(bomb) {
        //     bomb.explode();
        // })

	},

	render: function() {

		game.debug.body(player);
        // shrubs.forEachAlive(renderGroup, this);
        // function renderGroup(member) {
        //     game.debug.body(member);
        // }
        // game.debug.body(shrub);

    },

    dropBomb: function (aPlayer) {
        var bomb = new Bomb(aPlayer);
        var round_x = aPlayer.x % 32;
        var round_y = aPlayer.y % 32;
        bomb.x = aPlayer.x - round_x;
        bomb.y = aPlayer.y - round_y;
        if (round_x > 10) {
            bomb.x += 32;
        }
        if (round_y > 10) {
            bomb.y += 32;
        }
        bombs.add(bomb);
    }
};