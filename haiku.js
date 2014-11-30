var fs = require("fs");
// open the cmu dictionary file for "reading" (the little r)
// cmudict_file = File.open('cmudict.txt', 'r')

var dictionary = {};
// dictionary is an object that pairs # of syllables to an array of words

fs.readFile('cmudict.txt', function(err, data) {
	if(err) {
		return console.log(err);
	}

	// populate dictionary with cmudict
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

	// Print out the haiku!
	printLine(5);
	printLine(7);
	printLine(5);	
});



function printLine(syllables) {
	var print_out = "";
	while (syllables > 0) {
		var word_syl = Math.ceil(Math.random() * syllables);
		syllables -= word_syl;
		print_out += selectRandomWord(word_syl) + " ";
	}

	console.log(print_out.substring(0, print_out.length - 1));
}

function countSyllables(phoneme) {
	var syls = phoneme.match(/\d/g);
	if (syls) return syls.length;
	else return 0;
}

function selectRandomWord(syllables) {
	var len = dictionary[syllables].length;
	return dictionary[syllables][Math.floor(Math.random() * len)];
}