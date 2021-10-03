var minLength = 3;
var maxLength = 6;
var validRootWords = [];
var unscrambledWords = [];

function findPossibleRootWords() {
    for (var i = 0; i<dictionary.length; i++){
        if(dictionary[i].length == maxLength){
            validRootWords.push(dictionary[i]);
        }
    }
}

function getUnscrambledWords 

// function getPermutations(word){

// }

findPossibleRootWords();
