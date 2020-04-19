class GameOption{
	constructor(y,text,use){
		this.y = y;
		this.text = text;
		this.use = use;
		this.selected = false;
	}
	render(canvas,ctx){
		ctx.fillStyle = 'white';
		ctx.font = '60px Arial';
		let text = this.text;
		if(this.selected) text = '> ' + this.text + ' <';
		this.fillCenterText(ctx,canvas,text,this.y);
	}

	fillCenterText(ctx,canvas,text,y){
		ctx.fillText(text, canvas.width/2 - ctx.measureText(text).width/2, y)
	}
}
