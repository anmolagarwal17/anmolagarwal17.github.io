// init

// setting height of divs 1/9th of its parent element

var div = Array.from(document.querySelectorAll('.square .content > div'))
var h = div[0].parentElement.clientHeight/3

div.forEach(e => e.style.height = h+'px')

console.log(h)

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

function init(){
    mistakesDisp.innerText = 'Mistakes: 0/3';
    hintsDisp.innerText = 'Hints: 0/3';
    pauseBtn.querySelector('div:nth-child(1)').classList.remove('disp-n');
    pauseBtn.querySelector('div:nth-child(2)').classList.add('disp-n');
}
init();

function pause(){
    pauseBtn.querySelector('div:nth-child(1)').classList.toggle('disp-n');
    pauseBtn.querySelector('div:nth-child(2)').classList.toggle('disp-n');
}

function newGame(){
    // ! add new game code here
}



// event listners

pauseBtn.addEventListener('click', pause);
