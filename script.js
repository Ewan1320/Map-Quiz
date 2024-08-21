let currentScore = 0;
let mins = 0;
let sec = 0;
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
document.getElementById('score').innerHTML = currentScore + " / 48";
document.getElementById('nation').innerHTML = 'Find: ' + currentGuess;

let startTime;
let elapsedTime = 0;
let timerInterval;
const maxTime = 10 * 60 * 1000; // 10 minutes in milliseconds

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

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    updateDisplay(0);
}

function start(){
    active = true;
    resetTimer();
    let numbers = []
    for(let i = 1; i < nations.length + 1; i++){
        numbers.push(i.toString());
    }
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
        document.getElementById('score').innerHTML = currentScore + " / 48";
        document.getElementById('nation').innerHTML = 'Find: ' + currentGuess;
        for(let n of nations){
            const i = document.getElementById(n);
            i.style.fill = '';
        }
    }
    
    startTimer();
    play();
}

function play(){
    let selectedAtRandom = Math.floor(Math.random() * (guessesToGo - 1))
    currentGuess = nations[selectedAtRandom];

    document.getElementById('nation').innerHTML = "Find: " + currentGuess;


    nations.splice(selectedAtRandom, 1);
    guessesToGo = guessesToGo - 1;
}


function guess(guessedNation){
    if(!active || completed.indexOf(guessedNation) > -1){
        return;
    }

    //check if right
    if (guessedNation == currentGuess){
        completed.push(guessedNation);
        currentScore++;
        document.getElementById('score').innerHTML = currentScore + " / 48";
        
        for(let n of wrongGuesses){
            const wrong = document.getElementById(n);
            wrong.style.fill = '';
        }
        wrongGuesses = [];
        const i = document.getElementById(guessedNation);
        i.style.fill = '#86dab1';

        if(guessesToGo == 0){
            active = false;
            document.getElementById('nation').innerHTML = 'Complete!';
            stopTimer();
            return;
        }
        play();
    }else{
        const w = document.getElementById(guessedNation);
        w.style.fill = 'red';
        wrongGuesses.push(guessedNation);
    }
}
