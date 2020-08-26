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

const battlegroundPlayer = document.querySelector('#ui-battleground-player');
const battlegroundComputer = document.querySelector('#ui-battleground-computer');
const playerIcons = getSiblings(battlegroundPlayer.firstChild, (el) => el.nodeName === 'svg');
const computerIcons = getSiblings(battlegroundComputer.firstChild, (el) => el.nodeName === 'svg');

const playerMoveDisplay = document.createElement('div');
const computerMoveDisplay = document.createElement('div');
const roundResultDisplay = document.createElement('p');
roundResultDisplay.classList.add('round-result-display');
const gameStatusDisplay = document.createElement('p');
gameStatusDisplay.classList.add('game-status-display');
resultsContainer.appendChild(roundResultDisplay);

battlegroundPlayer.appendChild(playerMoveDisplay);
battlegroundComputer.appendChild(computerMoveDisplay);

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
      playerIcons.forEach((icon) => hide(icon));
      computerIcons.forEach((icon) => hide(icon));

      displayPlayerMove();

      await new Promise(r => setTimeout(r, TIMEOUT));
      displayComputerMove();
      displayRoundResult();

      if (isGameOver()) {displayGameStatus();}

      function displayPlayerMove() {
        for (let icon of playerIcons) {
          if (icon.id === `icon-${playerMoveLatest()}-player`) {show(icon);}
        }
      }

      function displayComputerMove() {
        for (let icon of computerIcons) {
          if (icon.id === `icon-${computerMoveLatest()}-computer`) {show(icon);}
        }
      }

      function displayRoundResult() {
        roundResultDisplay.textContent = `You: ${score().player}\nComputer: ${score().computer}`;
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
    return `Tie!`;
  }

  function getWinMessage() {
    return `Victory!`;
  }

  function getLoseMessage() {
    return `Defeat!`;
  }
}

function tie() {
  return score().player === score().computer;
}

function win() {
  return score().player > score().computer;
}

// View-related functions
function hide(element) {
  console.log(`Hiding ${element}...\n`);
  element.classList.add('d-none');
}

function show(element) {
  console.log(`Showing ${element}...\n`);
  element.classList.remove('d-none');
}

function getSiblings(el, filter) {
  let result = [];
  el = el.parentNode.firstChild;
  do { if (!filter || filter(el)) result.push(el); } while (el = el.nextSibling);
  return result;
}
