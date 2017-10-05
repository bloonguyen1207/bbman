// Map tiles
var nonbreakables;
var shrubs;
var breakables;
var players;
var mapText;
var bombs;
var fire;
// var timeLimit;
// var timerEvent;
var timerText;
var bg_map1 = "#602320";
var bg_map2 = "#A5F2F3";
var bg_map4 = "#261712";
var items;
var rdBlock;
var rdItems;
var type;


var play = {
    mapValue: 0,
    isFinishLoad: false,

	create: function() {
        this.isFinishLoad = false;
        state = 'play';
        socket.emit('setClientState', 'play');
        socket.emit('setInGame', true);

        this.initWorld();
        muteToggle.onDown.add(toggleAudio, this);

        socket.emit('checkServerState');
        socket.on('returnServerState', function (serverState) {
            if (state == 'play') {
                play.mapValue = serverState.mapValue;
                play.initBackground(serverState.mapValue);
                play.loadMapFile(serverState.mapValue);
                //TODO: if host then emit, else dont
                socket.emit('getClientIndex');
                socket.once('returnClientIndex', function (clientIndex) {
                    var clientReady = serverState.clientsReady[clientIndex];
                    if (clientReady == "Host") {
                        socket.emit("loadItems", {length:breakables.length});
                    }
                });
                play.initItems(breakables.length);
            }
        });
        socket.on('updatePlayer', function(location) {
            // console.log(players.children[0].id);
            // console.log(location.id);
            players.children.forEach(function (player) {
                // console.log(player.id);
                if (location.id == player.id) {
                    if (location.x > player.x) {
                        player.length = location.length;
                        player.animations.play('right');
                    } else if (location.x < player.x) {
                        player.length = location.length;
                        player.animations.play('left');
                    } else if (location.y > player.y) {
                        player.length = location.length;
                        player.animations.play('up');
                    } else if (location.y < player.y) {
                        player.length = location.length;
                        player.animations.play('down');
                    } else {
                        player.animations.stop();
                        player.frame = 0;
                    }
                    player.x = location.x;
                    player.y = location.y;
                }
            });
        });
        socket.on('updateBomb', function (sBomb) {
            var playerIndex = -1;
            players.children.forEach(function (player, index) {
                if (player.id == sBomb.id) {
                    playerIndex = index;
                }
            });
            var bomb = new Bomb(players.getChildAt(playerIndex));
            bomb.x = sBomb.x;
            bomb.y = sBomb.y;
            // add bomb
            bombs.add(bomb);

            players.getChildAt(playerIndex).dropX = bomb.x;
            players.getChildAt(playerIndex).dropY = bomb.y;
        });
        socket.on('updatePlayerDestroy', function (sPlayer) {
            players.children.forEach(function (player) {
                if (player.id == sPlayer.id && player.alive) {
                    player.kill();
                    players.removeChild(player);
                }
            });
        });

    },

    update: function () {
        //game.physics.arcade.overlap(players, items, this.destroyItem);
        if ((players.length == 1 && this.isFinishLoad) || timeLimit < (this.game.time.totalElapsedSeconds() - timeStart)/*|| !timeLimit.running*/) {
            timerText.setText('00:00');
            this.gameOver();
        } else {
            //print timeLimit
            timerText.setText(this.formatTime(timeLimit - Math.floor(this.game.time.totalElapsedSeconds() - timeStart)));

        }
    },

    actionOnClick: function () {
        socket.removeAllListeners('updateServerState');
        // socket.removeAllListeners('returnServerState');
        socket.removeAllListeners('updatePlayer');
        socket.removeAllListeners('updateBomb');
        socket.removeAllListeners('updatePlayerDestroy');
        socket.emit('resetGame');
        // timeLimit.reset();
        // timeLimit.removeAll();
        // game.time.events.remove(timerEvent);
        // timerEvent = timeLimit.remove();

        game.state.start('menu');
    },

    render: function () {
        // // change group name
        // function renderGroup(member) {
        //     //show hitbox of single sprite
        //     game.debug.body(member);
        // }

        // // show hitboxFire
        // var playersArray = players.children;
        // playersArray.forEach(function (player) {
        //     game.debug.body(player.hitboxFire);
        // });

        // //show fireRange
        // // var fireArray = fire.children;
        // // fireArray.forEach(function (fireG) {
        // //     fireG.fireGroup.forEachAlive(renderGroup, this);
        // // });

        // //items.forEachAlive(renderGroup, this);
        // // bombs.forEachAlive(renderGroup, this);
        // players.forEachAlive(renderGroup, this);


    },

    formatTime: function (s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    },

    initWorld: function () {
        //game.physics.enable()
        // Create iron iron
        irons = game.add.group();
        irons.enableBody = true;

        // Create nonbreakable nonbreakable
        nonbreakables = game.add.group();
        nonbreakables.enableBody = true;

        // Create breakables
        breakables = game.add.group();
        breakables.enableBody = true;

        //Item
        items = game.add.group();
        items.enableBody = true;
        //var item;

        // Create players
        players = game.add.group();

        // Create Bombs + Fire
        bombs = game.add.group();
        bombs.enableBody = true;

        fire = game.add.group();
        fire.enableBody = true;

        // Timer
        // timeLimit = game.time.create(true);
        // timerEvent = timeLimit.add(Phaser.Timer.MINUTE * 3 + Phaser.Timer.SECOND * 0, this.gameOver, this);
        // timeLimit.start();
        timeLimit = 180;
        timeStart = this.game.time.totalElapsedSeconds();


        timerText = game.add.text(game.world.centerX, 0, "", {
            font: "20px Arial",
            fill: "#000000",
            backgroundColor: "#ffffff",
            align: "center"
        });
        timerText.anchor.set(0.5, 0);

        game.world.bringToTop(players);
        game.world.bringToTop(breakables);
        game.world.bringToTop(timerText);
    },

    initBackground: function (val) {
        switch (val) {
            case 1:
                game.stage.backgroundColor = bg_map1;
                break;
            case 2:
                game.stage.backgroundColor = bg_map2;
                break;
            case 3:
                var bg = game.add.sprite(0, 0, 'grassbg');
                break;
            case 4:
                game.stage.backgroundColor = bg_map4;
                break;
        }

        uiPickSfx.play();
        Bgm[val].play();
        Bgm[0].stop();
    },

    loadMapFile: function (val) {
        // Load mapfile
        var nonbreakable;
        var breakable;
        var count = 0;
        var spawnSpots = [];

        var mapFile = game.cache.getText('map' + val);
        mapText = mapFile.split('\n');
        for (i = 0; i < 15; i++) {
            for (var j = 0; j < 19; j++) {
                if (mapText[i][j] == 1) {
                    switch (val) {
                        case 1:
                            nonbreakable = nonbreakables.create(j * 32, i * 32, 'volcano');
                            nonbreakable.scale.setTo(0.2, 0.2);
                            break;
                        case 2:
                            nonbreakable = nonbreakables.create(j * 32, i * 32, 'steel');
                            nonbreakable.scale.setTo(0.32, 0.32);
                            break;
                        case 3:
                            nonbreakable = nonbreakables.create(j * 32, i * 32, 'tree');
                            break;
                        case 4:
                            nonbreakable = nonbreakables.create(j * 32, i * 32, 'iron');
                            nonbreakable.scale.setTo(0.4, 0.4);
                            break;
                        default:
                            console.log("No map selected.");
                            break;
                    }
                    nonbreakable.body.immovable = true;
                } else if (mapText[i][j] == 2) {
                    switch (val) {
                        case 1:
                            breakable = breakables.create(j * 32, i * 32, 'fossil');
                            break;
                        case 2:
                            breakable = breakables.create(j * 32, i * 32, 'ice');
                            breakable.scale.setTo(0.5, 0.5);
                            break;
                        case 3:
                            breakable = breakables.create(j * 32, i * 32, 'shrub');
                            break;
                        case 4:
                            breakable = nonbreakables.create(j * 32, i * 32, 'brick');
                            breakable.scale.setTo(0.5, 0.5);
                            break;
                        default:
                            console.log("No map selected.");
                            break;
                    }
                    breakable.body.immovable = true;

                } else if (mapText[i][j] == 'x') {
                    socket.emit('getClientIndex');
                    spawnSpots.push([i, j]);
                }
            }

        }
        socket.once('returnClientIndex', function (idx) {
            var player = new Player(socket.id, spawnSpots[idx][1] * 32, spawnSpots[idx][0] * 32, idx);
            players.add(player);
            socket.emit('playerSpawn', {
                id: socket.id,
                x: spawnSpots[idx][1] * 32,
                y: spawnSpots[idx][0] * 32,
                type: idx
            });
            socket.on('createPlayer', function(splayer) {
                players.add(new Player(splayer.id, splayer.x, splayer.y, splayer.type));
                play.isFinishLoad = true;
            })
        });
    },

    initItems: function (blength) {
        socket.once("returnItems", function(itemsData) {
            for (i = 0; i < itemsData.Loc.length; i++) {
                if (itemsData.Type[i] === 0) {
                    type = 'length';
                    items.add(new Items(type, breakables.children[itemsData.Loc[i]].x, breakables.children[itemsData.Loc[i]].y));
                } else if (itemsData.Type[i] === 1) {
                    type = 'limit';
                    items.add(new Items(type, breakables.children[itemsData.Loc[i]].x, breakables.children[itemsData.Loc[i]].y));
                } else {
                    type = 'velocity';
                    items.add(new Items(type, breakables.children[itemsData.Loc[i]].x, breakables.children[itemsData.Loc[i]].y));
                }
            }
        });
    },

    gameOver: function () {
        // timeLimit.stop();
        Bgm[play.mapValue].stop();
        var game_over = game.add.sprite(0, 0, 'game_over');
        game_over.alpha = 0.1;
        var title = game.add.text(game.world.width / 2 - 100, 10, "Game Over", {
            font: '40px Coiny',
            fill: '#ff9900',
            align: 'center'
        });
        // game.paused = true;
        var back_btn = game.add.button(game.world.centerX - 30, game.world.height - 70, 'exit', this.actionOnClick, this, 2, 1, 0);
        back_btn.scale.setTo(0.06, 0.03);
    }
};