class Entity{
	constructor(x,y,width,height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.angle = 0;
	}
	findAngle(entity){
		let x = entity.x;
		let y = entity.y;
		x -= this.x;
		y -= this.y;
		const xPos = x > 0;
		const yPos = y > 0;
		let theta = Math.atan(Math.abs(y)/Math.abs(x));
		if(xPos && !yPos) theta = Math.PI/2 * 3 + (Math.PI/2 - theta);
		if(!xPos && !yPos) theta = Math.PI/2 * 2 + (theta);
		if(!xPos && yPos) theta = Math.PI/2 + (Math.PI/2 - theta);
		return theta;

	}
	collides(entity){
		return (this.x < entity.x + entity.width && this.x + this.width > entity.x && this.y < entity.y + entity.height && this.y + this.height > entity.y) && this !== entity;
	}
}
