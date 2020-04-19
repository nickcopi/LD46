class Save{
	constructor(){
		this.completions = [];
		if(localStorage){
			if(localStorage.ld46){
				this.completions = JSON.parse(localStorage.ld46);
			}
		}
	}
	addCompletion(seed,score){
		let found = false;
		this.completions.forEach(completion=>{
			if(found) return;
			if(completion.seed === seed){
				if(score < completion.score)
					completion.score = score
				found = true;
			}
		});
		if(!found) this.completions.push({seed,score});
		try{
			localStorage.ld46 = JSON.stringify(this.completions);
		}catch(e){
			console.log(e);
		}

	}
	getCompletions(){
		return this.completions;
	}

}
