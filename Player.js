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
	}
	render(cavas,ctx){
		ctx.fillStyle = 'blue';
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
}
