function Bomb(aPlayer) {
    // this.id = id;
    this.owner = aPlayer;
    Phaser.Sprite.call(this, game, aPlayer.x, aPlayer.y, 'bomb');
    this.scale.setTo(0.08, 0.08);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
    //????????
    // this.body.setCircle(15, 185, 185);
    this.timer = game.time.events.add(3000, this.explode, this);
    this.isExploded = false;

    // this.sizeTween = game.add.tween(this.scale).to({x: 0.1, y: 0.1}, 300, Phaser.Easing.Default, true, 0, true, true);

}

Bomb.prototype = Object.create(Phaser.Sprite.prototype);

Bomb.prototype.explode = function () {
    if (!this.isExploded) {
        this.isExploded = true;
        if (this.owner.checkLimit > 0) {
            this.owner.checkLimit -= 1;
        }
        // console.log("bomb.explode!!!");
        var _self = this;
        this.visible = false;
        fire.add(new Fire(_self));
        this.destroy();
    }
    // this.sizeTween.stop();
};