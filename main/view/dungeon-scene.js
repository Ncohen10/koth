import Player from "./player.js";
import TILES from "./tile_mapping.js";

/**
 * Scene that generates a new dungeon
 */
export default class DungeonScene extends Phaser.Scene {
    preload() {

        this.load.image("map_stuff", './assets/example_dungeon.png');
        this.load.multiatlas('player_idle_knife',
            'assets/json_anims/knife_idle.json',
            'assets/tp_sprite_sheets');
        this.load.multiatlas('player_move_knife',
            'assets/json_anims/knife_move.json',
            'assets/tp_sprite_sheets');
        this.load.multiatlas('player_attack_knife',
            'assets/json_anims/knife_attack.json',
            'assets/tp_sprite_sheets');
        this.load.multiatlas('player_idle_rifle',
            'assets/json_anims/rifle_idle.json',
            'assets/tp_sprite_sheets');
        this.load.multiatlas('player_move_rifle',
            'assets/json_anims/rifle_move.json',
            'assets/tp_sprite_sheets');
        this.load.multiatlas('player_shoot_rifle',
            'assets/json_anims/rifle_shoot.json',
            'assets/tp_sprite_sheets');
        this.load.multiatlas('player_reload_rifle',
            'assets/json_anims/rifle_reload.json',
            'assets/tp_sprite_sheets');
        this.load.multiatlas('player_idle_pistol',
            'assets/json_anims/pistol_idle.json',
            'assets/tp_sprite_sheets');
        this.load.multiatlas('player_move_pistol',
            'assets/json_anims/pistol_move.json',
            'assets/tp_sprite_sheets');
        this.load.multiatlas('player_shoot_pistol',
            'assets/json_anims/pistol_shoot.json',
            'assets/tp_sprite_sheets');
        this.load.multiatlas('player_reload_pistol',
            'assets/json_anims/pistol_reload.json',
            'assets/tp_sprite_sheets');
        this.load.multiatlas('player_idle_shotgun',
            'assets/json_anims/shotgun_idle.json',
            'assets/tp_sprite_sheets');
        this.load.multiatlas('player_move_shotgun',
            'assets/json_anims/shotgun_move.json',
            'assets/tp_sprite_sheets');
        this.load.multiatlas('player_shoot_shotgun',
            'assets/json_anims/shotgun_shoot.json',
            'assets/tp_sprite_sheets');
        this.load.multiatlas('player_reload_shotgun',
            'assets/json_anims/shotgun_reload.json',
            'assets/tp_sprite_sheets');
    }

    create() {
        // Generate a random world
        const dungeon = new Dungeon({
            width: 50,
            height: 50,
            rooms: {
                width: { min: 7, max: 15 },
                height: { min: 7, max: 15 },
                maxRooms: 12
            }
        });

        // Create a blank tilemap with dimensions matching the dungeon
        const map = this.make.tilemap({
            tileWidth: 48,
            tileHeight: 48,
            width: dungeon.width,
            height: dungeon.height
        });
        const tileset = map.addTilesetImage("map_stuff", null, 48, 48, 1, 2); // 1px margin, 2px spacing
        const layer = map.createBlankDynamicLayer("Layer 1", tileset);

        // Get a 2D array of tile indices (using -1 to not render empty tiles) and place them into the
        // blank layer
        const mappedTiles = dungeon.getMappedTiles({ empty: -1, floor: 6, door: 6, wall: 20 });
        layer.putTilesAt(mappedTiles, 0, 0);
        layer.setCollision(20); // We only need one tile index (the walls) to be colliding for now

        // Place the player in the center of the map. This works because the Dungeon generator places
        // the first room in the center of the map.
        this.player = new Player(this, map.widthInPixels / 2, map.heightInPixels / 2);

        // Watch the player and layer for collisions, for the duration of the scene:
        this.physics.add.collider(this.player.sprite, layer);

        // Phaser supports multiple cameras, but you can access the default camera like this:
        const camera = this.player.camera;
        camera.startFollow(this.player.sprite);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Help text that has a "fixed" position on the screen
        this.add
            .text(16, 16, "Arrow keys or WASD to move", {
                font: "18px monospace",
                fill: "#000000",
                padding: { x: 20, y: 10 },
                backgroundColor: "#ffffff"
            })
            .setScrollFactor(0);
    }

    update(time, delta) {
        this.player.update();
    }
}