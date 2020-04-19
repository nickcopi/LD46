const GridEnum = {
	LOCKED:0,
	OPEN:1,
	PAINTED:2
}

class GridItem extends Entity{
	constructor(x,y,size,type,color){
		super(x,y,size,size);
		this.type = type;
		this.neighbors = [];
		this.openNeighbors = 0;
		this.gridColors = ['black','white',color];
	}
	render(cavas,ctx,offsetX,offsetY){
		ctx.fillStyle = this.gridColors[this.type];
		ctx.fillRect(offsetX + this.x,offsetY + this.y,this.width,this.height);
		//ctx.strokeStyle = 'black';
		//ctx.strokeRect(this.x,this.y,this.width,this.height);
	}
}
