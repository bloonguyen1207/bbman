var instruction_text = "Press space to proceed";

var map_text = "Map selection";

var val = 1;
var deb = 0;
var left_x = 119;
var right_x = 329;
var up_y = 75;
var down_y = 225;
var select_frame;

var map = {

	create: function() {
		uiPickSfx.play();

		// Initialize stuff

		// Keys
		var start_key = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
		

		// Background and graphics

		var bg = game.add.sprite(0, 0,'grassbg');
		// game.stage.backgroundColor = "#ffffff";

		var graphics = game.add.graphics(0, 0);


		var title = game.add.text(game.world.centerX - 145, 10, map_text, {
			font: '40px Coiny'
		});
		
		var instruction = game.add.text(game.world.centerX - 175, game.world.height - 40, instruction_text, {
			font: '30px Coiny'
		});


        // Load maps

        var fire_map = game.add.sprite(game.world.centerX - 180, 80, "fire_thumb");
        var ice_map = game.add.sprite(game.world.centerX + 30, 80, 'ice_thumb');
        var forest_map = game.add.image(game.world.centerX - 180, 260, 'forest_thumb');
		var water_map = game.add.image(game.world.centerX + 30, 260, 'cave_thumb');

        
        // Scale maps images

        fire_map.scale.setTo(0.25,0.25);
        ice_map.scale.setTo(0.25, 0.25);
        forest_map.scale.setTo(0.25, 0.25);
		// water_map.scale.setTo(0.25, 0.25);

        graphics.lineStyle(10, 0x000000, 1);
        select_frame = graphics.drawRoundedRect(119, 75, 160, 160, 3);

        // Value debug
        // deb = game.add.text(50, 50, val, {
        // 	font: '30px Coiny',
        // });
		
		instruction.alpha = 0;

		game.add.tween(instruction).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 1000, true);
		
		start_key.onDown.addOnce(this.start, this);
	},

	update: function() {

		var left_key = game.input.keyboard.addKey(Phaser.KeyCode.LEFT);
		var right_key = game.input.keyboard.addKey(Phaser.KeyCode.RIGHT);
		var up_key = game.input.keyboard.addKey(Phaser.KeyCode.UP);
		var down_key = game.input.keyboard.addKey(Phaser.KeyCode.DOWN);
		if (val == 1) {
			if (down_key.isDown) {
				uiNavSfx.play();
				select_frame.y = 180;
				val = 3;
			} else if (right_key.isDown){
				uiNavSfx.play();
				select_frame.x = 210;
				val = 2;
			}
		} else if (val == 2) {
			if (left_key.isDown) {
				uiNavSfx.play();
				select_frame.x = 0;
				val = 1;
			} else if (down_key.isDown) {
				uiNavSfx.play();
				select_frame.y = 180;
				val = 4;
			}
		} else if (val == 3) {
			if (right_key.isDown) {
				uiNavSfx.play();
				select_frame.x = 210;
				val = 4;
			} else if (up_key.isDown) {
				uiNavSfx.play();
				select_frame.y = 0;
				val = 1;
			}

		} else if (val == 4) {
			if (left_key.isDown) {
				uiNavSfx.play();
				select_frame.x = 0;
				val = 3;
			} else if (up_key.isDown) {
				uiNavSfx.play();
				select_frame.y = 0;
				val = 2;
			}
		}
		deb.text = val;

	},

	start: function() {

		game.state.start('room');
	
	}
};