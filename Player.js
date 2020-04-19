const Directions = {
	NONE:0,
	LEFT:1,
	RIGHT:2,
	UP:3,
	DOWN:4
}

class Player extends Entity{
	constructor(x,y,width,height){
		super(x,y,width,height);
		this.oldDirection = Directions.NONE;
		this.direction = Directions.NONE;
		this.speed = 3;
		this.smashes = 0;
		this.smashing = false;
	}
	render(cavas,ctx,offsetX,offsetY){
		ctx.fillStyle = 'blue';
		ctx.fillRect(offsetX + this.x,offsetY + this.y,this.width,this.height);
	}
	gridX(gridSize){
		return Math.floor(this.x/gridSize);
	}
	gridY(gridSize){
		return Math.floor(this.y/gridSize);
	}
	smash(grid,gridSize){
		if(!this.smashing || this.oldDirection === Directions.NONE || this.direction !== Directions.NONE)
			return;
		switch(this.oldDirection){
			case Directions.LEFT:
				grid[this.gridX(gridSize)-1][this.gridY(gridSize)].type = GridEnum.OPEN;
				break;
			case Directions.RIGHT:
				grid[this.gridX(gridSize)+1][this.gridY(gridSize)].type = GridEnum.OPEN;
				break;
			case Directions.UP:
				grid[this.gridX(gridSize)][this.gridY(gridSize)-1].type = GridEnum.OPEN;
				break;
			case Directions.DOWN:
				grid[this.gridX(gridSize)][this.gridY(gridSize)+1].type = GridEnum.OPEN;
				break;
		}
		this.smashes++;
		this.smashing = false;
	}
	move(grid,gridSize){
		switch(this.direction){
			case Directions.LEFT:
				this.x -= this.speed;
				if(grid[this.gridX(gridSize)][this.gridY(gridSize)].type === GridEnum.LOCKED){
					this.x = (this.gridX(gridSize) + 1) * gridSize;
					this.oldDirection = this.direction;
					this.direction = Directions.NONE;
				}
				break;
			case Directions.RIGHT:
				this.x += this.speed;
				if(grid[this.gridX(gridSize) +1 ][this.gridY(gridSize)].type === GridEnum.LOCKED){
					this.x = (this.gridX(gridSize)) * gridSize;
					this.oldDirection = this.direction;
					this.direction = Directions.NONE;
				}
				break;
			case Directions.UP:
				this.y -= this.speed;
				if(grid[this.gridX(gridSize)][this.gridY(gridSize)].type === GridEnum.LOCKED){
					this.y = (this.gridY(gridSize) + 1) * gridSize;
					this.oldDirection = this.direction;
					this.direction = Directions.NONE;
				}
				break;
			case Directions.DOWN:
				this.y += this.speed;
				if(grid[this.gridX(gridSize)][this.gridY(gridSize)+1].type === GridEnum.LOCKED){
					this.y = (this.gridY(gridSize)) * gridSize;
					this.oldDirection = this.direction;
					this.direction = Directions.NONE;
				}
				break;
		}
	}
}
