#!/usr/bin/env node
var fs = require('fs');
var liner = require('./liner');

var source = process.argv[2];
var word = process.argv[3];
console.log(source);
console.log(word);

var sourceStream = fs.createReadStream(source);
sourceStream.pipe(liner);
liner.on('readable', function(){
	var line;
	while(line = liner.read()){
		if(line.indexOf(word) > -1){
			console.log(line);
		}
	}
});
