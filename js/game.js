"use strict";

// Global variables
const OPTIONS = ['rock', 'paper', 'scissors']        ;
const ROUNDS = 5;
const TIMEOUT = 1000;

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


// HTML
const buttons = document.querySelectorAll('button');
const resultsContainer = document.querySelector('#results');
const iconScissors = document.querySelector('.icon-scissors')
const iconRock = document.querySelector('.icon-rock')
const iconPaper = document.querySelector('.icon-paper')

const playerMoveDisplay = document.createElement('p');
const computerMoveDisplay = document.createElement('p');
const roundResultDisplay = document.createElement('p');
const gameStatusDisplay = document.createElement('p');
resultsContainer.appendChild(roundResultDisplay);

[playerMoveDisplay, computerMoveDisplay].forEach((element) => {
  resultsContainer.appendChild(element);
})

[roundResultDisplay, gameStatusDisplay].forEach((element) => {
  resultsContainer.appendChild(element);
})

// Main program flow
playGame();

function playGame() {
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      playRound(btn.id);
    });
  });


  function playRound(playerInput) {
    // PLAY ROUND
    updateMoves();
    setScore(roundResultFrom(playerMoveLatest(), computerMoveLatest()));
    updateDisplay();

    function updateMoves() {
      updatePlayerMove(playerInput);
      updateComputerMove(getNewComputerMove());
    }

    function roundResultFrom(playerSelection, computerSelection) {
      return (isTieRound() ?
        'draw' :
        didPlayerWinRound(playerSelection, computerSelection) ?
        'player' :
        'computer');

      function isTieRound() {
        return playerSelection === computerSelection;
      }

      function didPlayerWinRound(playerSelection, computerSelection) {
        return (playerSelection === 'rock'     && computerSelection === 'scissors') ||
          (playerSelection === 'paper'    && computerSelection === 'rock')     ||
          (playerSelection === 'scissors' && computerSelection === 'paper')
      }
    }

    async function updateDisplay() {
      displayPlayerMove();
      computerMoveDisplay.textContent = ``;
      roundResultDisplay.textContent = ``;

      await new Promise(r => setTimeout(r, TIMEOUT));
      displayComputerMove();
      await new Promise(r => setTimeout(r, TIMEOUT));
      displayRoundResult();

      if (isGameOver()) {displayGameStatus();}

      function displayPlayerMove() {
        playerMoveDisplay.textContent = `Your move: ${playerMoveLatest()}`;
      }

      function displayComputerMove() {
        computerMoveDisplay.textContent = `Opponent's move: ${computerMoveLatest()}`;
      }

      function displayRoundResult() {
        roundResultDisplay.textContent = Object.entries(score()).reduce((content, current, index, array) => content + '\n' + current.join(': '), '');
      }

      function isGameOver() {
        return player().moves.length >= ROUNDS;
      }

      function displayGameStatus() {
        gameStatusDisplay.textContent = getGameOverMessage();
      }
    }
  }

}

// Queries
function player() {return playerData;}
function computer() {return computerData;}

function playerMoveLatest() {
  const count = player().moves.length;
  return playerMove(count - 1);
}

function computerMoveLatest() {
  const count = computer().moves.length;
  return computerMove(count - 1);
}

function playerMove(index) {
  return player().moves[index];
}

function computerMove(index) {
  return computer().moves[index];
}

function updatePlayerMove(newMove) {
  player().moves.push(newMove);
}

function updateComputerMove(newMove) {
  computer().moves.push(newMove);
}

function score() {return scoreData;}

function setScore(roundWinner) {
  if (!['computer', 'player'].includes(roundWinner)) return;

  scoreData[roundWinner] += 1;
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

