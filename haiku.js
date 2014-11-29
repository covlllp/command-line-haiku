var fs = require("fs");
// open the cmu dictionary file for "reading" (the little r)
// cmudict_file = File.open('cmudict.txt', 'r')

var dictionary = {};
// dictionary is an object that pairs # of syllables to an array of words

fs.readFile('cmudict.txt', function(err, data) {
	if(err) {
		return console.log(err);
	}

	console.log("start");
	var lines = data.toString().split("\n")
	lines.forEach(function(line) {
	  	line_split = line.split("  ");

	  	console.log(line_split[0]);
		var syllables = countSyllables(line_split[1]);

		if (dictionary[syllables]) {
			dictionary[syllables].push(line_split[0]);
		} else {
			dictionary[syllables] = [line_split[0]];
		}


		//console.log("The word " + line_split[0] + " has this phoneme layout: " + line_split[1]); 
	});
	console.log("done");
});

function countSyllables(phoneme) {
	var syls = phoneme.match(/\d/g);
	
	if (syls) return syls.length;
	else return 0;
}