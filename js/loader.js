var load_status;

function loader_preload()
{
	this.game.load.image('menu_bg', 'assets/menu.png');
}

function loader_load()
{
	this.game.load.image('ground', 'assets/cubesol.png');
	this.game.load.image('background', 'assets/game_background.png');
	this.game.load.image('end', 'assets/end.png');
	this.game.load.image('hand', 'assets/hand.png');
	this.game.load.image('pumpkin', 'assets/pumpkin.png');
	this.game.load.image('rip', 'assets/rip.png');

	this.game.load.spritesheet('playersheet', 'assets/player_spritesheet.png', 128, 128, 10);

	this.game.load.audio('music', ['assets/sfx/mp3/music.mp3', 'assets/sfx/ogg/music.ogg']);

	this.game.load.audio('snd_pumpkin', ['assets/sfx/mp3/get_pumpkin.mp3', 'assets/sfx/ogg/get_pumpkin.ogg']);
	this.game.load.audio('snd_fail', ['assets/sfx/mp3/end.mp3', 'assets/sfx/ogg/end.ogg']);
	
	this.game.load.start();
}

function loader_create()
{
	this.game.add.image(0, 0, 'menu_bg');
	this.game.load.onFileComplete.add(loader_refresh, this);
	this.game.load.onLoadComplete.add(loader_next, this);
	
	load_status = this.game.add.text(this.game.world.width/2, this.game.world.height-32, 'Preloading data', {fontSize: '16px', fill: '#FFFFFF'});	
	
	loader_load();
}

function loader_refresh(progress, cacheKey, success, totalLoaded, totalFiles)
{
	load_status.setText('[' + cacheKey + ']');
}

function loader_next()
{
	this.game.state.start('menu');
}
