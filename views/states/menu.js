// var title_text = "Fire the hole";
var instruction_text = "Press space to proceed";
var titleOffsetX = 55;
var titleOffsetY = 20;
var state;
var socket = io();

var menu = {

    create: function () {
        state = 'menu';

        Bgm[0].play();
        var bg = game.add.sprite(0, 0, 'menubg');
        bg.scale.setTo(0.6, 0.65);

        game.load.image('title', 'res/tilesets/title.png');

        muteToggle.onDown.add(toggleAudio, this);

        // run
        socket.emit('checkServerState');
        // console.log("checkServerState");
        socket.on('returnServerState', menu.returnServerState);

    },

    start: function (key, serverState) {
        console.log("start");
        console.log(serverState);
        socket.removeListener('updateServerState', menu.updateServerState);
        socket.removeListener('returnServerState', menu.returnServerState);
        game.state.start(state);
    },

    // instruction
    drawInstruction: function () {
        menu.instruction = game.add.text(0, 0, instruction_text, {
            font: '30px Coiny',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        menu.instruction.alpha = 0;
        menu.instruction.setTextBounds(0, game.world.height - 40, game.world.width, 40);
        game.add.tween(menu.instruction).to({alpha: 1}, 800, Phaser.Easing.Linear.None, true, 0, 1000, true);
    },

    updateInstruction: function (newString) {
        menu.instruction.setText(newString);
    },

    changeStateCondition: function (serverState) {
        if (serverState.numPlayer > 1 && serverState.isSetMap) {
            state = 'room';
        } else {
            state = 'map';
        }

        if (state == 'room' && serverState.mapValue == 0) {
            menu.proceed_key.onDown.remove(this.start, this);
            menu.updateInstruction("Choosing map!!! Please wait...");
        } else {
            menu.updateInstruction(instruction_text);
            menu.proceed_key.onDown.addOnce(this.start, this, 0, serverState);
        }
    },

    // check server state
    checkServerState: function (serverState) {
        // console.log("check server state");
        if (!serverState.isInGame && serverState.numPlayer <= 4) {
            menu.proceed_key = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

            console.log(socket.id);

            menu.changeStateCondition(serverState);

        } else {
            // change text
            // console.log("in game!!!");
            if (serverState.numPlayer > 4) {
                menu.updateInstruction("Full slots!!! Please come back later");
            } else {
                menu.updateInstruction("In game!!! Please come back later");
            }
        }
    },

    updateServerState: function (updateServerState) {

        // console.log("updateServerState");
        // serverState = updateServerState;
        // console.log(serverState);

        menu.checkServerState(updateServerState);
    },

    returnServerState: function (serverState) {
        // console.log(serverState);
        // console.log(menu);
        if (state == 'menu') {
            //draw instruction
            menu.drawInstruction();

            // check server state
            console.log("returnServerState");
            menu.checkServerState(serverState);

            //update server state
            socket.on('updateServerState', menu.updateServerState);
        }
    }
};
