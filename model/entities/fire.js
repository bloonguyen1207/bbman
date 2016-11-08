function Fire(bomb, aPlayer) {
    // this.id = id;
    //add player length
    // console.log("Fireeeeee!!!!");
    // console.log(this);
    this.fireGroup = game.add.group();
    this.fireGroup.enableBody = true;
    this.createExplosion(bomb, aPlayer);

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;

    // this.body.setCircle(16);
    game.time.events.add(1000, this.endFire, this);
    this.fireRange = 0;
}

Fire.prototype = Object.create(Phaser.Sprite.prototype);

Fire.prototype.createExplosion = function (bomb, aPlayer) {
    var length = 3;
    var upExplosion = true;
    var downExplosion = true;
    var leftExplosion = true;
    var rightExplosion = true;
    var temp;
    Phaser.Sprite.call(this, game, bomb.x, bomb.y, 'fire', 21);
    for (var i = 1; i <= length; i++) {
        if (downExplosion) {
            temp = this.fireGroup.create(bomb.x, bomb.y + i * 32, 'fire', 22);
            if (this.checkOverlap()) {
                downExplosion = false;
            }
            if (game.physics.arcade.overlap(unbreakables, temp)) {
                temp.kill();
                downExplosion = false;
            }
        }
        if (upExplosion) {
            temp = this.fireGroup.create(bomb.x, bomb.y - i * 32, 'fire', 22);
            if (this.checkOverlap()) {
                upExplosion = false;
            }
            if (game.physics.arcade.overlap(unbreakables, temp)) {
                temp.kill();
                upExplosion = false;
            }
        }
        if (rightExplosion) {
            temp = this.fireGroup.create(bomb.x + i * 32, bomb.y, 'fire', 23);
            if (this.checkOverlap()) {
                rightExplosion = false;
            }
            if (game.physics.arcade.overlap(unbreakables, temp)) {
                temp.kill();
                rightExplosion = false;
            }
        }
        if (leftExplosion) {
            temp = this.fireGroup.create(bomb.x - i * 32, bomb.y, 'fire', 23);
            if (this.checkOverlap()) {
                leftExplosion = false;
            }
            if (game.physics.arcade.overlap(unbreakables, temp)) {
                temp.kill();
                leftExplosion = false;
            }
        }

    }
};


Fire.prototype.checkOverlap = function () {
    var isOverlap = false;
    if (game.physics.arcade.overlap(breakables, this.fireGroup, this.destroyOverlap)) {
        console.log("breakable vs fire");
        isOverlap = true;
    }
    if (game.physics.arcade.overlap(player, this.fireGroup, this.destroyOverlap)) {
        console.log("player vs fire");
        isOverlap = true;
    }
    //items

    return isOverlap;
};

Fire.prototype.destroyOverlap = function (destroyable, fireGroup) {
    console.log("fire destroy overlap");
    destroyable.kill();
};

Fire.prototype.endFire = function () {
    console.log("end");
    this.fireGroup.callAll('kill');
    this.kill();
};