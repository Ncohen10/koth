//TODO - preload and create all pistol and shotgun anims.


var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var player;


function preload() {

    this.load.image('init_player', './assets/player/knife/idle/survivor-idle_knife_0.png');

    this.load.multiatlas('player_idle_knife',
        './assets/json_anims/knife_idle.json',
        './assets/tp_sprite_sheets');
    this.load.multiatlas('player_move_knife',
        './assets/json_anims/knife_move.json',
        './assets/tp_sprite_sheets');
    this.load.multiatlas('player_attack_knife',
        './assets/json_anims/knife_attack.json',
        './assets/tp_sprite_sheets');
    this.load.multiatlas('player_idle_rifle',
        './assets/json_anims/rifle_idle.json',
        './assets/tp_sprite_sheets');
    this.load.multiatlas('player_move_rifle',
        './assets/json_anims/rifle_move.json',
        './assets/tp_sprite_sheets');
    this.load.multiatlas('player_shoot_rifle',
        './assets/json_anims/rifle_shoot.json',
        './assets/tp_sprite_sheets');
    this.load.multiatlas('player_reload_rifle',
        './assets/json_anims/rifle_reload.json',
        './assets/tp_sprite_sheets')


}


function create() {


    player = this.physics.add.sprite(400, 300, 'init_player')
        .setScale(0.25, 0.25)
        .setVelocity(0, 0);


    let idleKnifeFrames = this.anims.generateFrameNames('player_idle_knife'),
        moveKnifeFrames = this.anims.generateFrameNames('player_move_knife'),
        attackKnifeFrames = this.anims.generateFrameNames('player_attack_knife'),
        idleRifleFrames = this.anims.generateFrameNames('player_idle_rifle'),
        moveRifleFrames = this.anims.generateFrameNames('player_move_rifle'),
        shootRifleFrames = this.anims.generateFrameNames('player_shoot_rifle'),
        reloadRifleFrames = this.anims.generateFrameNames('player_reload_rifle');


    this.anims.create({
        key: 'knife_move',
        frames: moveKnifeFrames,
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: 'knife_idle',
        frames: idleKnifeFrames,
        frameRate: 20,
        repeat: -1
    });
    this.anims.create({
        key: 'knife_attack',
        frames: attackKnifeFrames,
        frameRate: 25,
        repeat: 0
    });
    this.anims.create({
        key: "rifle_idle",
        frames: idleRifleFrames,
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "rifle_move",
        frames: moveRifleFrames,
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "rifle_shoot",
        frames: shootRifleFrames,
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "rifle_reload",
        frames: reloadRifleFrames,
        frameRate: 25,
        repeat: -1
    });



}


function update() {
    
    // Add mouse and keyboard controls.
    var cursors = this.input.keyboard.createCursorKeys();
    var pointer = this.input.activePointer;
    var keys = this.input.keyboard.addKeys('W,S,A,D');


    // move with arrow keys or WASD
    if (cursors.left.isDown || keys.A.isDown){
        player.setVelocityX(-160);
        player.play('knife_move', true);
    }
    else if (cursors.right.isDown || keys.D.isDown){
        player.setVelocityX(160);
        player.play('knife_move', true);
    }
    else if (cursors.up.isDown || keys.W.isDown){
        player.setVelocityY(-160);
        player.play('knife_move', true);
    }
    else if(cursors.down.isDown || keys.S.isDown){
        player.setVelocityY(160);
        player.play('knife_move', true);
    }
    else if (pointer.isDown){   // If left mouse clicked
        player.play('knife_attack', true);
    }
    else{
        player.setVelocity(0,0);
        player.play('knife_idle', true);
    }

    // Make player look at mouse
    player.rotation = Phaser.Math.Angle.BetweenPoints(player, this.input.activePointer);


}

/* King of the Hill type game:

- Find weapons on the ground - able to pick them up.
- Stay at the center for long enough to win.

- background  - https://www.newgrounds.com/art/view/hyptosis/tile-art-batch-1
- real background(grass/sand) - https://opengameart.org/content/ground-tileset-grass-sand
- player sprite - https://opengameart.org/content/animated-top-down-survivor-player
- Guns on ground - CC0
- Crosshairs - https://opengameart.org/content/20-crosshairs-for-re
- Zombies perhaps
*/
//C:/Users/Nitya/IdeaProjects/Game2/main/assets/tp_sprite_sheets/player_move_knife.png

//C:/Users/Nitya/IdeaProjects/Game2/main/assets/json_anims/knife_move.json