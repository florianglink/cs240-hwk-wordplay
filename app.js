var minLength = 3;
var maxLength = 6;
var validRootWords = [];
var unscrambledWords = [];

//Finds all words from the dictionary that are 6 letters long that can possibly be used as the base word
function findValidRootWords() {
    for (var i = 0; i<dictionary.length; i++){
        if(dictionary[i].length == maxLength){
            validRootWords.push(dictionary[i]);
        }
    }
}

//Picks out valid words from the set of all permutations
function getUnscrambledWords (perms){
    for(var i = 0; i<perms.length; i++){
        if(dictionary.includes(perms[i])){
            unscrambledWords.push(perms[i]);
        }
    }
}

// function getPermutations(word){

// }

//Startup
findValidRootWords();
var rootWord = validRootWords[Math.floor(Math.random() * validRootWords.length())];
var perms = getPermutations(rootWord);
getUnscrambledWords(perms);
