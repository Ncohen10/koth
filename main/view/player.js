import player_stats from "./player_stats.js";

export default class Player {
    constructor(scene, x, y){
        this.scene = scene;

        const anims = scene.anims;

        anims.create({
            key: 'KnifeMove',
            frames: anims.generateFrameNames('player_move_knife'),
            frameRate: 20,
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

        this.cursors = scene.input.keyboard.createCursorKeys();
        this.keys = scene.input.keyboard.addKeys('W,A,S,D');
        this.pointer = scene.input.activePointer;
        this.camera = scene.cameras.main;
        this.sprite = scene.physics.add
            .sprite(x, y, "KnifeIdle", 0)
            .setScale(0.20, 0.20);
    }

    freeze(){
        this.sprite.body.moves = false;
    }

    update(){

        const sprite = this.sprite,
            cursors = this.cursors,
            keys = this.keys,
            pointer = this.pointer,
            cameras = this.camera,
            speed = 200,
            prevVelocity = sprite.body.velocity.clone(),
            player_info = new player_stats('placeholder', sprite.x, sprite.y);

        // Stop previous movement from the last frame.
        sprite.body.setVelocity(0);

        // Horizontal movement
        if (cursors.left.isDown || keys.A.isDown) {
            player_info.action = "Move";
            sprite.body.setVelocityX(-speed);
        }
        else if (cursors.right.isDown || keys.D.isDown) {
            player_info.action = "Move";
            sprite.body.setVelocityX(speed);
        }

        // Vertical movement
        if (cursors.up.isDown || keys.W.isDown) {
            player_info.action = "Move";
            sprite.body.setVelocityY(-speed);
        }
        else if(cursors.down.isDown || keys.S.isDown) {
            player_info.action = "Move";
            sprite.body.setVelocityY(speed);
        }

        // Update action and weapon animations.
        // Give attack animation highest precedence.
        if (pointer.isDown) {
            sprite.play("KnifeAttack", true);
        }
        else {
            if (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown ||
                keys.A.isDown || keys.D.isDown || keys.W.isDown || keys.S.isDown) {
                sprite.play("KnifeMove", true);
            }
            else {
                player_info.action = "Idle";
                sprite.play(player_info.weapon + player_info.action, true);
            }
        }

        // Normalize speed so diagonal movement isn't faster
        sprite.body.velocity.normalize().scale(speed);

        // Make player look at mouse
        sprite.rotation = Phaser.Math.Angle.Between(
            sprite.x, sprite.y,
            pointer.x + cameras.scrollX,
            pointer.y + cameras.scrollY);

    }

    destroy(){
        this.sprite.destroy()
    }
}