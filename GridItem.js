const GridEnum = {
	LOCKED:0,
	OPEN:1,
	PAINTED:2
}
const GridColors = ['black','white','purple'];

class GridItem extends Entity{
	constructor(x,y,size,type){
		super(x,y,size,size);
		this.type = type;
		this.neighbors = [];
		this.openNeighbors = 0;
	}
	render(cavas,ctx,offsetX,offsetY){
		ctx.fillStyle = GridColors[this.type];
		ctx.fillRect(offsetX + this.x,offsetY + this.y,this.width,this.height);
		//ctx.strokeStyle = 'black';
		//ctx.strokeRect(this.x,this.y,this.width,this.height);
	}
}
