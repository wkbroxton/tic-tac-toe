const lookup = {
  'null': 'white',
  '1': 'purple',
  '-1': 'orange'
};

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/*----- app's state (variables) -----*/
let board;
let turn;
let winner;

/*----- cached element references -----*/
const squares = document.querySelectorAll('#board > div');
const message = document.querySelector('h1');
const button =  document.querySelector('button');

/*----- event listeners -----*/
document.querySelector('#board').addEventListener('click', handlePlay);
document.querySelector('button').addEventListener('click', init);

btnEL.addEventListener('click', init)

/*----- functions -----*/

init();

function init() {
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = null;
  render();
}

function render() {
  board.forEach(function(sq, idx) {
    squares[idx].style.background = lookup[sq];
  });
  if (winner === 'T') {
    message.innerHTML = `Snatching Defeat from the Jaws of Victory- Tied! Try Again!`;
  } else if (winner) {
    message.innerHTML = `Congrats ${lookup[winner].toUpperCase()}!`;
  } else {
    message.innerHTML = `${lookup[turn].toUpperCase()}'s Turn`;
  btnEL.style.visibility = winner ? 'visible' : 'hidden';
  }}

function handlePlay(evt) {
  const idx = parseInt(evt.target.id.replace('sq', ''));
  if (board[idx] || winner) return;
  board[idx] = turn;
  turn *= -1;
  winner = getWinner();
  render();
}

function getWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3) return board[winningCombos[i][0]];
  }
  if (board.includes(null)) return null;
  return 'T';
 }
