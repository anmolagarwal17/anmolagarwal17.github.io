const input = document.getElementById('input');
const option = document.getElementById('option');
const error = document.getElementById('error');

const factsNumber = document.getElementById('facts-number');
const factsYear = document.getElementById('facts-year');
const factsDate = document.getElementById('facts-date');
const factsMaths = document.getElementById('facts-maths');

let optionValue = 'all';

option.addEventListener('input', () => {
	displayNothing();
	optionValue = option.value;

	if (optionValue === 'date') input.type = 'date';
	else input.type = 'number';

	input.value = '';
});

input.addEventListener('input', () => {
	displayNothing();
	if (input.value !== '') {
		if (optionValue == 'all') {
			getRandomFact(input.value + '/trivia', factsNumber);
			getRandomFact(input.value + '/year', factsYear);
			getRandomFact('1/' + input.value + '/date', factsDate);
			getRandomFact(input.value + '/math', factsMaths);
			factsNumber.style.display = 'block';
			factsYear.style.display = 'block';
			factsDate.style.display = 'block';
			factsMaths.style.display = 'block';
		} else if (optionValue == 'number') {
			getRandomFact(input.value + '/trivia', factsNumber);
			factsNumber.style.display = 'block';
		} else if (optionValue == 'year') {
			getRandomFact(input.value + '/year', factsYear);
			factsYear.style.display = 'block';
		} else if (optionValue == 'date') {
			const date = new Date(input.value);
			getRandomFact(
				`${date.getMonth() + 1}/${date.getDate()}/date`,
				factsDate
			);
			factsDate.style.display = 'block';
		} else if (optionValue == 'maths') {
			getRandomFact(input.value + '/math', factsMaths);
			factsMaths.style.display = 'block';
		}
	} else {
		// this seems stupid but covers some edge cases
        // example: try inserting only a decimal or 2 decimals after a number   
		input.value = '';
	}
});

function getRandomFact(query, element) {
	element.querySelector('.loading').style.display = 'inline-block';
	element.querySelector('.fact').textContent = '';
	// fetch(`http://numbersapi.com/${query}`)
	
	fetch(`https://numbersapi.p.rapidapi.com/${query}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "numbersapi.p.rapidapi.com",
		"x-rapidapi-key": "91c8f1bbdbmshccb0615880b4351p178048jsn42beaabe2aa6"
	}})
		.then((resp) => {
			// if response is anything other than ok then: -- else:
			if (resp.status != 200) {
				element.style.display = 'none';
				error.style.display = 'block';
			} else return resp.text();
		})
		.then((data) => {
			element.querySelector('.loading').style.display = 'none';
			element.querySelector('.fact').textContent = data;
		})
		.catch((err) => {
            displayNothing();
			error.style.display = 'block';
		});
}

function displayNothing() {
	factsNumber.querySelector('.fact').textContent = '';
	factsYear.querySelector('.fact').textContent = '';
	factsDate.querySelector('.fact').textContent = '';
	factsMaths.querySelector('.fact').textContent = '';

	error.style.display = 'none';
	factsNumber.style.display = 'none';
	factsYear.style.display = 'none';
	factsDate.style.display = 'none';
	factsMaths.style.display = 'none';
}

// Modal

// Get DOM Elements
const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('.a-close');

// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
    modal.style.display = 'block';
}

// Close
function closeModal() {
    modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}