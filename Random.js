class Random{
	constructor(seed){
		this.seed = seed;
		if(!this.seed) this.seed = 1;
	}
	next(){
    		let x = Math.sin(this.seed++) * 10000;
    		return x - Math.floor(x);
	}
}
