function Bomb(aPlayer) {
    // this.id = id;
    bombSfx.play();
    this.owner = aPlayer;
    this.length = aPlayer.length;
    Phaser.Sprite.call(this, game, aPlayer.x, aPlayer.y, 'bomb');
    this.scale.setTo(0.08, 0.08);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
    this.timer = game.time.events.add(3000, this.explode, this); //after 3 secs, the bomb explodes
    this.isExploded = false; //check if the bomb is exploded or not, avoid bug in chain explosion

    // this.sizeTween = game.add.tween(this.scale).({x: 0.1, y: 0.1}, 300, Phaser.Easing.Default, true, 0, true, true);

}

Bomb.prototype = Object.create(Phaser.Sprite.prototype);

Bomb.prototype.explode = function () {
    if (!this.isExploded) { // if the bomb has exploded, it will not explode again
        explodeSfx.play();
        this.isExploded = true;
        if (this.owner.checkLimit > 0) { // decrease the number of placed bombs of the player
            this.owner.checkLimit -= 1;
        }
        // console.log("bomb.explode!!!");
        var _self = this;
        this.visible = false;
        //add fire
        fire.add(new Fire(_self));
        // this.sizeTween.stop();

        this.destroy();

    }

};