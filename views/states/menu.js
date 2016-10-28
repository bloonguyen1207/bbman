var title_text = "Fire the hole";
var instruction_text = "Press space to start";

var menu = {

	create: function() {
		var title = game.add.text(game.world.width / 2 - 200, 80, title_text, {
			font: '80px Calibri', 
			fill:'#ffffff'
		});
		
		var instruction = game.add.text(game.world.width / 2 - 100, game.world.height - 80, instruction_text, {
			font: '30px Calibri',
			fill:'#ffffff' 
		});

		var start_key = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

		start_key.onDown.addOnce(this.start, this);
	},

	start: function() {

		game.state.start('play');
	
	}
}