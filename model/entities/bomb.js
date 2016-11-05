function Bomb(x, y) {
    // this.id = id;
    Phaser.Sprite.call(this, game, x, y, 'bomb', 0);
    this.scale.setTo(0.08, 0.08);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
    // this.body.setCircle(16);
    game.time.events.add(3000, this.explode, this);
}

Bomb.prototype = Object.create(Phaser.Sprite.prototype);

Bomb.prototype.explode = function () {
    this.kill();
};