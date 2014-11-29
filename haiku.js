var fs = require("fs");
// open the cmu dictionary file for "reading" (the little r)
// cmudict_file = File.open('cmudict.txt', 'r')

var dictionary = {};
// dictionary is an object that pairs # of syllables to an array of words

// populate dictionary with cmudict
fs.readFile('cmudict.txt', function(err, data) {
	if(err) {
		return console.log(err);
	}

	var lines = data.toString().split("\n")
	lines.forEach(function(line) {
	  	line_split = line.split("  ");
		var syllables = countSyllables(line_split[1]);

		if (dictionary[syllables]) {
			dictionary[syllables].push(line_split[0]);
		} else {
			dictionary[syllables] = [line_split[0]];
		}
	});

	console.log(selectRandomWord("5", dictionary));
	console.log(selectRandomWord("7", dictionary));
	console.log(selectRandomWord("5", dictionary));
});



function countSyllables(phoneme) {
	var syls = phoneme.match(/\d/g);
	
	if (syls) return syls.length;
	else return 0;
}

function selectRandomWord(syllables, dictionary) {
	var len = dictionary[syllables].length;
	return dictionary[syllables][Math.floor(Math.random() * len)];
}