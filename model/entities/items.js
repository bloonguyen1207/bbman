//Constructor for creating object item , 3 parameter , type of item, coor x and y to place item on map
function Items(type, x, y) {
    this.type = null;


    if (type === 'length') {
        Phaser.Sprite.call(this, game, x, y, 'bomb_length');
        this.type = 'length';
    }

    else if (type === 'limit') {
        Phaser.Sprite.call(this, game, x, y, 'bomb_num');
        this.type = 'limit';
    }

    else if (type === 'velocity') {
        Phaser.Sprite.call(this, game, x, y, 'speed');
        this.type = 'velocity';
    }
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.immovable = true;
    this.body.setSize(24, 24, 4, 4);
    this.visible = false;


}

Items.prototype = Object.create(Phaser.Sprite.prototype);
Items.prototype.update = function () {
    var _self = this;
    //check overlap each player with items
    for (i = 0; i < players.length; i++) {
        game.physics.arcade.overlap(this, players.children[i], this.destroyItems);
    }
    breakables.forEachDead(this.checkCor, _self);
};

Items.prototype.checkCor = function (breakable) {
    //function to check coordinate of breakable , if there is a breakable item will invisible till breakable is destroyed
    if (breakable.x === this.x && breakable.y === this.y) {
        this.visible = true;
    }
};
Items.prototype.destroyItems = function (item, aPlayer) {
    pickupSfx.play();
    if (item.type === 'length') {
        if (aPlayer.length < 6) {
            aPlayer.length++;
        }
    }
    else if (item.type === 'limit') {
        if (aPlayer.limit < 8) {
            aPlayer.limit++;
        }
    }
    else if (item.type === 'velocity') {
        if (aPlayer.speed < 230) {
            aPlayer.speed = aPlayer.speed + 20;
        }
    }
    item.destroy();
    console.log('Item picked');
};
