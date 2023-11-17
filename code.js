window.onload = function() {

  setBoard();

}

function setBoard() {
  const playButton = document.getElementById('play-game');
  playButton.addEventListener('click', startGame);

  const gameGrid = document.getElementById('grid');

  for(let i = 0; i < 9; i++) {
    
    const loc = document.createElement('div');
    gameGrid.appendChild(loc);
    loc.className = 'loc';
    loc.id = 'loc ' + i;
    loc.addEventListener('click', placeMove);

  }


  

}

function startGame() {
  document.getElementById("play-game").style.display = "none";
  document.getElementById("grid").style.display = "grid";
}

function checkForWin(movLoc) {

  let sum = 0;

  console.log("function entered");

  //For loop below checks all horizontals for a win

  for(let i = 0; i < 3; i++) {

    /*jStart indicates the leftmost row numbers and it will equal
      0 for the top row, then 3 for the middle row, and finally 6 for
      the bottom row*/

    let jStart = i * 3;

    for(let j = jStart; j < jStart + 3; j++) {

      sum += gameBoard[j];

    }

    if (sum === 0 || sum === 3) return true;
    
    sum = 0;
  }

  console.log('Sum is ' + sum);

  //For loop below checks all verticals for a win

  for(let i = 0; i < 3; i++) {

    /*Here jStart is equal to the column numbers which are
      0 for the leftmost column, 1 for the middle column, and
      2 for the rightmost column. These numbers also correspond with our
      i values so we can just make jStart equal to i*/

    let jStart = i;

    for(let j = jStart; j < jStart + 7; j += 3) {

      sum += gameBoard[j];

    }

    if (sum === 0 || sum === 3) return true;

    sum = 0;

  }

  /*Checks the diagaonals that correspond to location numbers
    0, 4, 8 */

  for(let i = 0; i < 9; i += 4) {
    sum += gameBoard[i];
  }

  if (sum === 0 || sum === 3) return true;

  sum = 0;

  /*Checks the diagonals that correspond to location numbers 2, 4, 6*/

  for(let i = 2; i < 7; i +=2) {
    sum += gameBoard[i];
  }

  if (sum === 0 || sum === 3) return true;

  sum = 0;

}

function displayTieMessage() {
  
  document.getElementById("tie-message").style.display = "block";

}

function displayWinMessage(pId) {
  gameActive = false;

 document.getElementById("p" + pId + "-win-message").style.display = "block";
}

function resetGame() {

  for(let i = 0; i < 9; i++) gameBoard[i] = 9;

  numMoves = 0;

  gameActive = true;

  playerOneTurn = true;

  winVal = false;

  document.getElementById("p1-win-message").style.display = "none";
  document.getElementById("p2-win-message").style.display = "none";
  document.getElementById("play-again").style.display = "none";
  document.getElementById("tie-message").style.display = "none";

  for(let i = 0; i < 9; i++) {

    const curLoc = document.getElementById('loc ' + i);
    const movImage = curLoc.firstChild;

    if(movImage) curLoc.removeChild(movImage);

  }

  console.log("line reached");

}

function placeMove() {    //This function is entered after the player clicks on a div/square

  const movLoc = Number(this.id[4]);

  /*conditional below checks to make sure the player clicked a valid square
    
    A valid square being one that is empty
    
    If the player clicked a square that is not empty, the function will be exited, and hence nothing
    will happen*/

  if (!gameActive || gameBoard[movLoc] !== 9) return;

  /*The next conditional checks to see which player's turn it is. By default 'playerOneTurn'
    is set to true*/

  if(playerOneTurn) {

    /*Player 1 gets the integer 0 placed in the gameboard.
      It will be placed in the corresponding move location*/

    gameBoard[movLoc] = 0;

    /*Code below makes the O visible when player 1 clicks a valid square*/
    
    const movImage = new Image(100, 100)
    movImage.src = 'Images/O.png';    
    this.appendChild(movImage);

    numMoves++;

    /*A win in tic tac toe is only possible after 5 moves have taken place,
      Hence we only check for moves once that has happened */

    if(numMoves >= 5) winVal = checkForWin(movLoc);

    /*Once a player wins, 'gameActive' is set to false that way a player can't
      keep clicking slots and having game pieces appear*/

    if(winVal === true) {

      displayWinMessage(1);

      document.getElementById('play-again').style.display = "block";

      p1Wins++;

      document.getElementById('p1-wins').innerHTML = "Player One Wins: " + p1Wins;

      return;
      
    }

    /*After player one's turn we can set the boolean 'playerOneTurn' to false
      to indicate that is now player two's turn*/

    if(numMoves === 9 ) { 

      displayTieMessage();

      document.getElementById('play-again').style.display = "block";
    }

    playerOneTurn = false;
  }

  //If it is not player one's turn, then the conditional below is entered

  else {

  /*Player 2 gets the integer 1 placed in the gameboard.
  It will be placed in the corresponding move location*/

    gameBoard[movLoc] = 1;

  /*Code below makes the 'X' visible when player 2 clicks a valid square*/

    const movImage = new Image(100, 100)
    movImage.src = 'Images/X.png';

    this.appendChild(movImage);

    numMoves++;

    if(numMoves >= 5) winVal = checkForWin(movLoc);

    if(winVal === true) {
     
      displayWinMessage(2);

      document.getElementById('play-again').style.display = "block";

      p2Wins++;

      document.getElementById('p2-wins').innerHTML = 'Player Two Wins: ' + p2Wins;

      return;
    }

    if(numMoves === 9 ) { 

      displayTieMessage();

      document.getElementById('play-again').style.display = "block";
    }

    playerOneTurn = true;
  }
}

//Variable below is used to check if the game is active

let gameActive = true;

let playerOneTurn = true;

let winVal = false;

//Variable below keeps track of the amount of moves that have taken place

let numMoves = 0;

/*Code below shows the gameBoard in its default state. 
  Having a 9 in a slot indicates that the slot is empty*/

let gameBoard = [ 9, 9, 9, 9, 9, 9, 9, 9, 9 ]; 

let p1Wins = 0;

let p2Wins = 0;
