import player_stats from './model/player_stats.js'


//TODO - preload and create all pistol and shotgun anims.

// Make game work for one player first.
//

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
var player_sprite;
var player_info;


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
        './assets/tp_sprite_sheets');
    this.load.multiatlas('player_idle_pistol',
        './assets/json_anims/pistol_idle.json',
        './assets/tp_sprite_sheets');
    this.load.multiatlas('player_move_pistol',
        './assets/json_anims/pistol_move.json',
        './assets/tp_sprite_sheets');
    this.load.multiatlas('player_shoot_pistol',
        './assets/json_anims/pistol_shoot.json',
        './assets/tp_sprite_sheets');
    this.load.multiatlas('player_reload_pistol',
        './assets/json_anims/pistol_reload.json',
        './assets/tp_sprite_sheets');
    this.load.multiatlas('player_idle_shotgun',
        './assets/json_anims/shotgun_idle.json',
        './assets/tp_sprite_sheets');
    this.load.multiatlas('player_move_shotgun',
        './assets/json_anims/shotgun_move.json',
        './assets/tp_sprite_sheets');
    this.load.multiatlas('player_shoot_shotgun',
        './assets/json_anims/shotgun_shoot.json',
        './assets/tp_sprite_sheets');
    this.load.multiatlas('player_reload_shotgun',
        './assets/json_anims/shotgun_reload.json',
        './assets/tp_sprite_sheets');

}


function create() {


    player_sprite = this.physics.add.sprite(400, 300, 'init_player')
        .setScale(0.25, 0.25)
        .setVelocity(0, 0);
    player_info = new player_stats('placeholder', player_sprite.x, player_sprite.y);

    this.anims.create({
        key: 'knife_move',
        frames: this.anims.generateFrameNames('player_move_knife'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: 'knife_idle',
        frames: this.anims.generateFrameNames('player_idle_knife'),
        frameRate: 20,
        repeat: -1
    });
    this.anims.create({
        key: 'knife_attack',
        frames: this.anims.generateFrameNames('player_attack_knife'),
        frameRate: 25,
        repeat: 0
    });
    this.anims.create({
        key: "rifle_idle",
        frames: this.anims.generateFrameNames('player_idle_rifle'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "rifle_move",
        frames: this.anims.generateFrameNames('player_move_rifle'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "rifle_shoot",
        frames: this.anims.generateFrameNames('player_shoot_rifle'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "rifle_reload",
        frames: this.anims.generateFrameNames('player_reload_rifle'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "pistol_idle",
        frames: this.anims.generateFrameNames('player_idle_pistol'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "pistol_move",
        frames: this.anims.generateFrameNames('player_move_pistol'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "pistol_shoot",
        frames: this.anims.generateFrameNames('player_shoot_pistol'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "pistol_reload",
        frames: this.anims.generateFrameNames('player_reload_pistol'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "shotgun_idle",
        frames: this.anims.generateFrameNames('player_idle_shotgun'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "shotgun_move",
        frames: this.anims.generateFrameNames('player_move_shotgun'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "shotgun_shoot",
        frames: this.anims.generateFrameNames('player_shoot_shotgun'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "shotgun_reload",
        frames: this.anims.generateFrameNames('player_reload_shotgun'),
        frameRate: 25,
        repeat: -1
    });


    //TODO: Make map large (procedural generation perhaps)
    // TODO: Randomly spawn weapons on map

}


function update() {
    
    // Add mouse and keyboard controls.
    var cursors = this.input.keyboard.createCursorKeys();
    var pointer = this.input.activePointer;
    var keys = this.input.keyboard.addKeys('W,A,S,D');


    // move with arrow keys or WASD
    if (cursors.left.isDown || keys.A.isDown) {
        player_sprite.setVelocityX(-160);
        player_info.action = "move";
        player_sprite.play(player_info.weapon + player_info.action, true);
    }
    else if (cursors.right.isDown || keys.D.isDown) {
        player_sprite.setVelocityX(160);
        player_info.action = "move";
        player_sprite.play(player_info.weapon + player_info.action, true);
    }
    else if (cursors.up.isDown || keys.W.isDown) {
        player_sprite.setVelocityY(-160);
        player_info.action = "move";
        player_sprite.play(player_info.weapon + player_info.action, true);
    }
    else if(cursors.down.isDown || keys.S.isDown) {
        player_sprite.setVelocityY(160);
        player_info.action = "move";
        player_sprite.play(player_info.weapon + player_info.action, true);
    }
    else if (pointer.isDown){   // If left mouse clicked
        player_info.action = "attack";
        player_sprite.play(player_info.weapon + player_info.action, true);
    }
    else {
        player_sprite.setVelocity(0,0);
        player_info.action = "idle";
        player_sprite.play(player_info.weapon + player_info.action, true);
    }

    // Make player look at mouse
    player_sprite.rotation = Phaser.Math.Angle.BetweenPoints(player_sprite, this.input.activePointer);


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