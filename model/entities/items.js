//TODO Item class //DONE
//TODO generateItems() -> generate items on map //DONE
//TODO checkOverlap() -> check overlap player with items
//TODO checkVisibility() -> Destroy breakables -> visible item
//TODO Associate with player.js attribute (limit, length, velocity <-> bomb_num, bomb_length, speed)


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
    game.physics.arcade.overlap(this, players, this.destroyItems);
    breakables.forEachDead(this.checkCor, _self);
};

Items.prototype.checkCor = function (breakable) {
    if (breakable.x === this.x && breakable.y === this.y) {
        this.visible = true;
    }
};
Items.prototype.destroyItems = function (item, aPlayer) {
    if (item.type === 'length') {
        if (aPlayer.length < 8) {
            aPlayer.length++;
        }
    }
    else if (item.type === 'limit') {
        if (aPlayer.limit < 10) {
            aPlayer.limit++;
        }
    }
    item.destroy();
    console.log('Item picked');
};




