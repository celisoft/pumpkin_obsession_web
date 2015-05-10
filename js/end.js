function end_create()
{
	this.game.add.image(0, 0, 'end');

	if(!snd_fail)
	{
		snd_fail = this.game.add.audio('snd_fail');
	}
	snd_fail.play();

	this.game.time.events.loop(Phaser.Timer.SECOND*3, back_to_menu, this);
}

function back_to_menu()
{
	this.game.state.start('menu');
}
