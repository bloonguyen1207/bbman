var instruction_text = "Press space to proceed";
var titleOffsetX = 55;
var titleOffsetY = 20;

var room = {

	create: function() {
		socket.on('connectToRoom',function(data){
		  console.log(data);
		});
		var bg = game.add.sprite(0, 0,'grassbg');
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