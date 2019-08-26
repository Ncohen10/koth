import player_stats from './player_stats.js'


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

const game = new Phaser.Game(config);
let player_sprite;
let player_info;
let player_physics;


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

    this.anims.create({
        key: 'KnifeMove',
        frames: this.anims.generateFrameNames('player_move_knife'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: 'KnifeIdle',
        frames: this.anims.generateFrameNames('player_idle_knife'),
        frameRate: 20,
        repeat: -1
    });
    this.anims.create({
        key: 'KnifeAttack',
        frames: this.anims.generateFrameNames('player_attack_knife'),
        frameRate: 25,
        repeat: 0
    });
    this.anims.create({
        key: "RifleIdle",
        frames: this.anims.generateFrameNames('player_idle_rifle'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "RifleMove",
        frames: this.anims.generateFrameNames('player_move_rifle'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "RifleShoot",
        frames: this.anims.generateFrameNames('player_shoot_rifle'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "RifleReload",
        frames: this.anims.generateFrameNames('player_reload_rifle'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "PistolIdle",
        frames: this.anims.generateFrameNames('player_idle_pistol'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "PistolMove",
        frames: this.anims.generateFrameNames('player_move_pistol'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "PistolShoot",
        frames: this.anims.generateFrameNames('player_shoot_pistol'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "PistolReload",
        frames: this.anims.generateFrameNames('player_reload_pistol'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "ShotgunIdle",
        frames: this.anims.generateFrameNames('player_idle_shotgun'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "ShotgunMove",
        frames: this.anims.generateFrameNames('player_move_shotgun'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "ShotgunShoot",
        frames: this.anims.generateFrameNames('player_shoot_shotgun'),
        frameRate: 25,
        repeat: -1
    });
    this.anims.create({
        key: "ShotgunReload",
        frames: this.anims.generateFrameNames('player_reload_shotgun'),
        frameRate: 25,
        repeat: -1
    });

    player_sprite = this.physics.add.sprite(400, 300, 'KnifeIdle')
        .setScale(0.25, 0.25)
        .setVelocity(0, 0);
    player_info = new player_stats('placeholder', player_sprite.x, player_sprite.y);


}


function update() {
    
    // Add mouse and keyboard controls.
    const cursors = this.input.keyboard.createCursorKeys();
    const pointer = this.input.activePointer;
    const keys = this.input.keyboard.addKeys('W,A,S,D');
    const speed = 120;

    player_sprite.body.setVelocity(0);

    // Horizontal movement
    if (cursors.left.isDown || keys.A.isDown) {
        player_info.action = "Move";
        player_sprite.body.setVelocityX(-speed);
    }
    else if (cursors.right.isDown || keys.D.isDown) {
        player_info.action = "Move";
        player_sprite.body.setVelocityX(speed);
    }

    // Vertical movement
    if (cursors.up.isDown || keys.W.isDown) {
        player_info.action = "Move";
        player_sprite.body.setVelocityY(-speed);
    }
    else if(cursors.down.isDown || keys.S.isDown) {
        player_info.action = "Move";
        player_sprite.body.setVelocityY(speed);
    }

    // Action animations
    if (pointer.isDown){
        player_info.action = "Attack";
        player_sprite.play(player_info.weapon + player_info.action, true);
    }
    else if (cursors.left.isDown || keys.A.isDown) {
        player_info.action = "Move";
    }
    else if (cursors.right.isDown || keys.D.isDown) {
        player_info.action = "Move";
        player_sprite.play(player_info.weapon + player_info.action, true);
    }
    else if (cursors.up.isDown || keys.W.isDown) {
        player_info.action = "Move";
        player_sprite.play(player_info.weapon + player_info.action, true);
    }
    else if(cursors.down.isDown || keys.S.isDown) {
        player_info.action = "Move";
        player_sprite.play(player_info.weapon + player_info.action, true);
    }
    else {
        player_info.action = "Idle";
        player_sprite.play(player_info.weapon + player_info.action, true);
    }

    // Normalize speed so diagonal movement isn't faster
    player_sprite.body.velocity.normalize().scale(speed);

    // Make player look at mouse
    player_sprite.rotation = Phaser.Math.Angle.BetweenPoints(player_sprite, this.input.activePointer);


}

//TODO: Make map large (procedural generation perhaps).
//TODO: Randomly spawn weapons on map.
//TODO: Fix knife attack animation.

/* King of the Hill type game:

- Find weapons on the ground - able to pick them up.
- Stay at the center for long enough to win.

- background  - https://www.newgrounds.com/art/view/hyptosis/tile-art-batch-1
- real background(grass/sand) - https://opengameart.org/content/ground-tileset-grass-sand
- player sprite - https://opengameart.org/content/animated-top-down-survivor-player
- Guns on ground - CC0
- Crosshairs - https://opengameart.org/content/20-crosshairs-for-re
- Dungeon tileset - https://opengameart.org/content/dungeon-tileset
- Zombies perhaps
*/
//C:/Users/Nitya/IdeaProjects/Game2/main/assets/tp_sprite_sheets/player_move_knife.png

//C:/Users/Nitya/IdeaProjects/Game2/main/assets/json_anims/knife_move.json