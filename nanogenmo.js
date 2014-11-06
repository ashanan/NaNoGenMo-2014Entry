#!/usr/bin/env node
var fs = require('fs');
var liner = require('./liner');
var ChapterKeeper = require('./chapter-keeper');

var source = process.argv[2];
var words = process.argv.slice(3);

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
