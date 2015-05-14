//Common vars
var snd_fail;
var snd_get_pumpkin;

//Initialize the game canvas
var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game_div');

//Define states
game.state.add('load', {preload: loader_preload, create: loader_create});
game.state.add('menu', {create: menu_create});
game.state.add('play', {create: play_create, update: play_update});
game.state.add('end', {create: end_create});

game.state.start('load');
