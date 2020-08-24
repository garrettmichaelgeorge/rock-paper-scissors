"use strict";

// Global variables
const OPTIONS = ['rock', 'paper', 'scissors']        

let scoreData = {
  player: 0,
  computer: 0,
};

let playerData = {
  name: "",
  score: 0, 
  moves: [],
};

let computerData = {
  name: "computer",
  score: 0,
  moves: [],
}

const buttons = document.querySelectorAll('button');

// Main program flow
playGameConsole();

function playGameConsole() {
  console.log(playGame());
}

function playGame() {
  for (let i = 0; i < 5; i++) {
    // PLAY ROUND
    let playerSelection;
    let computerSelection;

    // Get selections from player and computer
    updatePlayerMove(getNewPlayerMove());
    updateComputerMove(getNewComputerMove);

    // Update score
    setScore(roundResultFrom());

    // Display both selections
    console.log(playerSelection + ' ' + computerSelection);

    // Display updated score
    console.log(score());
  }

  // Show game results
  console.log(getGameOverMessage());

  function roundResultFrom(playerSelection, computerSelection) {
    return (isTieRound() ?
      'draw' :
      didPlayerWin(playerSelection, computerSelection) ?
        'player' :
        'computer');

    function isTieRound() {
      return playerSelection === computerSelection;
    }

    function didPlayerWin(playerSelection, computerSelection) {
      return (playerSelection === 'rock'     && computerSelection === 'scissors') ||
             (playerSelection === 'paper'    && computerSelection === 'rock')     ||
             (playerSelection === 'scissors' && computerSelection === 'paper')
    }

  }
}
// Queries
function player() {return playerData;}
function computer() {return computerData;}

function playerMoveLatest() {
  const count = player().moves.size();
  return playerMove(count - 1);
}

function playerMove(roundNumber) {
  return player().moves[roundNumber];
}

function computerMove(roundNumber) {
  return computer().moves[roundNumber];
}

function updatePlayerMove(newMove) {
  player().moves += newMove;
}

function updateComputerMove(newMove) {
  computer().moves += newMove;
}

function score() {
  return scoreData;
}

function setScore(roundWinner) {
  if (!['computer', 'player'].includes(roundWinner)) return;

  score[roundWinner]++;
}

// Player and computer move
function getNewComputerMove() {
  let i = Math.floor(Math.random() * 3);
  return OPTIONS[i];
}

function getNewPlayerMove() {
  let result = "";
  do {
    result = prompt(promptMessage()).toLowerCase();
  }
  while (!OPTIONS.includes(result));

  return result;

  function promptMessage() {return `Rock, paper, or scissors?`;}
}

function setPlayerMoveGUI() {
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // route button output to Player Selection
      return btn.id;
    })
  });
}

// Messages
function showRoundOverMessage(winner) {
  switch (winner) {
    case 'player':
      `You win! ${playerSelection} beats ${computerSelection}!`;
      break;
    case 'computer':
      `You lose! ${computerSelection} beats ${playerSelection}!`;
      break;
    default:
      "It's a draw!";
      break;
  }
}

function getGameOverMessage() {
  return tie() ?
    getTieMessage() :
    win() ?
      getWinMessage() :
      getLoseMessage();

  function getTieMessage() {
    return `Tie!!! ${score().player} to ${score().computer}`;
  }

  function getWinMessage() {
    return `Victory!!! ${score().player} to ${score().computer}`;
  }

  function getLoseMessage() {
    return `Defeat!!! ${score().player} to ${score().computer}`;
  }
}

function tie() {
  return score().player === score().computer;
}

function win() {
  return score().player > score().computer;
}

