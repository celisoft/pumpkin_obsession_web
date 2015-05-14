var menu_text;
var menu_status = 0;

function menu_create()
{
	this.game.add.image(0, 0, 'menu_bg');

	menu_text = this.game.add.text(this.game.world.centerX, this.game.world.height-64, 'Press any key to play', {fontSize: '38px', fill: '#FFFFFF'});
	menu_text.anchor.setTo(0.5, 0.5);

	if(!music)
	{
		music = this.game.add.audio('music');
		music.play('', 0 , 1, true);
	}

	this.game.input.keyboard.addCallbacks(this, menu_next);
	this.game.time.events.loop(Phaser.Timer.SECOND/2, menu_blink, this);
}

//Switch to game
function menu_next()
{
	this.game.input.keyboard.onDownCallback = null;
	this.game.state.start('play');
}

//Display a text alternatively in order to blink
function menu_blink()
{
	if(menu_status == 0)
	{
		menu_text.text = "Press any key to play";
		menu_status = 1;
	}	
	else
	{
		menu_text.text = "";
		menu_status = 0;
	}
}
