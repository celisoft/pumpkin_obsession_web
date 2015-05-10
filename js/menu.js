function menu_create()
{
	this.game.add.image(0, 0, 'menu_bg');

	if(!music)
	{
		music = this.game.add.audio('music');
		music.play('', 0 , 1, true);
	}
}
