/*\
title: $:/plugins/thecontinium/TW5-taskpaper/taskpaper-deserializer.js
type: application/javascript
module-type: tiddlerdeserializer

TaskPaper file deserializer

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var bibtexParse = require("$:/plugins/thecontinium/TW5-taskpaper/bibtexParse.js");

/*
Parse an XLSX file into tiddlers
*/
exports["application/taskpaper"] = function(text,fields) {
	var data,
		results = [];
	// Parse the text
	try {
		data = bibtexParse.toJSON(text)
	} catch(ex) {
		data = ex.toString();
	}
	if(typeof data === "string") {
		return [{
			title: "Taskpaper import error: " + data,
		}];
	}
	// Convert each entry
	$tw.utils.each(data,function(entry) {
		var fields = {
			title: entry.citationKey,
			"bibtex-entry-type": entry.entryType
		};
		$tw.utils.each(entry.entryTags,function(value,name) {
			fields["bibtex-" + name] = value;
		});
		results.push(fields);
	});
	// Return the output tiddlers
	return results;
};

})();
