//Common vars
var music;
var ground;
var key_cursors;
var player;
var pumpkins;
var life_cpt;
var life_cpt_display;
var pumpkin_cpt;
var pumpkin_cpt_display;

function play_create()
{
	life_cpt = 5;
	pumpkin_cpt = 0;
	
	//Load BG
	this.game.add.image(0, 0, 'background');

	//Load the pumpkin counter
	this.game.add.image(this.game.world.width-96, 16, 'pumpkin');
	pumpkin_cpt_display = this.game.add.text(this.game.world.width-48, 16, 'x'+pumpkin_cpt, {fontSize: '28px', fill: '#FFFFFF'});

	//Load the life counter
	this.game.add.image(this.game.world.width-96, 64, 'rip');
	life_cpt_display = this.game.add.text(this.game.world.width-48, 64, 'x'+life_cpt, {fontSize: '28px', fill: '#FFFFFF'});

	//Enable physic
	this.game.physics.startSystem(Phaser.Physics.ARCADE);

	//Initiaze the floor
	ground = game.add.group();
	ground.enableBody = true;
	for(var g=0; g<=32; g++)
	{
		var grnd = ground.create(g*32, this.game.world.height-32, 'ground');
		grnd.body.immovable = true;
	}

	//Create the pumpkins generator
	pumpkins = game.add.group()
	pumpkins.enableBody = true;
	this.game.time.events.loop(Phaser.Timer.SECOND*2, generate_pumpkin, this);

	//Create the player
	player = game.add.sprite(game.world.centerX, game.world.height - 180, 'playersheet');
	player.animations.add('walk_left', [6, 7, 8, 7], 10, true);
	player.animations.add('walk_right', [0, 2, 1, 2], 10, true);
	player.frame = 3;
	this.game.physics.arcade.enable(player);
	player.body.gravity.y = 400;
	player.body.collideWorldBounds = true;
	
	key_cursors = this.game.input.keyboard.createCursorKeys();
}

function generate_pumpkin()
{
	var pumpkinX = game.rnd.integerInRange(1, 30);
	var pumpkin = pumpkins.create(pumpkinX*32, 0, 'pumpkin');
	pumpkin.body.gravity.y = game.rnd.integerInRange(100, 300);
}

function miss_pumpkin(pumpkin, ground)
{
	pumpkin.kill();

	if(life_cpt == 0)
	{
		this.game.state.start('end');
	}
	else
	{
		life_cpt--;
		life_cpt_display.text = 'x'+life_cpt;
	}
}

function get_pumpkin(player, pumpkin)
{
	pumpkin.kill();

	if(!snd_get_pumpkin)
	{
		snd_get_pumpkin = this.game.add.audio('snd_pumpkin');
	}
	snd_get_pumpkin.play();

	pumpkin_cpt++;
	pumpkin_cpt_display.text = 'x'+pumpkin_cpt;
}

function play_update()
{
	this.game.physics.arcade.collide(player, ground);
	this.game.physics.arcade.overlap(pumpkins, ground, miss_pumpkin, null, this);
	this.game.physics.arcade.overlap(player, pumpkins, get_pumpkin, null, this);

	player.body.velocity.x = 0;
	if(key_cursors.left.isDown)
	{
		player.body.velocity.x = -400;
		player.animations.play('walk_left');
	}
	else if(key_cursors.right.isDown)
	{
		player.body.velocity.x = 400;
		player.animations.play('walk_right');
	}
	else
	{
		player.animations.stop();
		player.frame = 3;
	}

	if(key_cursors.up.isDown && player.body.touching.down)
	{
		player.frame = 5;
		player.body.velocity.y = -350;
	}
}
