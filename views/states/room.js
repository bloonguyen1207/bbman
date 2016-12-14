var instruction_text = "Press space to proceed";
var titleOffsetX = 55;
var titleOffsetY = 20;

var room = {

	create: function() {
		uiPickSfx.play();

		// Declare stuff
		var slots = 4;
		
		var fire;
		var ice;
		var forest;
		var cave;

		var bg = game.add.sprite(0, 0,'grassbg');

		var room = game.add.sprite(game.world.width / 2 - 265, 60, 'empty_room');
		room.scale.setTo(0.55, 0.55);

		var back_btn = game.add.button(game.world.centerX + 130, game.world.centerY + 100, 'exit', this.actionOnClick, this, 2, 1, 0);
		back_btn.scale.setTo(0.06, 0.03);

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

		socket.emit('New player', { ack: 'new' });

		socket.on('players', function (data) {
			console.log(data.num_player);
			if (data.num_player == 1) {
				var player1 = game.add.sprite(game.world.width / 2 + 38, 115, 'player_3');
				player1.scale.setTo(0.1, 0.1);
			} else if (data.num_player == 2) {
				var player2 = game.add.sprite(game.world.width / 2 + 142, 115, 'player_1');
				player2.scale.setTo(0.1, 0.1);
			} else if (data.num_player == 3) {
				var player3 = game.add.sprite(game.world.width / 2 + 38, 215, 'player_2');
				player3.scale.setTo(0.1, 0.1);
			} else if (data.num_player == 4) {
				var player4 = game.add.sprite(game.world.width / 2 + 142, 215, 'player_4');
				player4.scale.setTo(0.1, 0.1);
			}
			// var test = game.add.text(50, 50, data.num_player, {
			// 	font: '30px Coiny',
			// });
		});
	},

	actionOnClick: function() {

    	game.state.start('menu');
	
	},

	start: function() {

		game.state.start('play');
	
	}
}