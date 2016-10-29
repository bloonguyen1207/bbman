var title_text = "Fire the hole";
var instruction_text = "Press space to proceed";
var titleOffsetX = 55;
var titleOffsetY = 20;

var menu = {

	create: function() {
        game.load.image('title','res/tilesets/tiltle_screen.png');
		var title = game.add.text(game.world.width / 2 - 200, 80, title_text, {
			font: '80px Calibri', 
			fill:'#ffffff'
		});
		
		var instruction = game.add.text(game.world.width / 2 - 100, game.world.height - 80, instruction_text, {
			font: '30px Calibri',
			fill:'#ffffff' 
		});

		var proceed_key = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

		proceed_key.onDown.addOnce(this.start, this);
	},

	start: function() {

		game.state.start('map');
	
	}
}
