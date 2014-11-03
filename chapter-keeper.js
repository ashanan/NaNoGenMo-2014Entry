function ChapterKeeper(words, title){
	this._words = words || [];
	this._chapters = {};

	for(var i = 0; i < this._words.length; i++){
		this._chapters[words[i]] = this._words[i] + ' in ' 
								 + title + '\n\n';
	}

	this.process = function(line){
		for(var i = 0;i < this._words.length; i++){
			word = this._words[i];
			if(line.indexOf(word) > -1){
				this._chapters[word] += line;
			}
		}
	};

	this.print = function(){
		for(var i = 0;i < this._words.length;i++){
			console.log(this._chapters[this._words[i]]);
			console.log('\n');
		}
	};
}

module.exports = ChapterKeeper;
