function Bomb(aPlayer) {
    // this.id = id;
    console.log(this);
    Phaser.Sprite.call(this, game, aPlayer.x, aPlayer.y, 'bomb');
    console.log(this);
    this.scale.setTo(0.08, 0.08);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
    // this.body.setCircle(16);
    game.time.events.add(3000, this.explode, this);
}

Bomb.prototype = Object.create(Phaser.Sprite.prototype);

Bomb.prototype.explode = function () {
    _self = this;
    fire.add(new Fire(_self));
    this.kill();
};