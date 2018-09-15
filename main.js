let textArea = document.getElementById('textArea'),
    newGame  = document.getElementById('newGame'),
    hitBtn = document.getElementById('hitBtn'),
    stayBtn = document.getElementById('stayBtn');

let  suits = ['srce','pik','kocka','detelina'];
let  values = ['Jedan', 'Dva','Tri','Cetiri','Pet','Sest','Sedam','Osam','Devet','Deset', 'Zandar','Kraljica','Kralj'];

let gameStarted = false,
    gameOver = false,
    playerWon = false,
    playerCards = [],
    dealerCards = [],
    deck = [],
    playerScore = 0,
    dealerScore = 0;


hitBtn.style.display = 'none';
stayBtn.style.display = 'none';
showStatus();

 newGame.addEventListener('click',function () {
   gameStarted = true;
   gameOver = false;
   playerWon = false;

   deck = deckOfCards();
   shuffleCards(deck);
  playerCards = [getNextCard(),getNextCard()];
  dealerCards = [getNextCard(),getNextCard()];


   newGame.style.display = 'none';
   hitBtn.style.display = 'inline';
   stayBtn.style.display = 'inline';
   showStatus();
 });

hitBtn.addEventListener('click',function () {
 playerCards.push(getNextCard());
 checkForEnd();
  showStatus();
});

stayBtn.addEventListener('click',function () {
  gameOver = true;
  checkForEnd();
  showStatus();
});


function shuffleCards(deck) {
  for (let i = 0; i < deck.length; i++) {
    let shuffleIndex = Math.trunc(Math.random() * deck.length);
    let tmp = deck[shuffleIndex];
       deck[shuffleIndex] = deck[i];
       deck[i] = tmp;
  }
}

function deckOfCards() {
  let deck = [];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
      let card = {
        suit: suits[suitIndex],
        value:  values[valueIndex]
      };
      deck.push( card );
    }
  }
  return deck;
}

function getNextCard() {
  return deck.shift();
}

function getCardString(card) {
  return card.value + "  " + card.suit + "\n";
}

function getCardNumValue(card) {
  switch (card.value) {
    case 'Jedan':
      return 1;
      break;
    case 'Dva':
      return 2;
      break;
    case 'Tri':
      return 3;
      break;
    case 'Cetiri':
      return 4;
      break;
    case 'Pet':
      return 5;
      break;
    case 'Sest':
      return 6
      break;
    case 'Sedam':
      return 7;
      break;
    case 'Osam':
      return 8;
      break;
    case 'Devet':
      return 9;
      break;

    default:
      return 10;
  }
}

function getScore(cardArr) {
  let score = 0;
  let hasAce = false;

  for (let i = 0; i < cardArr.length; i++) {
    let card = cardArr[i];
    score += getCardNumValue(card);
    if (card.value === 'Jedan') {
      hasAce = true;
    }
  }

  if (hasAce && score + 10 <= 21) {
    return score + 10
  }
  return score;
}

function checkForEnd() {
  updateScore();

  if (gameOver) {
    while (dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
      dealerCards.push(getNextCard());
      updateScore();
    }
  }

  if (playerScore > 21) {
    gameOver = true;
    playerWon = false;
  }else if (dealerScore > 21) {
    gameOver = true;
    playerWon = true;
  }else if (gameOver) {
    if (playerScore > dealerScore) {
      playerWon = true;
    }else {
      playerWon  = false;
    }
  }
}

function updateScore() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

 function showStatus() {
   if (!gameStarted) {
     textArea.innerText ="Welcome to Blackjack!";
    return;
   }
// for (var i = 0; i < deck.length; i++) {
//   textArea.innerText = getCardString(deck[i])
// }

   let dealerString = '';
   for (let i = 0; i < dealerCards.length; i++) {
     dealerString += getCardString(dealerCards[i]) + '\n';
   }

   let playerString = '';
   for (let i = 0; i < playerCards.length; i++) {
     playerString += getCardString(playerCards[i]) + '\n';
   }

   updateScore();
   textArea.innerText = "Dilerove karte su: \n" + dealerString + "(rezultat: " + dealerScore + ")\n\n" + "Tvoje karte su: \n" +
   playerString + "(rezultat: " + playerScore + ")\n\n";

   if (gameOver) {
     if (playerWon) {
      textArea.innerText += "POBEDA!"
   }else {
     textArea.innerText += "Diler je pobedio!"
   }
   newGame.style.display = 'inline';
    hitBtn.style.display = 'none';
    stayBtn.style.display = 'none';
 }
}
