var instruction_text = "Press space to proceed";
var titleOffsetX = 55;
var titleOffsetY = 20;

var room = {

	create: function() {
        state = 'room';
		uiPickSfx.play();

        socket.emit('setClientState', 'room');

		// Declare stuff
		var slots = 4;

		var bg = game.add.sprite(0, 0,'grassbg');

        var roomImage = game.add.sprite(game.world.width / 2 - 265, 60, 'empty_room');
        roomImage.scale.setTo(0.55, 0.55);

		var back_btn = game.add.button(game.world.centerX + 130, game.world.centerY + 100, 'exit', this.actionOnClick, this, 2, 1, 0);
		back_btn.scale.setTo(0.06, 0.03);


		// Declare stuff
		var title = game.add.text(game.world.width / 2 - 50, 10, "Room", {
			font: '40px Coiny', 
		});
		var instruction = game.add.text(game.world.centerX - 175, game.world.height - 40, instruction_text, {
			font: '30px Coiny',
		});
		instruction.alpha = 0;

		game.add.tween(instruction).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 1000, true);

		var proceed_key = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
		proceed_key.onDown.addOnce(this.start, this);

		//TODO: Implement socket to add new icon to slot when a player enters room & transfer it to menu.js

        // 	// var test = game.add.text(50, 50, data.numPlayer, {
        // 	// 	font: '30px Coiny',
        // 	// });
        // });
        var playerImagesGroup = game.add.group();

        var initPlayerImages = function () {
            var drawPlayer = function (x, y, image) {
                var playerImage = playerImagesGroup.create(x, y, image);
                playerImage.scale.setTo(0.1, 0.1);
            };

            drawPlayer(game.world.width / 2 + 38, 115, 'player_3');
            drawPlayer(game.world.width / 2 + 142, 115, 'player_1');
            drawPlayer(game.world.width / 2 + 38, 215, 'player_2');
            drawPlayer(game.world.width / 2 + 142, 215, 'player_4');
        };

        var drawPlayers = function (serverState) {
            playerImagesGroup.setAll('visible', false);

            serverState.clientsState.forEach(function (clientState, index) {
                if (clientState == 'room') {
                    playerImagesGroup.getChildAt(index).visible = true;
                }
            });
        };

        socket.emit('checkServerState');
        socket.on('returnServerState', function (serverState) {
            if (state == 'room') {
                initPlayerImages();

                room.chooseImage(serverState.mapValue);
                drawPlayers(serverState);

                socket.on('updateServerState', function (updateServerState) {
                    console.log("updateServerState.numPlayer");
                    console.log(updateServerState);
                    drawPlayers(updateServerState);
                });
            }
        });
	},

	actionOnClick: function() {
        socket.removeAllListeners('updateServerState');
        socket.removeAllListeners('returnServerState');
    	game.state.start('menu');
	
	},

	start: function() {
        socket.removeAllListeners('updateServerState');
        socket.removeAllListeners('returnServerState');
		game.state.start('play');

    },

    chooseImage: function (val) {
        var fire;
        var ice;
        var forest;
        var cave;

        if (val == 1) {

            fire = game.add.sprite(130, 100, 'fire_room');

            fire.animations.add('burn');

            fire.animations.play('burn', 50, true);
        } else if (val == 2) {

            ice = game.add.sprite(137, 130, 'ice_room');
            ice.scale.setTo(0.07, 0.07);

        } else if (val == 3) {

            forest = game.add.sprite(125, 130, 'forest_room');

            forest.scale.setTo(0.5, 0.5);

            forest.animations.add('grow');

            forest.animations.play('grow', 30, true);
        } else if (val == 4) {
            cave = game.add.sprite(110, 150, 'cave_room');

            cave.scale.setTo(0.16, 0.16);

        }
    }
};