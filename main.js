const home = document.getElementById('home');
const about = document.getElementById('about');
const projects = document.getElementById('projects');
const skills = document.getElementById('skills');
const education = document.getElementById('education');
// const interests = document.getElementById('interests');
const contact = document.getElementById('contact');
const navSec = document.querySelectorAll('#nav-sec a');
const secs = [home, about, projects, skills, education, contact];
const quickActions = document.getElementById('quick-actions');
const hoverShowQuickActions = document.getElementById('hover-show-quick-actions');

const secHeights = [
	home.clientHeight,
	about.clientHeight,
	projects.clientHeight,
	skills.clientHeight,
	education.clientHeight,
	contact.clientHeight,
];

hoverShowQuickActions.addEventListener('mouseover', () => {
	quickActions.classList.remove('quick-actions-hidden');
})
quickActions.addEventListener('mouseover', () => {
	quickActions.classList.remove('quick-actions-hidden');
})


window.addEventListener('scroll', function () {
	
	// when the user is scrolling, hide the quick action toolbar
	// hide quick sections when out of home section
	if(window.scrollY > secHeights[0])
		quickActions.classList.add('quick-actions-hidden');

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
	// if on home section then show quick actions
	if(i == 0)
		quickActions.classList.remove('quick-actions-hidden');

	// section title animations
	
	sum = secHeights[0] / 3;
	i = 1;
	// when 1/4th of the next section is scrolled into the view then add logo class to it and every section above it also
	while (sum < window.scrollY) {
		sum += (2 * secHeights[i - 1]) / 3 + (1 * secHeights[i]) / 3;
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