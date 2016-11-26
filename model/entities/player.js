function Player(x, y) {
    // this.id = id;
    this.length = 2;
    this.limit = 2;
    this.checkLimit = 0;
    Phaser.Sprite.call(this, game, x, y, 'dude');
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setCircle(16);
    this.body.collideWorldBounds = true;

    this.dropX = 0;
    this.dropY = 0;

    this.setUpHitbox();
    this.setUpAnimation();

}

Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.cursors = game.input.keyboard.createCursorKeys();
Player.prototype.space_bar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
Player.prototype.flipFlop = false;

Player.prototype.setUpHitbox = function () {
    var _self = this;
    this.hitboxDistance = 4;
    this.hitboxFire = game.add.sprite(_self.x + _self.hitboxDistance, _self.y + _self.hitboxDistance, null);
    game.physics.arcade.enable(this.hitboxFire);
    this.hitboxFire.body.setCircle(16 - _self.hitboxDistance);
};

Player.prototype.setUpAnimation = function () {
    this.animations.add('down', [0, 1, 2, 3], 10, true);
    this.animations.add('left', [12, 13, 14, 15], 10, true);
    this.animations.add('right', [24, 25, 26, 27], 10, true);
    this.animations.add('up', [36, 37, 38, 39], 10, true);
};

Player.prototype.update = function () {
    game.physics.arcade.collide(this, unbreakables);
    game.physics.arcade.collide(this, breakables);
    game.physics.arcade.collide(this, shrubs);
    // if (Math.abs(this.dropX - this.x) || Math.abs(this.dropY - this.y) >= 16) {

    // }

    //  Reset the players velocity (movement)
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;

    if (this.alive && !this.hitboxFire.alive) {
        this.kill();
    }

    if (this.alive) {
        this.movement();
        this.updateHitboxLocation();
    }
};

Player.prototype.updateHitboxLocation = function () {
    var _self = this;
    this.hitboxFire.x = this.x + _self.hitboxDistance;
    this.hitboxFire.y = this.y + _self.hitboxDistance;
    this.hitboxFire.z = this.z;
};

Player.prototype.movement = function () {

    if (this.cursors.left.isDown) {
        //  Move to the left
        this.body.velocity.x = -150;

        this.animations.play('left');
    }
    else if (this.cursors.right.isDown) {
        //  Move to the right
        this.body.velocity.x = 150;

        this.animations.play('right');
    }
    else if (this.cursors.up.isDown) {

        this.body.velocity.y = -150;
        this.animations.play('up');
    }
    else if (this.cursors.down.isDown) {

        this.body.velocity.y = 150;

        this.animations.play('down');
    }
    else {
        //  Stand still
        this.animations.stop();

        this.frame = 4;
    }

    if (this.space_bar.isDown) {
        if (!this.flipFlop) { //flipFlop is used to set one press to one callback (instead of multi)
            if (!this.checkBombAvailable()) {
                // console.log(this.x);
                if (this.checkLimit < this.limit) {
                    this.checkLimit += 1;

                    this.dropBomb();

                }
                this.flipFlop = true;
                //player.body.enable = false;
            }
        }
    }
    if (this.space_bar.isUp) {
        this.flipFlop = false;
    }
};

Player.prototype.checkBombAvailable = function () {
    bombsArray = bombs.children;

    var round_x = this.x % 32;
    var round_y = this.y % 32;
    var testX = this.x - round_x;
    var testY = this.y - round_y;
    if (round_x > 10) {
        testX += 32;
    }
    if (round_y > 10) {
        testY += 32;
    }

    for (var i = 0; i < bombsArray.length; i++) {
        if (bombsArray[i].x === testX && bombsArray[i].y === testY) {
            return true;
        }
    }
    return false;
};

Player.prototype.dropBomb = function () {
    var bomb = new Bomb(this);
    var round_x = this.x % 32;
    var round_y = this.y % 32;
    bomb.x = this.x - round_x;
    bomb.y = this.y - round_y;
    if (round_x > 10) {
        bomb.x += 32;
    }
    if (round_y > 10) {
        bomb.y += 32;
    }
    bombs.add(bomb);

    this.dropX = bomb.x;
    this.dropY = bomb.y;

};