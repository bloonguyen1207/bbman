var instruction_text = "Press space to proceed";
var titleOffsetX = 55;
var titleOffsetY = 20;

var room = {

	create: function() {

		var slots = 4;

		var bg = game.add.sprite(0, 0,'grassbg');

		var room = game.add.sprite(game.world.width / 2 - 265, 60, 'empty_room');
		room.scale.setTo(0.55, 0.55);


		var player = game.add.sprite(game.world.width / 2 + 45, 110, 'player_3');
		player.scale.setTo(0.1, 0.1);
		var player1 = game.add.sprite(game.world.width / 2 + 155, 110, 'player_1');
		player1.scale.setTo(0.1, 0.1);
		var player2 = game.add.sprite(game.world.width / 2 + 45, 210, 'player_2');
		player2.scale.setTo(0.1, 0.1);
		var player3 = game.add.sprite(game.world.width / 2 + 155, 210, 'player_4');
		player3.scale.setTo(0.1, 0.1);

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

		
	},

	start: function() {

		game.state.start('play');
	
	}
}