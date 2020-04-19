class Save{
	constructor(){
		this.completions = [];
		this.colors = {
			skin:Constants.DEFAULT_SKIN,
			paint:Constants.DEFAULT_PAINT
		};
		if(localStorage){
			if(localStorage.ld46){
				this.completions = JSON.parse(localStorage.ld46);
			}
			if(localStorage.ld46colors){
				this.colors = JSON.parse(localStorage.ld46colors);
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
	useUnlock(unlock){
		if(unlock.type === 'paint'){
			this.colors.paint = unlock.color;
		} else {
			this.colors.skin = unlock.color;
		}
		try{
			localStorage.ld46colors = JSON.stringify(this.colors);
		}catch(e){
			console.log(e);
		}
	}
	getColors(){
		return this.colors;
	}

}
