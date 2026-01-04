export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        // placeholder assets: reemplaza con tus imágenes
        this.load.image('tiles_city', 'assets/tiles/city.png');
        this.load.tilemapTiledJSON('map_when_village', 'assets/maps/when_village.json');

        // jugador / carro
        this.load.image('kami', 'assets/sprites/kami.png');
    }

    create() {
        // map
        const map = this.make.tilemap({ key: 'map_when_village' });
        const tileset = map.addTilesetImage('city', 'tiles_city');
        map.createLayer('Ground', tileset, 0, 0);

        // player car
        this.player = this.physics.add.image(200, 300, 'kami');
        this.player.setCollideWorldBounds(true);
        this.player.setDrag(600);
        this.player.setMaxVelocity(400);
        this.playerSpeed = 200;

        // controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.teleportKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // simple UI text
        this.add.text(10, 10, `${window.gameConfig.title} v${window.gameConfig.version}`, { font: '16px Arial', fill: '#fff' });

        // teleport cooldown
        this.canTeleport = true;
        this.teleportCooldown = 2000; // ms
    }

    update(time, delta) {
        const p = this.player;
        if (this.cursors.up.isDown) {
            this.physics.velocityFromRotation(p.rotation, this.playerSpeed, p.body.velocity);
        } else {
            // friction handled by drag
        }
        if (this.cursors.left.isDown) {
            p.setAngularVelocity(-150);
        } else if (this.cursors.right.isDown) {
            p.setAngularVelocity(150);
        } else {
            p.setAngularVelocity(0);
        }

        // Teleport: salta hacia la dirección actual una distancia fija
        if (Phaser.Input.Keyboard.JustDown(this.teleportKey) && this.canTeleport) {
            const dist = 200;
            const angle = p.rotation;
            const nx = p.x + Math.cos(angle) * dist;
            const ny = p.y + Math.sin(angle) * dist;
            // comprobar límites del mundo
            p.x = Phaser.Math.Clamp(nx, 0, this.scale.width);
            p.y = Phaser.Math.Clamp(ny, 0, this.scale.height);
            this.canTeleport = false;
            this.time.delayedCall(this.teleportCooldown, () => { this.canTeleport = true; }, [], this);
        }
    }
}