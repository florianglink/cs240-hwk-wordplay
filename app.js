var minLength = 3;
var maxLength = 6;
var validRootWords = [];
var unscrambledWords = [];
var guessedWords = [];

//Removes words from dictionary that are longer than max length or shorter than min length
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

//Determines if a given word can be created with a given set of letters.
//Accounts for the fact that a letter can only be used more than once if it occurs in the given letters more than once.
function isWordFromLetters(testWord, givenLetters){
    var testLetters = testWord.split("");
    var validLetters = givenLetters.split("");
    var count = 0;
    for(var i=0; i<testLetters.length(); i++){
        if(validLetters.includes(testLetters[i])){
            validLetters.splice(validLetters.indexOf(testLetters[i], 1));
            count ++;
        }
    }
    if (count == testWord.length()){
        return true;
    }
    else{
        return false;
    }
}

//Traverses the dictionary to find all possible words that can be made using the letters in the root word
function findWordsToBeGuessed(rootWord){
    for(var i=0; i<dictionary.length(); i++){
        if(isWordFromLetters(dictionary[i], rootWord)){
            unscrambledWords.push(dictionary[i]);
        }
    }
}

//Startup
trimDictionary(dictionary);     //get rid of all words that are too short/too long
findValidRootWords();           //get all 6 letter words that could be used as the root word
var rootWord = validRootWords[Math.floor(Math.random() * validRootWords.length())]; 
findWordsToBeGuessed(rootWord);
rootWord = scramble(rootWord);

//Begin main guessing loop
do {
    console.log("Available letters: " + rootWord + "\n");
    for(var i=0; i<unscrambledWords.length(); i++){
        if(!guessedWords.includes(unscrambledWords[i])){
            for(var j=0; j<unscrambledWords[i].length(); j++){
                console.log("- ");
            }
            console.log("\n");
        }
    }
    for(var i=0; i<guessedWords.length(); i++){
        console.log(guessedWords[k] + "\n");
    }
    guess = prompt("Enter a guess: ");
    if(guess != null){
        if(guess.length()<minLength){
            if(guess == "*"){
                rootWord = scramble(rootWord);
                alert("Shuffling root word...");
            }
            else{
                alert("Guess is too short!");
            }
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

console.log("You guessed " + guessedWords.length() + " out of" + unscrambledWords.length());
for(var l=0; l<unscrambledWords.length(); l++){
    console.log(unscrambledWords[l] + "\n");
}

