var instruction_text = "Press space to proceed";
var titleOffsetX = 55;
var titleOffsetY = 20;

var room = {
    playerReadyGroup: [],

    create: function () {
        state = 'room';

        uiPickSfx.play();
        muteToggle.onDown.add(toggleAudio, this);


        socket.emit('setClientState', 'room');

        // Declare stuff
        var slots = 4;

        var bg = game.add.sprite(0, 0, 'grassbg');

        var roomImage = game.add.sprite(game.world.width / 2 - 265, 60, 'empty_room');
        roomImage.scale.setTo(0.55, 0.55);

        var back_btn = game.add.button(game.world.centerX + 130, game.world.centerY + 100, 'exit', this.actionOnClick, this, 2, 1, 0);
        back_btn.scale.setTo(0.06, 0.03);

        this.proceed_key = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        // Declare stuff
        var title = game.add.text(game.world.width / 2 - 50, 10, "Room", {
            font: '40px Coiny',
        });
        var instruction = game.add.text(game.world.centerX - 175, game.world.height - 40, instruction_text, {
            font: '30px Coiny',
        });
        instruction.alpha = 0;

        game.add.tween(instruction).to({alpha: 1}, 800, Phaser.Easing.Linear.None, true, 0, 1000, true);

		//TODO: Implement socket to add new icon to slot when a player enters room & transfer it to menu.js

        // 	// var test = game.add.text(50, 50, data.numPlayer, {
        // 	// 	font: '30px Coiny',
        // 	// });
        // });
        this.playerImagesGroup = game.add.group();

        socket.emit('checkServerState');
        socket.once('returnServerState', room.returnServerState);
	},

	actionOnClick: function() {
        socket.removeAllListeners('updateServerState');
        socket.removeAllListeners('letsPlay');
        // socket.removeAllListeners('returnServerState');
    	game.state.start('menu');
	
	},

	start: function() {
        socket.removeAllListeners('updateServerState');
        // socket.removeAllListeners('returnServerState');
		game.state.start('play');

    },

    chooseImage: function (val) {
        var fire;
        var ice;
        var forest;
        var cave;

        if (val == 1) {

            fire = game.add.sprite(130, 100, 'fire_room');

            fire.animations.add('burn');

            fire.animations.play('burn', 50, true);
        } else if (val == 2) {

            ice = game.add.sprite(137, 130, 'ice_room');
            ice.scale.setTo(0.07, 0.07);

        } else if (val == 3) {

            forest = game.add.sprite(125, 130, 'forest_room');

            forest.scale.setTo(0.5, 0.5);

            forest.animations.add('grow');

            forest.animations.play('grow', 30, true);
        } else if (val == 4) {
            cave = game.add.sprite(110, 150, 'cave_room');

            cave.scale.setTo(0.16, 0.16);

        }
    },

    initPlayerImages: function () {
        var drawPlayer = function (x, y, image) {
            var playerImage = room.playerImagesGroup.create(x, y, image);
            playerImage.scale.setTo(0.1, 0.1);
        };

        drawPlayer(game.world.width / 2 + 38, 115, 'player_3');
        drawPlayer(game.world.width / 2 + 142, 115, 'player_1');
        drawPlayer(game.world.width / 2 + 38, 215, 'player_2');
        drawPlayer(game.world.width / 2 + 142, 215, 'player_4');
    },

    drawPlayers: function (serverState) {
        room.playerImagesGroup.setAll('visible', false);
        serverState.clientsState.forEach(function (clientState, index) {
            if (clientState == 'room') {
                room.playerImagesGroup.getChildAt(index).visible = true;
            }
        });
    },

    initPlayersReady: function () {
        var drawPlayerReady = function (x, y) {
            var playerReady = game.add.text(0, 0, "", {
                font: '20px Coiny',
                boundsAlignH: "center",
                boundsAlignV: "middle"
            });

            playerReady.alpha = 0;
            playerReady.setTextBounds(x, y, 50, 20);
            game.add.tween(playerReady).to({alpha: 1}, 800, Phaser.Easing.Linear.None, true, 0, 1000, true);
            room.playerReadyGroup.push(playerReady);
        };
        drawPlayerReady(game.world.width / 2 + 38, 135);
        drawPlayerReady(game.world.width / 2 + 142, 135);
        drawPlayerReady(game.world.width / 2 + 38, 235);
        drawPlayerReady(game.world.width / 2 + 142, 235);
    },

    drawPlayersReady: function (serverState) {
        room.playerReadyGroup.forEach(function (playerReady) {
            playerReady.setText("");
        });
        serverState.clientsReady.forEach(function (clientReady, index) {
            if (serverState.clientsState[index] == 'room') {
                room.updatePlayerReady(index, clientReady);
            }
        });
    },

    updatePlayerReady: function (index, clientReady) {
        room.playerReadyGroup[index].setText(clientReady);
    },

    updateHost: function (serverState) {
        var countPlayers = 0;
        var checkReady = 1; //Host counts as Ready
        serverState.clientsState.forEach(function (clientState, index) {
            if (clientState == 'room') {
                countPlayers += 1;
                if (serverState.clientsReady[index] == "Ready") {
                    checkReady += 1;
                }
            }
        });
        if (checkReady == countPlayers && checkReady > 1) {
            socket.emit('goToGame');
            socket.once('letsPlay', function () {
                room.start();
            });
        } else {
            socket.removeAllListeners("letsPlay");
            socket.emit('setClientReady', "Host");
        }
    },

    checkClientReady: function (key, serverState) {
        socket.emit('getClientIndex');
        socket.once('returnClientIndex', function (clientIndex) {
            var clientReady = serverState.clientsReady[clientIndex];
            if (clientReady == "Host") {
                room.updateHost(serverState);
            } else if (clientReady == "") {
                socket.emit('setClientReady', "Ready");
                socket.once('letsPlay', function () {
                    room.start();
                })
            } else if (clientReady == "Ready") {
                socket.removeAllListeners("letsPlay");
                socket.emit('setClientReady', "");
            }
        });
    },

    runRoom: function (serverState) {
        room.drawPlayers(serverState);
        room.drawPlayersReady(serverState);
        room.proceed_key.onDown.addOnce(this.checkClientReady, this, 0, serverState);
    },

    returnServerState: function (serverState) {
        if (state == 'room') {
            room.initPlayerImages();
            room.initPlayersReady();
            room.chooseImage(serverState.mapValue);

            room.runRoom(serverState);

            socket.on('updateServerState', function (updateServerState) {
                console.log(updateServerState);
                room.proceed_key.onDown.removeAll();
                room.runRoom(updateServerState);
            });
        }
    }
};