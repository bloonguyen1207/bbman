// Map tiles
var unbreakables;
var shrubs;
var breakables;
var players;
var mapText;
var bombs;
var fire;
// var timeLimit;
// var timerEvent;
// var timerText;
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
                play.initItems(breakables.length);
            }
        });

    },

    update: function () {
        //game.physics.arcade.overlap(players, items, this.destroyItem);
        if ((players.length == 1 && this.isFinishLoad) || !timeLimit.running) {
            this.gameOver();
        } else {
            //print timeLimit
            timerText.setText(this.formatTime(Math.round((timerEvent.delay - timeLimit.ms) / 1000)));
            socket.on('updatePlayer', function(location) {
                // console.log(players.children[0].id);
                for (var i = 0; i < players.length; i++) {
                    // console.log(players[i].id)                    
                    if (location.id == players.children[i].id) {
                        if (location.x > players.children[i].x) {
                            players.children[i].animations.play('right');
                        } else if (location.x < players.children[i].x) {
                            players.children[i].animations.play('left');
                        } else if (location.y > players.children[i].y) {
                            players.children[i].animations.play('up');
                        } else if (location.y < players.children[i].y) {
                            players.children[i].animations.play('down');
                        } else {
                            players.children[i].animations.stop(true);
                            players.children[i].frame = 0;
                        }
                        players.children[i].x = location.x;
                        players.children[i].y = location.y;
                        players.children[i].updateHitboxLocation();
                    }
                }
            });
        }
    },

    actionOnClick: function () {
        // socket.removeAllListeners('updateServerState');
        socket.removeAllListeners('returnServerState');
        socket.emit('resetGame');

        game.state.start('menu');
    },

    render: function () {
        // change group name
        function renderGroup(member) {
            //show hitbox of single sprite
            game.debug.body(member);
        }

        // show hitboxFire
        var playersArray = players.children;
        playersArray.forEach(function (player) {
            game.debug.body(player.hitboxFire);
        });

        //show fireRange
        // var fireArray = fire.children;
        // fireArray.forEach(function (fireG) {
        //     fireG.fireGroup.forEachAlive(renderGroup, this);
        // });

        //items.forEachAlive(renderGroup, this);
        // bombs.forEachAlive(renderGroup, this);
        players.forEachAlive(renderGroup, this);


    },

    formatTime: function (s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    },

    //Destroy item when Player overlap
    // destroyItem: function (aPlayer, item) {
    //     item.kill();
    //     console.log("item Pick");
    // }
    initWorld: function () {
        //game.physics.enable()
        // Create iron iron
        irons = game.add.group();
        irons.enableBody = true;

        // Create unbreakable unbreakable
        unbreakables = game.add.group();
        unbreakables.enableBody = true;

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
        timeLimit = game.time.create(true);
        timerEvent = timeLimit.add(Phaser.Timer.MINUTE * 3 + Phaser.Timer.SECOND * 0, this.gameOver, this);
        timeLimit.start();


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
        var unbreakable;
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
                            unbreakable = unbreakables.create(j * 32, i * 32, 'volcano');
                            unbreakable.scale.setTo(0.2, 0.2);
                            break;
                        case 2:
                            unbreakable = unbreakables.create(j * 32, i * 32, 'steel');
                            unbreakable.scale.setTo(0.32, 0.32);
                            break;
                        case 3:
                            unbreakable = unbreakables.create(j * 32, i * 32, 'tree');
                            break;
                        case 4:
                            unbreakable = unbreakables.create(j * 32, i * 32, 'iron');
                            unbreakable.scale.setTo(0.4, 0.4);
                            break;
                        default:
                            console.log("No map selected.");
                            break;
                    }
                    unbreakable.body.immovable = true;
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
                            breakable = unbreakables.create(j * 32, i * 32, 'brick');
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
            var player = new Player(socket.id, spawnSpots[idx][1] * 32, spawnSpots[idx][0] * 32); 
            players.add(player);
            socket.emit('playerSpawn', {id: socket.id, x: spawnSpots[idx][1] * 32, y: spawnSpots[idx][0] * 32});
            socket.on('createPlayer', function(splayer) {
                players.add(new Player(splayer.id, splayer.x, splayer.y));
                play.isFinishLoad = true;
            })
        });
    },

    initItems: function (blength) {
        for (i = 0; i < blength; i++) {
            rdBlock = Math.floor(Math.random() * blength);
            //random integer associated with Item (If < 2 , generate bomblength .... )
            rdItems = Math.floor(Math.random() * 14) + 1;
            if (rdItems < 2) {
                type = 'length';

                items.add(new Items(type, breakables.children[rdBlock].x, breakables.children[rdBlock].y));


                for (i = 0; i < items.length; i++) {
                    if (items.children[i].x === breakables.children[rdBlock].x && items.children[i].y === breakables.children[rdBlock].y) {
                        break;
                    }
                }


            }
            else if (rdItems < 3) {
                type = 'limit';

                items.add(new Items(type, breakables.children[rdBlock].x, breakables.children[rdBlock].y));


                for (i = 0; i < items.length; i++) {
                    if (items.children[i].x === breakables.children[rdBlock].x && items.children[i].y === breakables.children[rdBlock].y) {
                        break;
                    }
                }
            }
            else if (rdItems < 4) {
                type = 'velocity';


                items.add(new Items(type, breakables.children[rdBlock].x, breakables.children[rdBlock].y));


                for (i = 0; i < items.length; i++) {
                    if (items.children[i].x === breakables.children[rdBlock].x && items.children[i].y === breakables.children[rdBlock].y) {
                        break;
                    }
                }
            }
        }
    },

    gameOver: function () {
        timeLimit.stop();
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