class Instructions extends Scene{
	constructor(canvas,exit){
		super(canvas,exit);
		this.initControls();
	}
	initControls(){
		this.keydownEvent = this.keydown.bind(this);
		window.addEventListener('keydown',this.keydownEvent);
	}
	keydown(e){
		switch(e.key){
			case 'Escape':
				this.exit();
				break;
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
		window.removeEventListener('keydown',this.keydownEvent);
	}
	update(){

	}
	render(){
		const canvas = this.canvas;
		const ctx = this.ctx;
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = 'black';
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = '#add8e6';
		ctx.font = '150px Arial';
		this.fillCenterText('Instructions', 150);
		ctx.fillStyle = 'white';
		ctx.font = '40px Arial';
		this.fillCenterText('WASD to move. Escape to pause.', 250);
		this.fillCenterText('Press space after moving towards a wall to smash it.', 310);
		this.fillCenterText('To win, paint the entire course, to make it feel more alive.', 370);
		this.fillCenterText('The goal is to complete a course with as few smashes as possible.', 430);
		this.fillCenterText('After playing a random course, it can be replayed for an attempted', 490);
		this.fillCenterText('lower score.', 550);
		ctx.fillStyle = '#add8e6';
		ctx.font = '30px Arial';
		this.fillCenterText('This game was made in under 12 hours for Ludum Dare 46, theme "Keep it Alive".', 700);
	}
	fillCenterText(text,y){
		this.ctx.fillText(text, this.canvas.width/2 - this.ctx.measureText(text).width/2, y)
	}

}
