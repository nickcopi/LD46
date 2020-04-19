class Waypoint extends Entity{
	constructor(x,y){
		super(x,y,1,1);
	}
	render(cavas,ctx){
		ctx.fillStyle = 'blue';
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
}
