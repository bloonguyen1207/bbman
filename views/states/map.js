var map_text = "Select Map !";
var instruction_text = "Press space to select";


var map = {
    preload: function(){
          var fire_map_thumb = game.load.image("fire_thumb", "res/tilesets/fire_thumb.jpeg");
          var ice_map_thumb = game.load.image("ice_thumb", "res/tilesets/ice_thumb.jpg");
          var forest_map_thumb = game.load.image("forest_thumb", "res/tilesets/forest_thumb.jpg");
          var underwater_map_thumb =game.load.image("underwater_thumb", "res/tilesets/underwater_thumb.jpg");
     },
	create: function() {
		var title = game.add.text(game.world.width / 2 - 200, 80, map_text, {
			font: '80px Calibri', 
			fill:'#ffffff'
		});
		
		var instruction = game.add.text(game.world.width / 2 - 100, game.world.height - 80, instruction_text, {
			font: '30px Calibri',
			fill:'#ffffff' 
		});
        //scale thumbs
        //fire_map_thumb.scale.setTo(0.5,0.5);
        
        
        
        //load thumbs
        
        game.add.image(game.world.width/ 2 - 250, 200, "fire_thumb");
        game.add.image(game.world.width/ 2 + 50, 200, 'ice_thumb');
        //game.add.image(game.world.width/ 2 - 200, 120, 'forest_thumb');
        //game.add.image(game.world.width/ 2 - 180, 120, 'underwater_thumb');
        
        
		var start_key = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

		start_key.onDown.addOnce(this.start, this);
	},

	start: function() {

		game.state.start('play');
	
	}
}