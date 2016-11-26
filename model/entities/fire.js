//TODO fix chain explosion

function Fire(aBomb) {
    // this.id = id;
    //add player length
    this.belongBomb = aBomb;
    this.fireGroup = game.add.group();
    this.fireGroup.enableBody = true;
    this.createExplosion();

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;

    // this.body.setCircle(16);
    game.time.events.add(500, this.endFire, this);
}

Fire.prototype = Object.create(Phaser.Sprite.prototype);

Fire.prototype.update = function () {
    this.checkOtherOverlap();
};

Fire.prototype.createExplosion = function () {
    var upExplosion = true;
    var downExplosion = true;
    var leftExplosion = true;
    var rightExplosion = true;
    // var temp;
    Phaser.Sprite.call(this, game, this.belongBomb.x, this.belongBomb.y, 'fire');
    var crossExplosion = this.fireGroup.create(this.belongBomb.x, this.belongBomb.y, 'fire');
    crossExplosion.animations.add('explodeChanged', [0, 7, 14, 21, 14, 7, 0], 14);
    for (var i = 1; i <= this.belongBomb.owner.length; i++) {
        if (i === this.belongBomb.owner.length) {
            upExplosion = this.oneSideExplosion(this.belongBomb.x, this.belongBomb.y - i * 32, [3, 10, 17, 24, 17, 10, 3], upExplosion);
            downExplosion = this.oneSideExplosion(this.belongBomb.x, this.belongBomb.y + i * 32, [4, 11, 18, 25, 18, 11, 4], downExplosion);
            leftExplosion = this.oneSideExplosion(this.belongBomb.x - i * 32, this.belongBomb.y, [6, 13, 20, 27, 20, 13, 6], leftExplosion);
            rightExplosion = this.oneSideExplosion(this.belongBomb.x + i * 32, this.belongBomb.y, [5, 12, 19, 26, 19, 12, 5], rightExplosion);
        } else {
            upExplosion = this.oneSideExplosion(this.belongBomb.x, this.belongBomb.y - i * 32, [1, 8, 15, 22, 15, 8, 1], upExplosion);
            downExplosion = this.oneSideExplosion(this.belongBomb.x, this.belongBomb.y + i * 32, [1, 8, 15, 22, 15, 8, 1], downExplosion);
            leftExplosion = this.oneSideExplosion(this.belongBomb.x - i * 32, this.belongBomb.y, [2, 9, 16, 23, 16, 9, 2], leftExplosion);
            rightExplosion = this.oneSideExplosion(this.belongBomb.x + i * 32, this.belongBomb.y, [2, 9, 16, 23, 16, 9, 2], rightExplosion);
        }
    }
    // this.animations.play('explodeChanged', 14);
    this.fireGroup.callAll('animations.play', 'animations', 'explodeChanged', 14);
};

Fire.prototype.oneSideExplosion = function (x, y, keyframe, side) {
    var temp;
    if (side) {
        temp = this.fireGroup.create(x, y, 'fire');
        if (this.checkOtherOverlap()) {
            side = false;
        }

        if (game.physics.arcade.overlap(unbreakables, temp)) {
            temp.kill();
            side = false;
        }
        game.physics.arcade.overlap(temp, bombs, this.chainExplosion);
        temp.animations.add('explodeChanged', keyframe, 14);
    }
    return side;
};

Fire.prototype.chainExplosion = function (oneFire, bomb) {
    game.time.events.remove(bomb.timer);
    bomb.explode();
};

Fire.prototype.checkOtherOverlap = function () {
    var isOverlap = false;
    var _self = this;
    if (game.physics.arcade.overlap(breakables, this.fireGroup, this.destroyOtherOverlap)) {
        console.log("breakable vs fire");

        isOverlap = true;
    }

    playersArray = players.children;

    var checkOverlapPlayerFire = function (player) {
        if (game.physics.arcade.overlap(player.hitboxFire, _self.fireGroup, _self.destroyOtherOverlap)) {
            console.log("player vs fire");
            isOverlap = true;
        }
    };

    playersArray.forEach(checkOverlapPlayerFire);

    //items

    return isOverlap;
};

Fire.prototype.destroyOtherOverlap = function (destroyable) {
    console.log("fire destroy overlap");
    destroyable.kill();

};

Fire.prototype.endFire = function () {
    console.log("end");
    this.fireGroup.callAll('kill');
    this.destroy();
};