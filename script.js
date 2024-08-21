let currentScore = 0;
let currentGuess = "";
let guessesToGo = 48;
let wrongGuesses = [];
let active = false;
let completed =[];
let nations = ["Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
"Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Great Britain", "Hungary", "Iceland", "Italy",
"Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands",
"North Macedonia", "Northern Ireland", "Norway", "Poland", "Portugal", "Republic of Ireland", "Romania", "Russia", "San Marino", "Serbia",
"Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "Vatican City"];
let startTime;
let elapsedTime = 0;
let timerInterval;
const maxTime = 10 * 60 * 1000; // 10 minutes in milliseconds
document.getElementById('score').innerHTML = currentScore + " / 48";
document.getElementById('nation').innerHTML = 'Find: ' + currentGuess;

//used to update the time displayed.
function updateDisplay(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    document.getElementById('minutes').textContent = '0' + minutes;

    if(seconds < 10){
        document.getElementById('seconds').textContent = '0' + seconds;
    }else{
        document.getElementById('seconds').textContent = seconds;
    }
}

//creates and utilises the Interval funtion to track time for the stopwatch.
function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        if (elapsedTime >= maxTime) {
            elapsedTime = maxTime;
            stopTimer();
            document.getElementById('minutes').textContent = '10';
            document.getElementById('seconds').textContent = '00';
        }
        updateDisplay(elapsedTime);
    }, 1000); 
}

//timer functionality
function stopTimer() {
    clearInterval(timerInterval);
}
function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    updateDisplay(0);
}

//Starts the games process.
function start(){
    //Reset the variables that are used to track metrics so they are exactly as needed for the game to begin.
    active = true;
    resetTimer();
    let numbers = []
    for(let i = 1; i < nations.length + 1; i++){
        numbers.push(i.toString());
    }

    //Only resets these variables if a previous game had already been started.
    if(nations.length < 48){
        nations = ["Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
            "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Great Britain", "Hungary", "Iceland", "Italy",
            "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands",
            "North Macedonia", "Northern Ireland", "Norway", "Poland", "Portugal", "Republic of Ireland", "Romania", "Russia", "San Marino", "Serbia",
            "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "Vatican City"];
        completed = []
        currentScore = 0;
        guessesToGo = 48;
        numberOfGuesses = 0;
        currentGuess = "";

        //Updates the ui
        document.getElementById('score').innerHTML = currentScore + " / 48";
        document.getElementById('nation').innerHTML = 'Find: ' + currentGuess;
        //Resets the background of correctly guessed nations.
        for(let n of nations){
            const i = document.getElementById(n);
            i.style.fill = '';
        }
    }

    //And finally once all variables and metrics reset appropriately, then begins the new game.
    startTimer();
    play();
}

//Picks a nation at random for the user to guess, then removes said nation from the list so its not repeated.
function play(){
    let selectedAtRandom = Math.floor(Math.random() * (guessesToGo - 1))
    currentGuess = nations[selectedAtRandom];
    document.getElementById('nation').innerHTML = "Find: " + currentGuess;

    nations.splice(selectedAtRandom, 1);
    guessesToGo = guessesToGo - 1;
}

//Deals with the players guess.
function guess(guessedNation){
    //Prevents already correct guesses from being selectable. And prevents post game guessing.
    if(!active || completed.indexOf(guessedNation) > -1){
        return;
    }

    //check if right and updates score if correct.
    if (guessedNation == currentGuess){
        completed.push(guessedNation);
        currentScore++;
        document.getElementById('score').innerHTML = currentScore + " / 48";
        
        //Unmarks incorrect guesses so they display as normal for the next question.
        for(let n of wrongGuesses){
            const wrong = document.getElementById(n);
            wrong.style.fill = '';
        }
        //Empties the wrong guess array, so it can be reused for next question.
        wrongGuesses = [];

        //Marks correctly guessed nation as different colour to distinguish form guessable nations on fututre questions.
        const i = document.getElementById(guessedNation);
        i.style.fill = '#86dab1';

        //If its the final nation thats been correctly guessed the game ends.
        if(guessesToGo == 0){
            active = false;
            document.getElementById('nation').innerHTML = 'Complete!';
            stopTimer();
            return;
        }
        //Else if there are more questions left then calls back to play to continue the game.
        play();

    }else{
        //If the guess is incorrect nation is marked red and added to the wrong guess list to make sure it is reset when moving forward.
        const w = document.getElementById(guessedNation);
        w.style.fill = 'red';
        wrongGuesses.push(guessedNation);
    }
}
