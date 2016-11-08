function Fire(bomb) {
    // this.id = id;
    //add player length
    console.log("Fireeeeee!!!!");
    console.log(this);
    this.length = 2;
    Phaser.Sprite.call(this, game, bomb.x, bomb.y, 'fire', 21);
    console.log(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
    // this.body.setCircle(16);
    game.time.events.add(1000, this.endFire, this);
}

Fire.prototype = Object.create(Phaser.Sprite.prototype);

Fire.prototype.endFire = function () {
    this.kill();
};