//TODO fix chain explosion

function Fire(bomb) {
    // this.id = id;
    //add player length
    // console.log("Fireeeeee!!!!");
    // console.log(this);
    this.length = bomb.length;
    this.fireGroup = game.add.group();
    this.fireGroup.enableBody = true;
    this.createExplosion(bomb);

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;

    // this.body.setCircle(16);
    game.time.events.add(1000, this.endFire, this);
}

Fire.prototype = Object.create(Phaser.Sprite.prototype);

Fire.prototype.update = function () {
    this.checkOtherOverlap();
};

Fire.prototype.createExplosion = function (bomb) {
    var upExplosion = true;
    var downExplosion = true;
    var leftExplosion = true;
    var rightExplosion = true;
    // var temp;
    Phaser.Sprite.call(this, game, bomb.x, bomb.y, 'fire');
    this.animations.add('explodeChanged', [0, 7, 14, 21, 14, 7, 0], 7);
    for (var i = 1; i <= bomb.length; i++) {
        upExplosion = this.oneSideExplosion(bomb.x, bomb.y - i * 32, [1, 8, 15, 22, 15, 8, 1], upExplosion);
        downExplosion = this.oneSideExplosion(bomb.x, bomb.y + i * 32, [1, 8, 15, 22, 15, 8, 1], downExplosion);
        leftExplosion = this.oneSideExplosion(bomb.x - i * 32, bomb.y, [2, 9, 16, 23, 16, 9, 2], leftExplosion);
        rightExplosion = this.oneSideExplosion(bomb.x + i * 32, bomb.y, [2, 9, 16, 23, 16, 9, 2], rightExplosion);
    }
    this.animations.play('explodeChanged', 7);
    this.fireGroup.callAll('animations.play', 'animations', 'explodeChanged', 7);
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

        // game.physics.arcade.overlap(bombs, this.fireGroup, this.chainExplosion);
        temp.animations.add('explodeChanged', keyframe, 7);
    }
    return side;
};

Fire.prototype.chainExplosion = function (bomb) {
    game.time.events.remove(bomb.timer);
    bomb.explode();
};

Fire.prototype.checkOtherOverlap = function () {
    var isOverlap = false;
    if (game.physics.arcade.overlap(breakables, this.fireGroup, this.destroyOtherOverlap)) {
        console.log("breakable vs fire");
        isOverlap = true;
    }

    if (game.physics.arcade.overlap(players, this.fireGroup, this.destroyOtherOverlap)) {
        console.log("player vs fire");
        isOverlap = true;
    }

    //items

    return isOverlap;
};

Fire.prototype.destroyOtherOverlap = function (destroyable) {
    console.log("fire destroy overlap");
    console.log(destroyable);
    destroyable.kill();
};

Fire.prototype.endFire = function () {
    console.log("end");
    this.fireGroup.callAll('kill');
    this.destroy();
};