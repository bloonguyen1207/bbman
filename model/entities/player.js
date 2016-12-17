function Player(x, y) {
    // this.id = id;
    this.length = 1;
    this.limit = 2;
    this.checkLimit = 0;
    this.speed = 150;
    Phaser.Sprite.call(this, game, x, y, 'dude');
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setCircle(16); //normal hitbox size
    this.body.collideWorldBounds = true;

    this.dropX = 0; //store the location of the newest bomb
    this.dropY = 0;

    this.setUpHitbox();
    this.setUpAnimation();

}

//inherit
Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.cursors = game.input.keyboard.createCursorKeys();
Player.prototype.space_bar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
Player.prototype.flipFlop = false; //use when player presses "space bar"

//set up hit box for player and fire
Player.prototype.setUpHitbox = function () {
    var _self = this;
    this.hitboxDistance = 8; //distance between normal hitbox and this hitbox
    this.hitboxFire = game.add.sprite(_self.x + _self.hitboxDistance, _self.y + _self.hitboxDistance, null); //create invisible object
    game.physics.arcade.enable(this.hitboxFire);
    this.hitboxFire.body.setCircle(16 - _self.hitboxDistance);
};

//set animation
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
    //reset the location of the newest bomb to 0
    if (Math.abs(this.dropX - this.x) >= 32 || Math.abs(this.dropY - this.y) >= 32) {
        // console.log("set dropX Y");
        this.dropX = 0;
        this.dropY = 0;
    }
    // check collision between bomb and player
    // it will ignore the collision between the newest bomb and player
    game.physics.arcade.collide(this, bombs, null, function (aPlayer, aBomb) {
        // console.log(!(Math.abs(aBomb.x - aPlayer.dropX) <= 31 && Math.abs(aBomb.y - aPlayer.dropY) <= 31));
        // console.log(aBomb.x + " " + aBomb.y);
        // console.log(aPlayer.dropX + " " + aPlayer.dropY);
        return !((Math.abs(aBomb.x - aPlayer.dropX) <= 31 && Math.abs(aBomb.y - aPlayer.dropY) <= 31))
    });
    //  Reset the players velocity (movement)
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;

    // if the hitbox with Fire is killed, the player is killed too
    if (this.alive && !this.hitboxFire.alive) {
        this.kill();
    }

    // the player can only move when he is alive
    if (this.alive) {
        this.movement();
        this.updateHitboxLocation();
    }
};

// update the location of the hitbox with fire
Player.prototype.updateHitboxLocation = function () {
    var _self = this;
    this.hitboxFire.x = this.x + _self.hitboxDistance;
    this.hitboxFire.y = this.y + _self.hitboxDistance;
    this.hitboxFire.z = this.z;
};

// capture the input key
Player.prototype.movement = function () {

    if (this.cursors.left.isDown) {
        //  Move to the left
        this.body.velocity.x = -(this.speed);

        this.animations.play('left');
    }
    else if (this.cursors.right.isDown) {
        //  Move to the right
        this.body.velocity.x = this.speed;

        this.animations.play('right');
    }
    else if (this.cursors.up.isDown) {

        this.body.velocity.y = -(this.speed);
        this.animations.play('up');
    }
    else if (this.cursors.down.isDown) {

        this.body.velocity.y = this.speed;

        this.animations.play('down');
    }
    else {
        //  Stand still
        this.animations.stop();

        this.frame = 4;
    }

    if (this.space_bar.isDown) {
        if (!this.flipFlop) { //if the player presses and holds the space bar, it only counts as onc press
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

// if there is already a bomb, the player can not place another bomb in that location
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

//round the location of player and place a bomb, ex: player stands at 70, 70 --> bomb location is 64, 64
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
    // add bomb
    bombs.add(bomb);

    // console.log(bomb.x);
    // console.log(bomb.y);
    this.dropX = bomb.x;
    this.dropY = bomb.y;

};