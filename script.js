
const gameContainer = document.getElementById("game");
const theBody = document.querySelector('body');

const CARDS = [
  {
    name: 'larry',
    img:  '100px/larry.jpg'
  },
  {
    name: 'mr krabs',
    img: '100px/mr krabs.jpg'
  },
  {
    name: 'patrick',
    img: '100px/patrick.jpg'
  },
  {
    name: 'sandy',
    img: '100px/sandy cheeks.jpg'
  },
  {
    name: 'spongebob',
    img: '100px/sbob.jpg'
  },
  {
    name: 'squidward',
    img: '100px/squidward.jpg'
  },
  {
    name: 'larry',
    img:  '100px/larry.jpg'
  },
  {
    name: 'mr krabs',
    img: '100px/mr krabs.jpg'
  },
  {
    name: 'patrick',
    img: '100px/patrick.jpg'
  },
  {
    name: 'sandy',
    img: '100px/sandy cheeks.jpg'
  },
  {
    name: 'spongebob',
    img: '100px/sbob.jpg'
  },
  {
    name: 'squidward',
    img: '100px/squidward.jpg'
  },
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// let shuffledCards = shuffle(CARDS);

let n=0;
function createImgForCards(cardArray) {
  for (let card of cardArray) {
    // create a new div
    const newImg = document.createElement("img");
    newImg.setAttribute('class', 'card');
    newImg.setAttribute('data-name', card.name);
    newImg.setAttribute('data-img', card.img);
    newImg.setAttribute('id', n); //each card has its own id
    n++
    newImg.setAttribute('src', '100px/question-mark.jpg') //each card image is the same to simulate facing down

    // call a function handleCardClick when an img is clicked on
    newImg.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newImg);
  }
};

{/* <h2 id="score">Matches Found: </h2>
<h2 id="guessesMade">Number of Guesses:</h2> */}

let scoreBoard = document.createElement('h2');
scoreBoard.innerText="Matches Found:";
let guessBoard = document.createElement('h2');
guessBoard.innerText="Number of Guesses:";
let scores = document.createElement('div')

const startButton=document.querySelector('#play');
startButton.addEventListener("click", function(e) {
  let shuffledCards = shuffle(CARDS);
  //shuffle cards
  createImgForCards(shuffledCards);
  //cards load
  theBody.append(scores)
  scores.append(scoreBoard);
  scores.append(guessBoard);
  const timer = document.createElement('h2');
  timer.innerText="Time:";
  scores.append(timer);
  let count = 1;
  let thisTime = document.createElement('div');
  thisTime.setAttribute('id', 'thisTime');
  function myTime(){
    thisTime.innerText=count;
    timer.append(thisTime)
    count++
  }
  let theTimer=setInterval(function(){
    myTime();
    if(scoreDisplay.innerText===`${(CARDS.length/2)} of ${(CARDS.length/2)}`){
      timer.remove();
      clearInterval(theTimer);
    }
  }, 1000);
  
  
  startButton.remove();
  //makes start button go away after first time it is clicked
});



const restartButton=document.createElement('button');
restartButton.innerText = "Play Again"
restartButton.addEventListener('click', function(e){
  let oldCards = document.querySelectorAll('.card');
  for(let i=0; i<oldCards.length; i++){
    oldCards[i].remove();
  }
  //this part of the code gets rid of the old cards
  let shuffledCards = shuffle(CARDS); //reshuffles cards
  createImgForCards(shuffledCards); //makes the images for the cards (and all the needed attributes)
  theBody.append(scores)
  scores.append(scoreBoard);
  scores.append(guessBoard);
  const timer = document.createElement('h2');
  timer.innerText="Time:";
  scores.append(timer);
  let count = 1;
  let thisTime = document.createElement('div');
  thisTime.setAttribute('id', 'thisTime');
  function myTime(){
    thisTime.innerText=count;
    timer.append(thisTime)
    count++
  }
  let theTimer=setInterval(function(){
    myTime();
    if(scoreDisplay.innerText===`${(CARDS.length/2)} of ${(CARDS.length/2)}`){
      timer.remove();
      clearInterval(theTimer);
    }
  }, 1000);
  restartButton.remove();
  let matches=0;
  let guesses=0;
  guessesNum.innerText=guesses;
  scoreDisplay.innerText=`${matches} of ${(CARDS.length/2)}`;;
}) 
//ok now need to append this to something



let cardsPicked=[]; //array of the selected card objects (starts out empty)
let cardsChosenId=[]; //array of the data-names of the two chosen cards, which is the same for matching images
let cardsWon=[]; //gets pushed in the cardsPicked array if the two cards are matching (so each pair is one element in the array)
let cardIDs=[]; //array of the cards individual ids (each unique) to prevent matches being granted for matching cards
let matches=0;
let guesses=0;

// let score=document.querySelector('#score')
let scoreDisplay =document.createElement('div');
// let guessesTitle=document.querySelector('#guessesMade');
let guessesNum=document.createElement('div');
guessBoard.append(guessesNum);
guessesNum.innerText=guesses;
scoreBoard.append(scoreDisplay);
scoreDisplay.innerText=`${matches} of ${(CARDS.length/2)}`;




//this is intended to run only after two cards are chosen
  function checkMatch(){
  let cards=document.querySelectorAll('img')
  const optionOne = cardsChosenId[0];
  const optionTwo = cardsChosenId[1];
  if(cardIDs[0]===cardIDs[1]){
    alert('You must pick a different card');
    cardsPicked.pop();
    cardsChosenId.pop();
    cardIDs.pop();
    //"Gotcha 1"this piece of code prevents picking the same card as counting as a match, leaves the card face up, and allows user to pick another card
  } else if(optionOne ===optionTwo){
    cardsWon.push(cardsPicked);
    // alert('You got a match!');
    matches++
    guesses++
    scoreDisplay.innerText=`${matches} of ${(CARDS.length/2)}`;
    guessesNum.innerText=guesses;
    if(matches===CARDS.length/2){
      //this happens when you win the game;
      let finalTime=document.querySelector('#thisTime').innerText
      alert(`You Found All the Matches in ${finalTime} seconds`);
      confetti.start(3000); 
      let restartDiv=document.createElement('div');
      restartDiv.setAttribute('id', 'restart')
      scores.append(restartDiv)
      restartDiv.append(restartButton);
      matches=0;
      guesses=0;
      cardsPicked=[];
      cardsChosenId=[];
      cardIDs=[];
      cardsWon=[];
      
    }
    cardsPicked=[];
    cardsChosenId=[];
    cardIDs=[];
    
  } else{
    cardsPicked[0].setAttribute('src', '100px/question-mark.jpg');
    cardsPicked[1].setAttribute('src', '100px/question-mark.jpg');
    guesses++
    guessesNum.innerText=guesses;

    cardsPicked=[];
    cardsChosenId=[];
    cardIDs=[];
    
  }
  
}



function handleCardClick(event){
  if(cardsPicked.length<2){
    //this id statements prevents more than 2 picks at a time
    let cardId=event.target.getAttribute('data-name');
    let cardN=event.target.getAttribute('id');
    let theImage = event.target.getAttribute('data-img')
    cardIDs.push(cardN);
    console.log(cardIDs);
    cardsPicked.push(this);
    cardsChosenId.push(cardId);
    event.target.setAttribute('src', theImage);
    if (cardsPicked.length===2) {
    setTimeout(checkMatch, 1000)
    }

  }
}
