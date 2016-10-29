
var map_text = "Select Map !";
var instruction_text = "Press space to select";

var map_text = "Map selection";



var map = {

	create: function() {

		game.stage.backgroundColor = "#ffffff";

		// var bg = game.add.sprite(0, 0,'grassbg');

		var title = game.add.text(game.world.centerX - 145, 10, map_text, {
			font: '40px Coiny', 
		});
		
		var instruction = game.add.text(game.world.centerX - 155, game.world.height - 40, instruction_text, {
			font: '30px Coiny',
		});
        
        //load thumbs
        
        var fire_map = game.add.sprite(game.world.centerX - 180, 80, "fire_thumb");
        var ice_map = game.add.sprite(game.world.centerX + 30, 80, 'ice_thumb');
        var forest_map = game.add.image(game.world.centerX - 180, 260, 'forest_thumb');
        var water_map = game.add.image(game.world.centerX + 30, 260, 'underwater_thumb');
        
        // Scale thumbs

        fire_map.scale.setTo(0.25,0.25);
        ice_map.scale.setTo(0.25, 0.25);
        forest_map.scale.setTo(0.25, 0.25);
        water_map.scale.setTo(0.25, 0.25);

		instruction.alpha = 0;

		game.add.tween(instruction).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 1000, true);


		var start_key = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

		start_key.onDown.addOnce(this.start, this);
	},

	start: function() {

		game.state.start('play');
	
	}
}