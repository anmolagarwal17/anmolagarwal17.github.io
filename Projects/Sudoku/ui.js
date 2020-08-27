// init

// setting height of divs 1/9th of its parent element

var div = Array.from(document.querySelectorAll('.square .content > div'));
var h = div[0].parentElement.clientHeight / 3;

div.forEach((e) => (e.style.height = h + 'px'));

// set row height to 2*2/3 of column width
// or row height = column width/2

var height = document.getElementsByClassName('square')[0].clientWidth;

// document.getElementById('delete').style.gridTemplateRows = `auto ${height} ${height} !important`

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// make a init function that initialized everything
// like: mistakes: 0/3, hints: 0/3, time: 00:00 - alert after 45min that  you only have 15 mins left

// #score elements
const mistakesDisp = document.getElementById('mistakes');
const hintsDisp = document.getElementById('hints');
const timeDisp = document.getElementById('time');
const pauseBtn = document.getElementById('pause');

// #options elements
const newBtn = document.getElementById('new-btn');
const difficulty = document.getElementById('difficulty');
const retryBtn = document.getElementById('retry-btn');
const hintBtn = document.getElementById('hint-btn');
const eraseBtn = document.getElementById('erase-btn');

// sudoku variables
const sudokuSq = document.getElementsByClassName('square')[0];
const sudokuDiv = Array.from(
	document.querySelectorAll('.square .content > div > div')
);
let sudokuVal;
let sudokuUI;

// game status
let mistakes = 0;
let hints = 0;
let lost = document.getElementById('lost');
let won = document.getElementById('won');
// sudoku block
let focusedBlock;

// time
let startTime;
let timeUpdater;
let pausedTime;
let pauseTimeUpdater;

// difficulty
let difficultyLevel = 0;

// input keys
const numInput = Array.from(
	document.querySelectorAll('#input .content > div > div')
);

// setting row & column value in sudoku blocks
for (let i = 0; i < 9; i++) {
	for (let j = 0; j < 9; j++) {
		sudokuDivMatrix(i, j).setAttribute('r', i);
		sudokuDivMatrix(i, j).setAttribute('c', j);
	}
}

// new game and/or initialization logic
function newGame() {
	// setting things to default
	mistakesDisp.innerText = 'Mistakes: 0/3';
	hintsDisp.innerText = 'Hints: 0/3';
	pauseBtn.querySelector('div:nth-child(1)').classList.remove('disp-n');
	pauseBtn.querySelector('div:nth-child(2)').classList.add('disp-n');
	timeDisp.innerText = `Time: 00:00`;
	// if paused then unpause
	pausedTime = 0;
	sudokuSq.classList.remove('blur');
	focusedBlock = undefined;
	mistakes = 0;
	hints = 0;
	won.classList.add('disp-n');
	lost.classList.add('disp-n');

	// removing all classes from sudoku divs
	for (let i = 0; i < 9; i++)
		for (let j = 0; j < 9; j++) sudokuDivMatrix(i, j).className = '';

	// generate new sudoku
	sudokuVal = generateSudoku();
	sudokuUI = generateSudokuUI(difficultyLevel);

	// displaying values acc. to difficulty level
	for (let i = 0; i < 9; i++)
		for (let j = 0; j < 9; j++) {
			if (sudokuUI[i][j] === 'generated') {
				sudokuDivMatrix(i, j).innerText = sudokuVal[i][j];
			} else sudokuDivMatrix(i, j).innerText = '';
			sudokuDivMatrix(i, j).className = sudokuUI[i][j];
		}

	// time
	resetTime();
	clearInterval(timeUpdater);
	clearInterval(pauseTimeUpdater);
	timeUpdater = setInterval(() => {
		let currentTime = new Date();
		var timeDiff =
			Math.round((currentTime - startTime) / 1000) - pausedTime;
		var min = String(Math.floor(timeDiff / 60)).padStart(2, '0');
		var sec = String(timeDiff % 60).padStart(2, '0');
		timeDisp.innerText = `Time: ${min}:${sec}`;
	}, 1000);
}
newGame();

function pause() {
	pauseBtn.querySelector('div:nth-child(1)').classList.toggle('disp-n');
	pauseBtn.querySelector('div:nth-child(2)').classList.toggle('disp-n');
	highlight(9, 9, 0);
	if (focusedBlock) focusedBlock.classList.remove('selected');

	sudokuSq.classList.toggle('blur');

	// if currently not paused
	if (
		pauseBtn.querySelector('div:nth-child(1)').classList.contains('disp-n')
	) {
		clearInterval(pauseTimeUpdater);
		pauseTimeUpdater = setInterval(() => {
			pausedTime++;
		}, 1000);
	} else clearInterval(pauseTimeUpdater);
}

function retry() {
	for (let i = 0; i < 9; i++)
		for (let j = 0; j < 9; j++) {
			if (sudokuUI[i][j] === 'generated') {
				sudokuDivMatrix(i, j).innerText = sudokuVal[i][j];
			} else sudokuDivMatrix(i, j).innerText = '';
			sudokuDivMatrix(i, j).className = sudokuUI[i][j];
		}
	resetTime();
	won.classList.add('disp-n');
	lost.classList.add('disp-n');
	// if paused then unpause
	if (pauseBtn.querySelector('div:nth-child(1)').classList.contains('disp-n'))
		pauseBtn.click();
}

// called when a block is focused
function sudokuFocusedBlock(e) {
	if (focusedBlock) focusedBlock.classList.remove('selected');
	focusedBlock = e.target;
	focusedBlock.classList.add('selected');
	highlight(
		focusedBlock.getAttribute('r'),
		focusedBlock.getAttribute('c'),
		focusedBlock.innerText
	);
}

// highlight block if -
// * in the same row/column
// * have same value as selected element
function highlight(row, col, focusedNum) {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			let temp = sudokuDivMatrix(i, j);
			if (
				(sudokuVal[i][j] == focusedNum ||
					temp.innerText == focusedNum) &&
				(temp.classList.contains('generated') ||
					temp.classList.contains('user-input'))
			)
				temp.classList.add('highlighted');
			else if (i == row || j == col) temp.classList.add('highlighted');
			else {
				// console.log(`row${row} i${i} col${col} j${j}`);
				temp.classList.remove('highlighted');
				// focusedBlock.classList.remove('selected');
			}
		}
	}
}

function numberInput(e) {
	// if focusedBlock variable contains some div & its value is not auto generated
	if (focusedBlock && !focusedBlock.classList.contains('generated')) {
		focusedBlock.innerText = e.target.innerText;
		focusedBlock.classList.add('user-input');
		focusedBlock.click();
		checkError();
	}
}

function checkError() {
	let temp = focusedBlock.innerText;
	if (
		temp !=
		sudokuVal[focusedBlock.getAttribute('r')][
			focusedBlock.getAttribute('c')
		]
	) {
		mistakes++;
		focusedBlock.classList.add('error');
		mistakesDisp.innerText = `Mistakes: ${mistakes}/3`;
		if (mistakes == 3) {
			if (!pauseTimeUpdater)
				pauseTimeUpdater = setInterval(() => {
					pausedTime++;
				}, 1000);
			lost.classList.remove('disp-n');
		}
	} else focusedBlock.classList.remove('error');

	checkWon();
}

function checkWon() {
	let temp = true;
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (sudokuVal[i][j] != sudokuDivMatrix(i, j).innerText)
				temp = false;
		}
	}
	if (temp) {
		won.classList.remove('disp-n');
		clearInterval(pauseTimeUpdater);
		pauseTimeUpdater = setInterval(() => {
			pausedTime++;
		}, 1000);
	}
}

function keyPress(e) {
	// console.log(` ${e.code}`);
	let i;
	let j;
	if (focusedBlock) {
		switch (e.code) {
			case 'Numpad1':
			case 'Digit1':
				numInput[0].click();
				break;
			case 'Numpad2':
			case 'Digit2':
				numInput[1].click();
				break;
			case 'Numpad3':
			case 'Digit3':
				numInput[2].click();
				break;
			case 'Numpad4':
			case 'Digit4':
				numInput[3].click();
				break;
			case 'Numpad5':
			case 'Digit5':
				numInput[4].click();
				break;
			case 'Numpad6':
			case 'Digit6':
				numInput[5].click();
				break;
			case 'Numpad7':
			case 'Digit7':
				numInput[6].click();
				break;
			case 'Numpad8':
			case 'Digit8':
				numInput[7].click();
				break;
			case 'Numpad9':
			case 'Digit9':
				numInput[8].click();
				break;
			case 'ArrowDown':
			case 'KeyS':
				i = focusedBlock.getAttribute('r');
				j = focusedBlock.getAttribute('c');
				i = (i + 10) % 9;
				sudokuDivMatrix(i, j).click();
				break;
			case 'ArrowUp':
			case 'KeyW':
				i = focusedBlock.getAttribute('r');
				j = focusedBlock.getAttribute('c');
				i = (i + 8) % 9;
				sudokuDivMatrix(i, j).click();
				break;
			case 'ArrowRight':
			case 'KeyD':
				i = focusedBlock.getAttribute('r');
				j = focusedBlock.getAttribute('c');
				j = (j + 10) % 9;
				sudokuDivMatrix(i, j).click();
				break;
			case 'ArrowLeft':
			case 'KeyA':
				i = focusedBlock.getAttribute('r');
				j = focusedBlock.getAttribute('c');
				j = (j + 8) % 9;
				sudokuDivMatrix(i, j).click();
				break;
			case 'Backspace':
				erase();
			default:
				break;
		}
	} else {
		// switch (key) {
		// 	case value:
		// 		break;
		// 	default:
		// 		break;
		// }
	}
}

function erase() {
	if (!focusedBlock.classList.contains('generated')){
        focusedBlock.innerText = '';
        focusedBlock.classList.remove('user-input');
        focusedBlock.classList.remove('error');
    }
}

function getHint() {
	if (hints < 3) {
		if (focusedBlock) focusedBlock.classList.remove('selected');
		hints++;
		hintsDisp.innerText = `Hints: ${hints}/3`;
		if (hints == 3) hintBtn.style.cursor = 'not-allowed';
		while (true) {
			let i = Math.floor(Math.random() * 9);
			let j = Math.floor(Math.random() * 9);
			if (
				!sudokuDivMatrix(i, j).classList.contains('generated') &&
				!sudokuDivMatrix(i, j).classList.contains('user-input')
			) {
				focusedBlock = sudokuDivMatrix(i, j);
				focusedBlock.innerText = sudokuVal[i][j];
				focusedBlock.classList.add('user-input');
                focusedBlock.click()
				return;
			}
		}
	} else {
		hintBtn.style.cursor = 'not-allowed';
	}
}

// event listners

pauseBtn.addEventListener('click', pause);
newBtn.addEventListener('click', newGame);
sudokuDiv.forEach((el) => el.addEventListener('click', sudokuFocusedBlock));
difficulty.addEventListener('input', setDifficulty);
retryBtn.addEventListener('click', retry);
numInput.forEach((el) => el.addEventListener('click', numberInput));
document.addEventListener('keydown', keyPress);
hintBtn.addEventListener('click', getHint);
eraseBtn.addEventListener('click', erase);

// helper functions

function setDifficulty() {
	let opt;
	for (let i = 0, len = difficulty.options.length; i < len; i++) {
		opt = difficulty.options[i];
		if (opt.selected === true) break;
	}
	difficultyLevel = opt.value;
}

function sudokuDivMatrix(i, j) {
	let blockNo = Math.floor(i / 3) * 3 + Math.floor(j / 3);
	i %= 3;
	j %= 3;

	let k = blockNo * 9 + i * 3 + j;
	return sudokuDiv[k];
}

function resetTime() {
	startTime = new Date();
	pausedTime = 0;
}

// add event - click
// if clicked anywhere outside sudoku then unhighlight everything
