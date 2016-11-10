function Bomb(aPlayer) {
    // this.id = id;
    // this.length = aPlayer.length;
    this.length = 1;
    console.log(this);
    Phaser.Sprite.call(this, game, aPlayer.x, aPlayer.y, 'bomb');
    console.log(this);
    this.scale.setTo(0.08, 0.08);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
    // this.body.setCircle(16);
    this.timer = game.time.events.add(3000, this.explode, this);
    this.sizeTween = game.add.tween(this.scale).to({x: 0.1, y: 0.1}, 300, Phaser.Easing.Default, true, 0, true, true);

}

Bomb.prototype = Object.create(Phaser.Sprite.prototype);

Bomb.prototype.explode = function () {
    _self = this;
    //this.visible = false;
    fire.add(new Fire(_self));
    this.kill();
    this.sizeTween.stop();
};