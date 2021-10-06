var minLength = 3;
var maxLength = 6;
var validRootWords = [];
var unscrambledWords = [];
var guessedWords = [];
var validWordsInRange = [];

/*
Removes words from dictionary that are longer than max length or shorter than min length
@param dictionary the list of words that you want to trim
*/
function trimDictionary(dictionary){
    for(var i=0; i<dictionary.length; i++){
        let word = dictionary[i];
        if(word.length <= maxLength && word.length >= minLength){
            validWordsInRange.push(word);
        }
    }
}

/*
Finds all words from the dictionary that are 6 letters long that can possibly be used as the base word
*/
function findValidRootWords() {
    for (var i = 0; i<dictionary.length; i++){
        if(dictionary[i].length == maxLength){
            validRootWords.push(dictionary[i]);
        }
    }
}

/*
Randomly shuffles the root word
@param word the word that is ti be shuffled
*/
function scramble(word){
    var l = word.length;
    for(var i=0; i<word.length; i++){
        word = word.split("");
        var rand = Math.floor(Math.random()*l);
        var temp = word[i];
        word[i] = word[rand];
        word[rand] = temp;
        word = word.join("");
    }
    return word;
}

/*
Determines if a given word can be created with a given set of letters.
Accounts for the fact that a letter can only be used more than once if it occurs in the given letters more than once.
@param testWord the given word to be checked
@param givenLetters the available letters that can be used to make testWord
*/
function isWordFromLetters(testWord, givenLetters){
    var testLetters = testWord.split("");
    var validLetters = givenLetters.split("");
    var count = 0;
    for(var i=0; i<testLetters.length; i++){
        if(validLetters.includes(testLetters[i])){
            validLetters.splice(validLetters.indexOf(testLetters[i]), 1);
            count ++;
        }
    }
    if (count == testWord.length){
        return true;
    }
    else{
        return false;
    }
}

/*
Traverses the dictionary to find all possible words that can be made using the letters in the root word
@param rootWord the word to be checked against the dictionary to see what other words can be made from its letters
*/
function findWordsToBeGuessed(rootWord){
    for(var i=0; i<validWordsInRange.length; i++){
        if(isWordFromLetters(validWordsInRange[i], rootWord)){
            unscrambledWords.push(validWordsInRange[i]);
        }
    }
}

//Startup
trimDictionary(dictionary);     //get rid of all words that are too short/too long
findValidRootWords();           //get all 6 letter words that could be used as the root word
var rootWord = validRootWords[Math.floor(Math.random() * validRootWords.length)]; //pick a root word
findWordsToBeGuessed(rootWord);            //find all other valaid words that can be made with the letters of the root word
rootWord = scramble(rootWord);

//Begin main guessing loop
do {
    console.log("Available letters: " + rootWord + "\n");    //print the available letters
    let blanks = "";
    for(var i=0; i<unscrambledWords.length; i++){
        if(!guessedWords.includes(unscrambledWords[i])){
            for(var j=0; j<unscrambledWords[i].length; j++){
                blanks += "- ";                            //print dashes in place of words that haven't been guessed yet
            }
            blanks += "\n";
        }
    }
    console.log(blanks);
    for(var i=0; i<guessedWords.length; i++){            //print all words that have been guessed
        console.log(guessedWords[i] + "\n");
    }
    guess = prompt("Enter a guess: ");    //parse the user guess and respond accordingly
    if(guess != null){
        if(guess.length<minLength){
            if(guess == "*"){
                rootWord = scramble(rootWord);
                alert("Shuffling root word...");
            }
            else{
                alert("Guess is too short!");
            }
        }
        else if(guess.length > maxLength){
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
} while (guess != null && guessedWords.length < unscrambledWords.length); 


console.log("You guessed " + guessedWords.length + " out of " + unscrambledWords.length + "!");  //game over, report result
for(var l=0; l<unscrambledWords.length; l++){
    console.log(unscrambledWords[l] + "\n");   //print all the words that may not have been guessed
}

