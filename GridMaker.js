class GridMaker{
	constructor(seed,gridSize,itemSize,paintColor){
		this.random = new Random(seed);
		this.gridSize = gridSize;
		this.itemSize = itemSize;
		this.paintColor = paintColor;
		if(!this.itemSize) this.itemSize = gridSize;
		this.grid = [];
		this.initGrid();
	}
	initGrid(){
		for(let i = 0; i < this.gridSize; i++){
			const newArray = [];
			for(let j = 0; j < this.gridSize; j++){
				let type = this.random.next()>0.5?GridEnum.LOCKED:GridEnum.OPEN;
				//if(j === 0 || i === 0 || j === this.gridSize-1 || i === this.gridSize-1) type = GridEnum.LOCKED;
				newArray.push(new GridItem(i*this.itemSize,j*this.itemSize,this.itemSize,type,this.paintColor));
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
					this.spawnY = this.gridSize * x;
					this.spawnX = this.gridSize * y;
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
}
