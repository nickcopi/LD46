class Game{
	constructor(){
		this.canvas = document.getElementById('canvas');
		this.scenes = [new InGame(this.canvas)];
		this.currentScene = 0;
		this.scenes[this.currentScene].play();
	}
}

let game;
window.addEventListener('load',()=>{
	game = new Game();
});
