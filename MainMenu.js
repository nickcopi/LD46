class MainMenu extends Scene{
	constructor(canvas,exit){
		super(canvas,exit);
		this.tick = 0;
		this.initControls();
	}
	initControls(){
		window.addEventListener('keypress',this.keypress.bind(this));
	}
	keypress(e){
		if(this.player.direction !== Directions.NONE) return;
		switch(e.key){
		}
	}
	play(){
		this.interval = setInterval(()=>{
			this.update();
			this.render();
		},this.frameRate);
	}
	pause(){
		clearInterval(this.interval);
	}
	stop(){
		this.pause();
		window.removeEventListener('keypress',this.keypress.bind(this));
	}
	update(){
		this.tick++;
	}
	render(){
		const canvas = this.canvas;
		const ctx = this.ctx;
		ctx.clearRect(0,0,canvas.width,canvas.height);
	}
	fillCenterText(text,y){
		this.ctx.fillText(text, this.canvas.width/2 - this.ctx.measureText(text).width/2, this.canvas.height/2)
	}

}
