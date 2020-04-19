class InGame extends Scene{
	constructor(canvas,exit,extra){
		super(canvas,exit);
		this.grid = [];
		this.gridSize = 26;
		this.player = new Player(0,0,this.gridSize,this.gridSize);
		this.seed = extra.seed;
		this.random = new Random(this.seed);
		this.initGrid();
		this.initControls();
		this.won = false;
		this.tick = 0;
		this.save = new Save();
	}
	initGrid(){
		for(let i = 0; i < this.gridSize; i++){
			const newArray = [];
			for(let j = 0; j < this.gridSize; j++){
				let type = this.random.next()>0.5?GridEnum.LOCKED:GridEnum.OPEN;
				//if(j === 0 || i === 0 || j === this.gridSize-1 || i === this.gridSize-1) type = GridEnum.LOCKED;
				newArray.push(new GridItem(i*this.gridSize,j*this.gridSize,this.gridSize,type));
			}
			this.grid.push(newArray);
		}
		this.findNeighbors();
		//for(let i = 0; i < 200; i++){
		//	this.findNeighbors();
		//	for(let y = 0; y < this.gridSize; y++){
		//		for(let x = 0; x < this.gridSize; x++){
		//			const item = this.grid[y][x];
		//			if(item.openNeighbors < 1)
		//				item.type = GridEnum.LOCKED;
		//		}
		//	}
		//}
		let flow = 1;
		let flows = [];
		for(let y = 0; y < this.gridSize; y++){
			for(let x = 0; x < this.gridSize; x++){
				const gridItem = this.grid[y][x];
				if(gridItem.type === GridEnum.LOCKED) continue;
				if(gridItem.flow) continue;
				let openSet = [gridItem];
				while(openSet.length > 0){
					const item = openSet.pop();
					if(item.flow || item.type === GridEnum.LOCKED) continue;
					item.flow = flow;
					if(flows[flow]) flows[flow]++;
					else flows[flow] = 1;
					openSet = openSet.concat(item.neighbors);
				}
				flow++;
			}
		}
		let maxFlow = flows[1];
		let maxFlowIndex = 1;
		for(let i = 2; i < flows.length;i++){
			if(flows[i] > maxFlow){
				maxFlow = flows[i];
				maxFlowIndex = i;
			}
		}
		for(let y = 0; y < this.gridSize; y++){
			for(let x = 0; x < this.gridSize; x++){
				const gridItem = this.grid[y][x];
				if(gridItem.flow !== maxFlowIndex) gridItem.type = GridEnum.LOCKED;
				else {
					this.player.y = this.gridSize * x;
					this.player.x = this.gridSize * y;
				}
			}
		}
	}
	findNeighbors(){
		for(let y = 0; y < this.gridSize; y++){
			for(let x = 0; x < this.gridSize; x++){
				const gridItem = this.grid[y][x];
				gridItem.neighbors = [];
				if(x > 0)
					gridItem.neighbors.push(this.grid[y][x-1]);
				if(y > 0)
					gridItem.neighbors.push(this.grid[y-1][x]);
				if(x < this.gridSize-1)
					gridItem.neighbors.push(this.grid[y][x+1]);
				if(y < this.gridSize-1)
					gridItem.neighbors.push(this.grid[y+1][x]);
				let open = 0;
				gridItem.neighbors.forEach(neighbor=>{
					if(neighbor.type !== GridEnum.LOCKED)
						open++;
				});
				gridItem.openNeighbors = open;
			}
		}
	}
	paintGrid(){
		this.grid[this.player.gridX(this.gridSize)][this.player.gridY(this.gridSize)].type = GridEnum.PAINTED;
	}
	checkDone(){
		if(this.player.direction !== Directions.NONE) return;
		let open = 0;
		for(let y = 0; y < this.gridSize; y++){
			for(let x = 0; x < this.gridSize; x++){
				if(this.grid[y][x].type === GridEnum.OPEN)
					open++;
			}
		}
		if(!open) {
			this.won = true;
			this.winTick = this.tick;
		}
		
	}
	initControls(){
		this.keydownEvent = this.keydown.bind(this);
		window.addEventListener('keydown',this.keydownEvent);
	}
	keydown(e){
		if(this.player.direction !== Directions.NONE) return;
		if(this.paused){
			switch(e.key){
				case ' ':
					this.play();
					break;
				case 'Escape':
					this.exit();

			}
			return;

		}
		switch(e.key){
			case 'a':
				this.player.direction = Directions.LEFT;
				break;
			case 'd':
				this.player.direction = Directions.RIGHT;
				break;
			case 'w':
				this.player.direction = Directions.UP;
				break;
			case 's':
				this.player.direction = Directions.DOWN;
				break;
			case ' ':
				if(this.player.direction === Directions.NONE)
					this.player.smashing = true;
				break;
			case 'Escape':
				this.pause();
				break;
		}
	}
	play(){
		this.paused = false;
		this.interval = setInterval(()=>{
			this.update();
			this.render();
		},this.frameRate);
	}
	pause(){
		clearInterval(this.interval);
		this.paused = true;
		this.ctx.globalAlpha = 0.75;
		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(0,0,canvas.width,canvas.height);
		this.ctx.globalAlpha = 1;
		this.ctx.fillStyle = '#add8e6';
		this.ctx.font = '40px Arial';
		const text = 'Paused. Space to Continue. Esc to exit.';
		this.ctx.fillText(text, this.canvas.width/2 - this.ctx.measureText(text).width/2, this.canvas.height/2);
	}
	stop(){
		this.pause();
		window.removeEventListener('keydown',this.keydownEvent);
	}
	update(){
		if(this.won){
			if(this.tick > this.winTick + 60){
				this.save.addCompletion(this.seed,this.player.smashes);
				this.exit();
			}
			this.tick++;
			return;
		}
		this.player.move(this.grid,this.gridSize);
		this.player.smash(this.grid,this.gridSize);
		this.paintGrid();
		this.checkDone();
		this.tick++;
	}
	render(){
		const canvas = this.canvas;
		const ctx = this.ctx;
		const offsetX = Math.round(canvas.width/2 - (this.gridSize * this.gridSize * 0.5));
		const offsetY = Math.round(canvas.height/2 - (this.gridSize * this.gridSize * 0.5));
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = 'black';
		ctx.fillRect(0,0,canvas.width,canvas.height);
		this.grid.forEach(row=>row.forEach(gridItem=>gridItem.render(canvas,ctx,offsetX,offsetY)));
		this.player.render(canvas,ctx,offsetX,offsetY);
		ctx.fillStyle = 'white';
		ctx.font = '100px Arial';
		ctx.fillText(this.player.smashes, offsetX/2-50,canvas.height/2);
		ctx.fillText(this.player.smashes, canvas.width - (offsetX/2+50),canvas.height/2);
		if(this.won){
			ctx.fillStyle = '#baffc9';
			ctx.font = '100px Arial';
			const text = 'You Win!';
			ctx.fillText(text, this.canvas.width/2 - this.ctx.measureText(text).width/2, this.canvas.height/2)

		}
	}

}
