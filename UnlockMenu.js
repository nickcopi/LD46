class UnlockMenu extends Scene{
	constructor(canvas,exit){
		super(canvas,exit);
		this.initControls();
		this.save = new Save();
		this.completions = this.save.getCompletions();
		this.unlockSize = Constants.UNLOCK_SIZE;
		this.initUnlocks();
		this.selected = 0;
		this.changeSelected(0);
	}
	initUnlocks(){
		this.unlocks = [];
		let gap = 100;
		let baseX = (this.unlockSize*4 +gap*3) - 170;
		let baseY = 120 + canvas.height/2 - (this.unlockSize*2 +gap);
		let unlocks = [
			{
				name:'Pastel purple',
				color:'#b19cd9',
				type:'paint',
				costType:'wins',
				cost:0
			},
			{
				name:'Pastel orange',
				color:'#ffdfba',
				type:'paint',
				costType:'wins',
				cost:2
			},
			{
				name:'Spring green',
				color:'#E2F0CB',
				type:'paint',
				costType:'wins',
				cost:5
			},
			{
				name:'Pastel gold',
				color:'#ffffba',
				type:'paint',
				costType:'wins',
				cost:10
			},
			{
				name:'Hero blue',
				color:'#add8e6',
				type:'skin',
				costType:'smashes',
				cost:Infinity
			},
			{
				name:'Pastel green',
				color:'#baffc9',
				type:'skin',
				costType:'smashes',
				cost:30
			},
			{
				name:'Salmon',
				color:'#FF9AA2',
				type:'skin',
				costType:'smashes',
				cost:10
			},
			{
				name:'Teal',
				color:'#43C2C2',
				type:'skin',
				costType:'smashes',
				cost:5
			},
		];
		let i = 0;
		for(let y = 0; y < 2; y++){
			for(let x = 0; x < 4; x++){
				this.unlocks.push(new Unlock(gap*x + this.unlockSize*x + baseX, gap*y + this.unlockSize*y + baseY, this.unlockSize,unlocks[i].name,unlocks[i].color,unlocks[i].type,unlocks[i].costType,unlocks[i].cost));
				i++;
			}
		}
		const wins = this.completions.length;
		let lowestScore = Infinity;
		this.completions.forEach(completion=>{
			if(completion.score < lowestScore)
				lowestScore = completion.score;
		});
		this.unlocks.forEach(unlock=>{
			if(unlock.costType === 'wins'){
				if(wins < unlock.cost) unlock.locked = true;
			} else {
				if(unlock.cost < lowestScore) unlock.locked = true;
			}
		});
		this.setActiveUnlock();

	}
	setActiveUnlock(){
		const colors = this.save.getColors();
		this.unlocks.forEach(unlock=>{
			unlock.active = false;
			if(unlock.type === 'paint' && unlock.color == colors.paint) unlock.active = true;
			if(unlock.type === 'skin' && unlock.color == colors.skin) unlock.active = true;
		});
	}
	initControls(){
		this.keydownEvent = this.keydown.bind(this);
		window.addEventListener('keydown',this.keydownEvent);
	}
	keydown(e){
		switch(e.key){
			case 'Escape':
				this.exit();
				break;
			case ' ':
				const unlock = this.unlocks[this.selected];
				if(!unlock.locked){
					this.save.useUnlock(unlock);
					this.setActiveUnlock();
				}
				break;
			case 'a':
				this.changeSelected(-1);
				break;
			case 'd':
				this.changeSelected(1);
				break;
		}
	}
	play(){
		this.interval = setInterval(()=>{
			this.update();
			this.render();
		},this.frameRate);
	}
	pause(){
		clearInterval(this.interval);
	}
	stop(){
		this.pause();
		window.removeEventListener('keydown',this.keydownEvent);
	}
	changeSelected(direction){
		this.unlocks[this.selected].selected = false;
		this.selected += direction;
		if(this.selected < 0) this.selected = this.unlocks.length - 1;
		if(this.selected >= this.unlocks.length) this.selected = 0;
		this.unlocks[this.selected].selected = true;
	}
	update(){

	}
	render(){
		const canvas = this.canvas;
		const ctx = this.ctx;
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = 'black';
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = '#add8e6';
		ctx.font = '150px Arial';
		this.fillCenterText('Unlocks', 150);
		this.unlocks.forEach(unlock=>unlock.render(canvas,ctx));
		ctx.fillStyle = 'white';
		const unlock = this.unlocks[this.selected];
		let name = `${unlock.name} ${unlock.type}`;
		if(unlock.locked){
			if(unlock.costType === 'wins'){
				name = `?????, requires ${unlock.cost} wins to unlock.`;
			} else {
				name = `?????, requires a lowest smash solve of ${unlock.cost} to unlock.`;
			}
		}
		ctx.font = '40px Arial';
		this.fillCenterText(name, 660);

	}
	fillCenterText(text,y){
		this.ctx.fillText(text, this.canvas.width/2 - this.ctx.measureText(text).width/2, y)
	}

}
