class ReplayMenu extends Scene{
	constructor(canvas,exit){
		super(canvas,exit);
		this.initControls();
		this.save = new Save();
		this.itemSize = 10;
		this.completions = this.save.getCompletions();
		this.selected = 0;
		this.changeSelected(0);
		this.gridSize = Constants.GRID_SIZE;
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
			case ' ':
				if(this.completions.length)
					this.exit(1,{seed:this.completions[this.selected].seed});
				break;
			case 'a':
				this.changeSelected(-1);
				break;
			case 'd':
				this.changeSelected(1);
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
	changeSelected(direction){
		this.selected += direction;
		if(this.selected < 0) this.selected = this.completions.length - 1;
		if(this.selected >= this.completions.length) this.selected = 0;
		this.gridMaker = new GridMaker(this.completions[this.selected].seed, 26, this.itemSize);
		this.grid = this.gridMaker.grid;
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
		this.fillCenterText('Replay', 150);
		if(!this.completions.length){
			ctx.fillStyle = 'white';
			ctx.font = '30px Arial';
			this.fillCenterText('Complete a course before you can come back here and you can repeat it.', 300);
			this.fillCenterText('Press Esc to go back.', 360);
		} else {
			const offsetX = Math.round(canvas.width/2 - (this.itemSize * this.itemSize * 0.5));
			const offsetY = 250;
			this.grid.forEach(row=>row.forEach(gridItem=>gridItem.render(canvas,ctx,offsetX,offsetY)));
			//ctx.fillStyle = '#add8e6';
			ctx.fillStyle = 'white';
			ctx.font = '150px Arial';
			if(this.selected > 0)
				this.ctx.fillText('<',offsetX - 200,canvas.height/2 + (this.itemSize*this.itemSize*0.5));
			if(this.selected < this.completions.length-1)
				this.ctx.fillText('>',this.canvas.width - (offsetX - 200),canvas.height/2 + (this.itemSize*this.itemSize*0.5));
			ctx.font = '40px Arial';
			this.fillCenterText(`Lowest smashes: ${this.completions[this.selected].score}`, 550);
			ctx.font = '30px Arial';
			ctx.fillStyle = '#add8e6';
			this.fillCenterText('A/D to move left or right to select a course. Space to replay it.',700);

		}
	}
	fillCenterText(text,y){
		this.ctx.fillText(text, this.canvas.width/2 - this.ctx.measureText(text).width/2, y)
	}

}
