class Enemy extends Entity{
	constructor(x,y,width,height){
		super(x,y,width,height);
		this.health = 20;
		this.speed = 5;
	}
	render(cavas,ctx){
		ctx.fillStyle = 'red';
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
	move(){
		this.x += this.speed * Math.cos(this.angle);
		this.y += this.speed * Math.sin(this.angle);
	}
}
