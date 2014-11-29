#!/usr/bin/env node
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var liner = require('./liner');
var ChapterKeeper = require('./chapter-keeper');

function parse_toc(toc){
	var words = [];
	var temp_words = fs.readFileSync(toc).toString();
	
	temp_words = temp_words.split('\n');
	for(var i = 0;i < temp_words.length; i++){
		var word = temp_words[i];
		if(word.length > 0){
			words.push(word);
		}
	}

	return words;
}

var source = argv.source;
var toc = argv.toc;
console.log(toc, source)
var words = parse_toc(toc) || argv._;

var chapters = new ChapterKeeper(words, source);

var sourceStream = fs.createReadStream(source);
sourceStream.pipe(liner);
liner.on('readable', function(){
	var line;
	while(line = liner.read()){
		chapters.process(line);
	}
});

liner.on('finish', function(){
	chapters.print();
});
