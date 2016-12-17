// var title_text = "Fire the hole";
var instruction_text = "Press space to proceed";
var titleOffsetX = 55;
var titleOffsetY = 20;
var state;
var socket = io();

var menu = {

	create: function() {
		Bgm[0].play();
		var bg = game.add.sprite(0, 0,'menubg');
		bg.scale.setTo(0.6, 0.65);

		game.load.image('title', 'res/tilesets/title.png');
        var _self = this;
        var inGame = false;
        state = 'menu';
        console.log(state);

        socket.emit('upState', state);
		socket.emit('checkState');
		socket.on('returnState', function(serverState) {
            inGame = serverState.inGame;
            // console.log("22 menu: serverState.inGame");
            console.log(serverState);
            console.log(inGame);
            console.log(state);
			if (state == 'menu') {
                var instruction = game.add.text(0, 0, instruction_text, {
                    font: '30px Coiny',
					boundsAlignH: "center",
					boundsAlignV: "middle"
                });

                instruction.alpha = 0;
				instruction.setTextBounds(0, game.world.height - 40, game.world.width, 40);
                game.add.tween(instruction).to({alpha: 1}, 800, Phaser.Easing.Linear.None, true, 0, 1000, true);
                console.log("menu file state: ");
                console.log(inGame);
                if (!inGame && serverState.num_player <= 4) {
                    var proceed_key = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

                    console.log(socket.id);
					socket.on('updateState', function(updateState) {
						serverState = updateState;
                        if (serverState.num_player > 1 && serverState.isSetMap) {
                            state = 'room';
                        } else {
                            state = 'map';
                        }
					});
					if (serverState.num_player > 1 && serverState.isSetMap) {
						state = 'room';
					} else {
                        state = 'map';
                    }

                    proceed_key.onDown.addOnce(_self.start, _self);
                } else {
                    // change text
                    // console.log("in game!!!");
					if (serverState.num_player > 4) {
                        instruction.setText("Full slots!!! Please come back later");
                    } else {
                        instruction.setText("In game!!! Please come back later");
					}
                }
            }
        });


	},

	start: function() {
		game.state.start(state);
	
	}
};
