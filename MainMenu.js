class MainMenu extends Scene{
	constructor(canvas,exit){
		super(canvas,exit);
		this.tick = 0;
		this.initControls();
		this.options = [];
		this.selected = 1;
		this.initOptions();
	}
	initOptions(){
		const base = 270;
		const actions = [this.replayOption, this.randomOption,this.instructions,this.about].map(func=>func.bind(this));
		this.options = ['Replay','Play','Instructions','About'].map((name,i)=>{
			return new GameOption(base + i*100,name, actions[i]);
		});
		this.options[this.selected].selected = true;
	}
	initControls(){
		this.keypressEvent = this.keypress.bind(this);
		window.addEventListener('keypress',this.keypressEvent);
	}
	keypress(e){
		switch(e.key){
			case 'w':
				this.changeSelected(-1);
				break;
			case 's':
				this.changeSelected(1);
				break;
			case ' ':
				this.options[this.selected].use();

		}
	}
	replayOption(){
	
	}
	randomOption(){
		this.exit(1,{seed:Math.floor(Math.random()*100000)});
	}
	instructions(){
		this.exit(3);
	}
	about(){

	}
	changeSelected(direction){
		this.options[this.selected].selected = false;
		this.selected += direction;
		if(this.selected < 0) this.selected = this.options.length - 1;
		if(this.selected >= this.options.length) this.selected = 0;
		this.options[this.selected].selected = true;
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
		window.removeEventListener('keypress',this.keypressEvent);
	}
	update(){
		this.tick++;
	}
	render(){
		const canvas = this.canvas;
		const ctx = this.ctx;
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = 'black';
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = '#add8e6';
		ctx.font = '150px Arial';
		this.fillCenterText('LiveLock', 150);
		this.options.forEach(option=>option.render(canvas,ctx));
	}
	fillCenterText(text,y){
		this.ctx.fillText(text, this.canvas.width/2 - this.ctx.measureText(text).width/2, y)
	}

}
