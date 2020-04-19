let MainMenu = 1;
const Scenes = [
	MainMenu,
	InGame
]

class Game{
	constructor(){
		this.canvas = document.getElementById('canvas');
		this.currentScene = 1;
		this.scene = new Scenes[this.currentScene](canvas,this.exit);
		this.scene.play();
	}
	exit(scene){
		this.scenes[this.currentScene].stop();
		if(scene === undefined)
			scene = 0;
		this.currentScene = scene;
		this.scene = new Scenes[this.currentScene](canvas,this.exit);
	}
}

let game;
window.addEventListener('load',()=>{
	game = new Game();
});
