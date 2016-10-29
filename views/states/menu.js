// var title_text = "Fire the hole";
var instruction_text = "Press space to proceed";
var titleOffsetX = 55;
var titleOffsetY = 20;

var menu = {

	create: function() {
		var bg = game.add.sprite(0, 0,'menubg');
		bg.scale.setTo(0.6, 0.65);

        game.load.image('title','res/tilesets/tiltle_screen.png');

		// var title = game.add.text(game.world.width / 2 - 200, 80, title_text, {
		// 	font: '80px Calibri', 
		// 	fill:'#ffffff'
		// });
		
		var instruction = game.add.text(game.world.centerX - 155, game.world.height - 40, instruction_text, {
			font: '30px Coiny',
		});

		instruction.alpha = 0;

		game.add.tween(instruction).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 1000, true);

		var proceed_key = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

		proceed_key.onDown.addOnce(this.start, this);
	},

	start: function() {

		game.state.start('map');
	
	}
}
