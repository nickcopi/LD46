const Scenes = [
	MainMenu,
	InGame,
	ReplayMenu,
	Instructions,
	UnlockMenu
]
const SceneEnum = {
	MAIN_MENU:0,
	INGAME:1,
	REPLAY:2,
	INSTRUCTIONS:3,
	UNLOCKS:4
}

class Game{
	constructor(){
		this.canvas = document.getElementById('canvas');
		this.currentScene = 0;
		this.scene = new Scenes[this.currentScene](canvas,this.exit.bind(this));
		this.scene.play();
	}
	exit(scene,extra){
		this.scene.stop();
		if(scene === undefined)
			scene = 0;
		this.currentScene = scene;
		this.scene = new Scenes[this.currentScene](canvas,this.exit.bind(this),extra);
		this.scene.play();
	}
}

let game;
window.addEventListener('load',()=>{
	game = new Game();
});
