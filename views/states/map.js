var map_text = "Map selection";

var map = {

	create: function() {

		var bg = game.add.sprite(0, 0,'grassbg');

		var title = game.add.text(game.world.centerX - 100, 10, map_text, {
			font: '40px Calibri', 
		});
		
		var instruction = game.add.text(game.world.centerX - 130, game.world.height - 35, instruction_text, {
			font: '30px Calibri',
		});

		instruction.alpha = 0;

		game.add.tween(instruction).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 1000, true);

		var start_key = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

		start_key.onDown.addOnce(this.start, this);
	},

	start: function() {

		game.state.start('play');
	
	}
}