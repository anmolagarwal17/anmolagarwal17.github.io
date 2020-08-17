const home = document.getElementById('home');
const about = document.getElementById('about');
const projects = document.getElementById('projects');
const skills = document.getElementById('skills');
const education = document.getElementById('education');
// const interests = document.getElementById('interests');
const contact = document.getElementById('contact');
const navSec = document.querySelectorAll('#nav-sec a');
const secs = [home, about, projects, skills, education, contact];

const secHeights = [
	home.clientHeight,
	about.clientHeight,
	projects.clientHeight,
	skills.clientHeight,
	education.clientHeight,
	contact.clientHeight,
];

window.addEventListener('scroll', function () {

	// for nav selection animation

	let sum = (2 * secHeights[0]) / 3;
	let i = 1;
	while (sum < window.scrollY) {
		sum += secHeights[i - 1] / 3 + (2 * secHeights[i]) / 3;
		i++;
	}
	i--;
	for (let j = 0; j < navSec.length; j++) {
		navSec[j].classList.remove('selected');
	}
	navSec[i].classList.add('selected');

	// section title animations
	sum = secHeights[0] / 4;
	i = 1;
	// when 1/4th of the next section is scrolled into the view then add logo class to it and every section above it also
	while (sum < window.scrollY) {
		sum += (3 * secHeights[i - 1]) / 4 + (1 * secHeights[i]) / 4;
		i++;
	}
	for (let j = 0; j < i; j++) {
		secs[j].querySelector('svg').classList.add('logo');
	}
});

// textarea auto resize height code snippet
textarea = document.querySelector('#autoresizing');
textarea.addEventListener('input', autoResize, false);

function autoResize() {
	this.style.height = 'auto';
	this.style.height = this.scrollHeight + 'px';
}

const navTog = document.querySelectorAll('#nav-tog img');
document.addEventListener("click", () =>{
	
	navTog[0].classList.toggle('nav-minimized');
	navTog[0].classList.toggle('nav-maximized');
	setTimeout(()=>{
		navTog[1].classList.toggle('nav-minimized');
		navTog[1].classList.toggle('nav-maximized');
	}, 100);setTimeout(()=>{
		navTog[2].classList.toggle('nav-minimized');
		navTog[2].classList.toggle('nav-maximized');
	}, 200);
	
	
})