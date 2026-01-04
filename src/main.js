import GameScene from './scenes/GameScene.js';

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 576,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: [ GameScene ]
};

window.gameConfig = {
    title: "CarRush",
    version: "0.1",
    hero: {
        name: "Stephanie",
        gender: "Female",
        style: "Audaz"
    },
    car: {
        name: "Kami",
        color: "Pink",
        wheels: 4,
        power: "Teleport"
    },
    map: {
        id: "map_nro_1",
        name: "when village",
        tileset: "city"
    }
};

window.game = new Phaser.Game(config);