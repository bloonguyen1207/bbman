// Map tiles
var irons;
var shrubs;
var bricks;
var mapText;
var bombs;
var bomb;
var bg_map1 = "#5b3b0e";
var bg_map4 = "#770528";
var bg_map2 = "#A5F2F3";

var space_bar;
var flipFlop;

var play = {

	create: function() {

		game.stage.backgroundColor = bg_map2;

		// Create iron iron
        irons = game.add.group();
        irons.enableBody = true;

        var iron;

        // Create Shrubs
        shrubs = game.add.group();
        shrubs.enableBody = true;

        var shrub;

        // Create Bricks
        bricks = game.add.group();
        bricks.enableBody = true;

        var brick;


        // Load mapfile
        var mapFile = game.cache.getText('map4');
        mapText = mapFile.split('\n');
        for (i = 0; i < 15; i++) {
            for (var j = 0; j < 19; j++) {
                if (mapText[i][j] == 1) {
                    iron = irons.create(j * 32, i * 32, 'steel');
                    iron.body.immovable = true;
                    iron.scale.setTo(0.32, 0.32);
                } else if (mapText[i][j] == 2) {
                    brick = bricks.create(j * 32, i * 32, 'ice');
                    brick.body.immovable = true;
                    brick.scale.setTo(0.5, 0.5);
                } else if (mapText[i][j] == 3) {
                    shrub = shrubs.create(j * 32, i * 32, 'shrub');
                    shrub.body.immovable = true;
                    shrub.body.setCircle(16);
                } else if (mapText[i][j] == 'x') {
                    // The player and its settings
                    player = game.add.sprite(j * 32, i * 32, 'dude');
                    //  We need to enable physics on the player
                    game.physics.arcade.enable(player);
                    player.body.setCircle(16);
                }
            }

        }

        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('down', [0, 1, 2, 3], 10, true);
        player.animations.add('left', [12, 13, 14, 15], 10, true);
        player.animations.add('right', [24, 25, 26, 27], 10, true);
        player.animations.add('up', [36, 37, 38, 39], 10, true);

        // Create Bombs
        bombs = game.add.group();
        bombs.enableBody = true;

        for (var i = 0; i < 20; i++) {
            var b = bombs.create(0, 0, 'bomb');
            b.body.immovable = true;
            b.scale.setTo(0.08, 0.08);
            b.exists = false;
            b.visible = false;
            b.body.setCircle(16);
        }

        game.world.bringToTop(player);

        cursors = game.input.keyboard.createCursorKeys();
        space_bar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
	},

    update: function () {

		//  Collide the player with the obstacles
        game.physics.arcade.collide(player, irons);
        game.physics.arcade.collide(player, bricks);
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
                this.dropBomb();
                flipFlop = true;
                //player.body.enable = false;
            }
        }
        if (space_bar.isUp) {
            flipFlop = false;
        }

	},

	render: function() {

		game.debug.body(player);
        // shrubs.forEachAlive(renderGroup, this);
        // function renderGroup(member) {
        //     game.debug.body(member);
        // }
        // game.debug.body(shrub);

    },

    dropBomb: function () {
        var round_x = player.x % 32;
        var round_y = player.y % 32;
        var pos_x = player.x - round_x;
        var pos_y = player.y - round_y;
        if (round_x > 10) {
            pos_x += 32;
        }
        if (round_y > 10) {
            pos_y += 32;
        }
        bomb = bombs.getFirstExists(false);
        if (bomb) {
            bomb.reset(pos_x, pos_y);
        }
    }
};