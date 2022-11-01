const keyboard = document.querySelectorAll('.keyboard')
const mainKeyboard = document.querySelector('.second__line.center');
const answer = document.querySelector('.answer');
let attempts = document.querySelector('.count__number');
const countDIV = document.querySelector('.count');
const main = document.querySelector('.container__header');
const titlesOfMovies = ['Inception', 'Limitless', 'The Prestige', 'Red Notice', 'Black Widow', 'Cruella', 'Tor', 'The Adam Project', 'Senior Year ', 'The Body', 'The Age of Adaline', 'A Simple Favor']
const word = getRandomTitle(titlesOfMovies);
const space = document.querySelector('.letters__up.space')
const alphabetTrue = 'A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, ?/.'
const alphabet = alphabetTrue.split(" ").join("");
const wordArray = word.toUpperCase().split('');
const wordlenght = wordArray.length;
let count = 10;

function getRandomTitle(titlesOfMovies) {
    const rand = Math.floor(Math.random() * titlesOfMovies.length);
    return titlesOfMovies[rand];
}
console.log(word)

alphabet.split(',').forEach(function (element){
    const letter = document.createElement('div');
    letter.classList.add('letters__up');
    mainKeyboard.appendChild(letter);
    mainKeyboard.style.maxWidth = '765px';
    letter.innerHTML = element; 
    letter.addEventListener('click', getWord) 
})

space.addEventListener('click', checkSpace)

wordArray.forEach((el) => {
    const wordBlock = document.createElement('div');
    wordBlock.classList.add('answer__key');
    answer.appendChild(wordBlock)    
})

function getWord (e) {
    const keyLetter = e.target.innerText;
    checkSymbol(keyLetter);
}  

function checkSpace (){
    checkSymbol(' ')
}

function checkSymbol(keyLetter){
    const isSelectedLetter = wordArray.includes(keyLetter);
    const answerArray = document.querySelectorAll('.answer__key')
    if(isSelectedLetter){
        for(let a = 0; a < wordArray.length; a++){
            if (wordArray[a] === keyLetter){
                answerArray[a].style.transform = "rotateY(1deg)";
                answerArray[a].innerHTML = wordArray[a];
                answerArray[a].style.background = "white";
            }                                  
        }
        if(isWin(answerArray, wordArray)){
            renderWinScreen();
        } 
    }else{
        count--;
        attempts.innerHTML = count;
        if(count === 0){
            renderLoseScreen();
        }
    }       
}

function isWin(answerArray, wordArray){
    return answerArray.length === wordArray.length &&
        wordArray.every((value, index) => value === answerArray[index].innerHTML); //true/false
        //answerArray.every((value, index) => value.innerHTML === wordArray[index]);
        //wordArray.every((value) => value === 'SOMETEXT');
}

// function every(answerArray, wordArray){
//     let isEquals = true;

//     for (let index = 0; index < answerArray.length; index++) {
//         if (answerArray[index].innerHTML != wordArray[index])
//         {
//             isEquals = false;
//             break;
//         }
//     }

//     return isEquals;
// }

function renderWinScreen(){
    answer.classList.add('active')
    countDIV.innerHTML = 'Congratulations! You win :*';
}

function renderLoseScreen(){
    countDIV.innerHTML = `You loose. Sorry =( It was "${word}"`;
    mainKeyboard.style.display = 'none';
    main.classList.add('water')
    main.style.backgroundImage = 'url(/img/rainbow.gif)'

}
