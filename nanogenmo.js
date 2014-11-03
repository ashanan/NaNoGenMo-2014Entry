#!/usr/bin/env node
var fs = require('fs');
var liner = require('./liner');

var source = process.argv[2];
var word = process.argv[3];
var words = process.argv.slice(3);

var chapters = {};
for(var i = 0; i < words.length; i++){
	chapters[words[i]] = words[i] + ' in ' + source;
}

var sourceStream = fs.createReadStream(source);
sourceStream.pipe(liner);
liner.on('readable', function(){
	var line;
	while(line = liner.read()){
		for(var j = 0; j < words.length; j++){
			word = words[j];
			if(line.indexOf(word) > -1){
				chapters[word] += line;
			}
		}
	}
});

liner.on('finish', function(){
	console.log(chapters);
});
