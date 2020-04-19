class Unlock{
	constructor(x,y,size,name,color,type,costType,cost){
		this.x = x;
		this.y = y;
		this.size = size;
		this.name = name;
		this.color = color;
		this.type = type;
		this.costType = costType;
		this.cost = cost;
		this.selected = false;
		this.active = false;
	}
	render(canvas,ctx){
		ctx.fillStyle = this.color;
		if(this.type === 'paint'){
			ctx.beginPath();
			ctx.arc(this.x+this.size/2, this.y+this.size/2, this.size/2, 0, 2 * Math.PI, false);
			ctx.fill();	
			if(this.active){
				ctx.strokeStyle = 'white';
				ctx.lineWidth = 5;
				ctx.stroke();
			}
		} else {
			ctx.fillRect(this.x,this.y,this.size,this.size);
			if(this.active){
				ctx.strokeStyle = 'white';
				ctx.lineWidth = 5;
				ctx.strokeRect(this.x,this.y,this.size,this.size);
			}
		}
		if(this.locked){
			ctx.fillStyle = 'black';
			ctx.font = '40px Arial';
			//ctx.fillRect(this.x,this.y,this.size,this.size);
			ctx.fillText('X',this.x+10,this.y+40);
		}
		if(this.selected){
			ctx.fillStyle = 'white';
			ctx.font = '30px Arial';
			ctx.fillText('v',this.x +20,this.y-40);
		}
	}

}
