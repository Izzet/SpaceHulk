function onStart( game ){
	/*
		Zde je k umístěná kód, který se má spustit po spuštění enginu,
		do argumentu je vrácen objekt game
	*/

	game.adjustCanvas(800, 480);
	
	game.gui.addControls();
	
	game.levelLoad("assets/levels/menu.js");
};