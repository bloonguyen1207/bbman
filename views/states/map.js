<<<<<<< HEAD
var map_text = "Select Map !";
var instruction_text = "Press space to select";
=======
var map_text = "Map selection";
>>>>>>> 6f38478ab0fc42aca398d9f059e8ac47ae8758cc


var map = {
    preload: function(){
          var fire_map_thumb = game.load.image("fire_thumb", "res/tilesets/fire_thumb.jpeg");
          var ice_map_thumb = game.load.image("ice_thumb", "res/tilesets/ice_thumb.jpg");
          var forest_map_thumb = game.load.image("forest_thumb", "res/tilesets/forest_thumb.jpg");
          var underwater_map_thumb =game.load.image("underwater_thumb", "res/tilesets/underwater_thumb.jpg");
     },
	create: function() {

		var bg = game.add.sprite(0, 0,'grassbg');

		var title = game.add.text(game.world.centerX - 100, 10, map_text, {
			font: '40px Calibri', 
		});
		
		var instruction = game.add.text(game.world.centerX - 130, game.world.height - 35, instruction_text, {
			font: '30px Calibri',
		});
<<<<<<< HEAD
        //scale thumbs
        //fire_map_thumb.scale.setTo(0.5,0.5);
        
        
        
        //load thumbs
        
        game.add.image(game.world.width/ 2 - 250, 200, "fire_thumb");
        game.add.image(game.world.width/ 2 + 50, 200, 'ice_thumb');
        //game.add.image(game.world.width/ 2 - 200, 120, 'forest_thumb');
        //game.add.image(game.world.width/ 2 - 180, 120, 'underwater_thumb');
        
        
=======

		instruction.alpha = 0;

		game.add.tween(instruction).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 1000, true);

>>>>>>> 6f38478ab0fc42aca398d9f059e8ac47ae8758cc
		var start_key = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

		start_key.onDown.addOnce(this.start, this);
	},

	start: function() {

		game.state.start('play');
	
	}
}