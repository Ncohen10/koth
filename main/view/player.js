import player_stats from "../model/player_stats";

export default class Player {
    constructor(scene, x, y){
        this.scene = scene;

        const anims = scene.anims;

        anims.create({
            key: 'KnifeMove',
            frames: anims.generateFrameNames('player_move_knife'),
            frameRate: 25,
            repeat: -1
        });
        anims.create({
            key: 'KnifeIdle',
            frames: anims.generateFrameNames('player_idle_knife'),
            frameRate: 20,
            repeat: -1
        });
        anims.create({
            key: 'KnifeAttack',
            frames: anims.generateFrameNames('player_attack_knife'),
            frameRate: 25,
            repeat: 0
        });
        anims.create({
            key: "RifleIdle",
            frames: anims.generateFrameNames('player_idle_rifle'),
            frameRate: 25,
            repeat: -1
        });
        anims.create({
            key: "RifleMove",
            frames: anims.generateFrameNames('player_move_rifle'),
            frameRate: 25,
            repeat: -1
        });
        anims.create({
            key: "RifleShoot",
            frames: anims.generateFrameNames('player_shoot_rifle'),
            frameRate: 25,
            repeat: -1
        });
        anims.create({
            key: "RifleReload",
            frames: anims.generateFrameNames('player_reload_rifle'),
            frameRate: 25,
            repeat: -1
        });
        anims.create({
            key: "PistolIdle",
            frames: anims.generateFrameNames('player_idle_pistol'),
            frameRate: 25,
            repeat: -1
        });
        anims.create({
            key: "PistolMove",
            frames: anims.generateFrameNames('player_move_pistol'),
            frameRate: 25,
            repeat: -1
        });
        anims.create({
            key: "PistolShoot",
            frames: anims.generateFrameNames('player_shoot_pistol'),
            frameRate: 25,
            repeat: -1
        });
        anims.create({
            key: "PistolReload",
            frames: anims.generateFrameNames('player_reload_pistol'),
            frameRate: 25,
            repeat: -1
        });
        anims.create({
            key: "ShotgunIdle",
            frames: anims.generateFrameNames('player_idle_shotgun'),
            frameRate: 25,
            repeat: -1
        });
        anims.create({
            key: "ShotgunMove",
            frames: anims.generateFrameNames('player_move_shotgun'),
            frameRate: 25,
            repeat: -1
        });
        anims.create({
            key: "ShotgunShoot",
            frames: anims.generateFrameNames('player_shoot_shotgun'),
            frameRate: 25,
            repeat: -1
        });
        anims.create({
            key: "ShotgunReload",
            frames: anims.generateFrameNames('player_reload_shotgun'),
            frameRate: 25,
            repeat: -1
        });

        this.sprite = scene.physics.add
            .sprite(x, y, "KnifeIdle")
            .setScale(0.25, 0.25)
            .setVelocity(0, 0);

        this.keys = scene.input.keyboard.createCursorKeys()
    }

    freeze(){
        this.sprite.body.moves = false;
    }

    update(){
        const player_sprite = this.sprite;
        const cursors = input.keyboard.createCursorKeys();
        const keys = input.keyboard.addKeys('W,A,S,D');
        const pointer = input.activePointer;
        const speed = 120;
        const prevVelocity = sprite.body.velocity.clone();
        var player_info = new player_stats('placeholder');

        // Stop previous movement from the last frame.
        sprite.body.setVelocity(0);

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
            player_sprite.play("Knife" + "Attack", true);
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

    destroy(){
        this.sprite.destroy()
    }
}