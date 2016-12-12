// var title_text = "Fire the hole";
var instruction_text = "Press space to proceed";
var titleOffsetX = 55;
var titleOffsetY = 20;
var state = 'map';
var socket = io();

var menu = {

	create: function() {
		var bg = game.add.sprite(0, 0,'menubg');
		bg.scale.setTo(0.6, 0.65);

        game.load.image('title','res/tilesets/tiltle_screen.png');
		
		var instruction = game.add.text(game.world.centerX - 175, game.world.height - 40, instruction_text, {
			font: '30px Coiny',
		});

		instruction.alpha = 0;

		game.add.tween(instruction).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 1000, true);

		var proceed_key = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

		console.log(socket.id);

		socket.emit('New player', { ack: 'new' });

		socket.on('players', function (data) {
			if(data.num_player > 1) {
				state = 'room';		
			}
		});
		proceed_key.onDown.addOnce(this.start, this);

	},

	start: function() {

		game.state.start(state);
	
	},
}
