// Map tiles
var unbreakables;
var shrubs;
var breakables;
var players;
var mapText;
var bombs;
var fire;
var bg_map1 = "#602320";
var bg_map2 = "#A5F2F3";
var bg_map4 = "#261712";
var items;
var rdBlock;
var rdItems;
var type;

var play = {

	create: function() {

        if (val == 1) {
            game.stage.backgroundColor = bg_map1;
        } else if (val == 2) {
            game.stage.backgroundColor = bg_map2;
        } else if (val == 3) {
            var bg = game.add.sprite(0, 0, 'grassbg');
        } else if (val == 4) {
            game.stage.backgroundColor = bg_map4;
        }


        //game.physics.enable()
        // Create iron iron
        irons = game.add.group();
        irons.enableBody = true;

        // Create unbreakable unbreakable
        unbreakables = game.add.group();
        unbreakables.enableBody = true;


        var unbreakable;

        // Create Shrubs
        shrubs = game.add.group();
        shrubs.enableBody = true;

        var shrub;

        // Create breakables
        breakables = game.add.group();
        breakables.enableBody = true;

        var breakable;

        //Item
        items = game.add.group();
        items.enableBody = true;
        //var item;

        // Create players
        players = game.add.group();

        // Load mapfile
        var mapFile = game.cache.getText('map' + val);
        mapText = mapFile.split('\n');
        for (i = 0; i < 15; i++) {
            for (var j = 0; j < 19; j++) {
                if (mapText[i][j] == 1) {
                    if (val == 1) {
                        unbreakable = unbreakables.create(j * 32, i * 32, 'volcano');
                        unbreakable.scale.setTo(0.2, 0.2);
                    } else if (val == 2) {
                        unbreakable = unbreakables.create(j * 32, i * 32, 'steel');
                        unbreakable.scale.setTo(0.32, 0.32);
                    } else if (val == 3) {
                        unbreakable = unbreakables.create(j * 32, i * 32, 'tree');
                    } else if (val == 4) {
                        unbreakable = unbreakables.create(j * 32, i * 32, 'iron');
                        unbreakable.scale.setTo(0.4, 0.4);
                    }
                    unbreakable.body.immovable = true;
                } else if (mapText[i][j] == 2) {
                    if (val == 1) {
                        breakable = breakables.create(j * 32, i * 32, 'fossil');


                    } else if (val == 2) {
                        breakable = breakables.create(j * 32, i * 32, 'ice');
                        breakable.scale.setTo(0.5, 0.5);
                    } else if (val == 3) {
                        breakable = breakables.create(j * 32, i * 32, 'shrub');
                        // breakable.scale.setTo(0.5, 0.5);
                    } else if (val == 4) {
                        breakable = unbreakables.create(j * 32, i * 32, 'brick');
                        breakable.scale.setTo(0.5, 0.5);
                    }

                    breakable.body.immovable = true;

                }

                else if (mapText[i][j] == 'x') {
                    players.add(new Player(j * 32, i * 32));
                }
            }

        }


        for (i = 0; i < breakables.length; i++) {
            rdBlock = Math.floor(Math.random() * 144) + 1;
            //random integer associated with Item (If < 2 , generate bomblength .... )
            rdItems = Math.floor(Math.random() * 14) + 1;
            if (rdItems < 2) {
                type = 'length';
                items.add(new Items(type, breakables.children[rdBlock].x, breakables.children[rdBlock].y));

            }
            else if (rdItems < 3) {
                type = 'limit';
                items.add(new Items(type, breakables.children[rdBlock].x, breakables.children[rdBlock].y));

            }
            else if (rdItems < 4) {
                type = 'velocity';
                items.add(new Items(type, breakables.children[rdBlock].x, breakables.children[rdBlock].y));

            }
        }


        // Create Bombs + Fire
        bombs = game.add.group();
        bombs.enableBody = true;

        fire = game.add.group();
        fire.enableBody = true;

        game.world.bringToTop(players);
        game.world.bringToTop(breakables);
        
	},

    update: function () {
        //game.physics.arcade.overlap(players, items, this.destroyItem);
        if (players.getFirstAlive() === null) {
            console.log("End game!!!!");
            game.paused = true;
        }
    },

	render: function() {
        // change group name
        function renderGroup(member) {
            //show hitbox of single sprite
            game.debug.body(member);
        }

        //show hitboxFire
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
    }

    //Destroy item when Player overlap
    // destroyItem: function (aPlayer, item) {
    //     item.kill();
    //     console.log("item Pick");
    // }
};