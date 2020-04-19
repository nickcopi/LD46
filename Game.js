const Scenes = [
	MainMenu,
	InGame,
	Instructions,
	Instructions
]

class Game{
	constructor(){
		this.canvas = document.getElementById('canvas');
		this.currentScene = 0;
		this.scene = new Scenes[this.currentScene](canvas,this.exit.bind(this));
		this.scene.play();
	}
	exit(scene,extra){
		console.log(this.scene);
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
