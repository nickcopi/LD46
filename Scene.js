class Scene{
	constructor(canvas,exit){
		this.frameRate = 1000/60;
		this.width = 1280;
		this.height = 720;
		this.canvas = canvas;
		this.exit = exit;
		this.ctx = canvas.getContext('2d');
		this.initCanvas();
	}
	initCanvas(){
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	}
	play(){

	}
	pause(){

	}
	resume(){

	}
	stop(){

	}
}
