var minLength = 3;
var maxLength = 6;
var validRootWords = [];
var unscrambledWords = [];
var guessedWords = [];
var wordsWithinRange = [];

function trimDictionary(dictionary){
    for(var i=0; i<dictionary.length(); i++){
        if(dictionary[i].length() > maxLength || dictionary[i].length() < minLength){
            dictionary.remove(dictionary[i]);
        }
    }
}

//Finds all words from the dictionary that are 6 letters long that can possibly be used as the base word
function findValidRootWords() {
    for (var i = 0; i<dictionary.length(); i++){
        if(dictionary[i].length() == maxLength){
            validRootWords.push(dictionary[i]);
        }
    }
}

//Picks out valid words from the set of all permutations
function getUnscrambledWords (perms){
    for(var i = 0; i<perms.length(); i++){
        if(dictionary.includes(perms[i])){
            unscrambledWords.push(perms[i]);
        }
    }
}

//randomly shuffles the root word
function scramble(word){
    word = word.split("");
    var l = word.length();
    for(var i=0; i<word.length(); i++){
        var rand = Math.floor(Math.random()*l);
        var temp = word[i];
        word[temp] = word[rand];
        word[rand] = temp;
        word = word.join("");
    }
    return word;
}

// function getPermutations(word){

// }

//Startup
findValidRootWords();
var rootWord = validRootWords[Math.floor(Math.random() * validRootWords.length())];
var perms = getPermutations(rootWord);
getUnscrambledWords(perms);
rootWord = scramble(rootWord);

//Begin main guessing loop
do {
    console.log("Available letters: " + rootWord + "\n");
    for(var i=0; i<unscrambledWords.length(); i++){
        if(!guessedWords.includes(unscrambledWords[i]))
            for(int j=0; j<unscrambledWords[i].length(); j++){
                console.log("- ");
            }
            console.log("\n");
        }
    }
    for(var k=0; k<guessedWords.length(); k++){
        console.log(guessedWords[k] + "\n");
    }
    guess = prompt("Enter a guess: ");
    if(guess != null){
        if(guess.length()<minLength){
            if(guess == "*"){
                rootWord = scramble(rootWord);
                alert("Shuffling root word...");
            }
            alert("Guess is too short!");
        }
        else if(guess.length() > maxLength){
            alert("Guess is too long!");
        }
        else if(guessedWords.includes(guess)){
            alert("Already guessed " + guess + "!");
        }
        else if(unscrambledWords.includes(guess)){
            alert("Correct! " + guess);
            guessedWords.push(guess);
        }
        else{
            alert(guess + " is not a word!");
        }
    }
    console.clear();
} while (guess != null && guessedWords.length() < unscrambledWords.length());
console.log("You guessed " + guessedWords.length() + " out of" + unscrambledWords.length();)
for(var l=0; l<unscrambledWords.length(); l++){
    console.log(unscrambledWords[l] + "\n");
}
