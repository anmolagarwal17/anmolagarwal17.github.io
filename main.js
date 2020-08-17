const home = document.getElementById('home');
const about = document.getElementById('about');
const projects = document.getElementById('projects');
const skills = document.getElementById('skills');
const education = document.getElementById('education');
// const interests = document.getElementById('interests');
const contact = document.getElementById('contact');
const navSec = document.querySelectorAll('#nav-sec a');

// window.addEventListener('scroll', function () {
// 	var two = document.querySelector('#projects');
// 	if (
// 		window.scrollY +
// 			(Math.max(
// 				document.documentElement.clientHeight,
// 				window.innerHeight || 0
// 			) *
// 				3) /
// 				5 >
// 		two.offsetTop + two.offsetHeight
// 	) {
// 		console.log('You got it!');
// 	}
// });

const secHeights = [home.clientHeight, about.clientHeight, projects.clientHeight, skills.clientHeight, education.clientHeight, contact.clientHeight];

// for nav selection animation
window.addEventListener('scroll', function(){
	// let sum = window.innerHeight/2;
	let sum = 2*secHeights[0]/3;
	let i=1;
	while(sum < window.scrollY){
		sum += secHeights[i-1]/3 + 2*secHeights[i]/3;
		i++;
	}
	i--;
	for (let j = 0; j < navSec.length; j++) {
		navSec[j].classList.remove('selected');
	}
	navSec[i].classList.add('selected');
})

// textarea auto resize height code snippet
textarea = document.querySelector("#autoresizing"); 
textarea.addEventListener('input', autoResize, false); 

function autoResize() { 
	this.style.height = 'auto'; 
	this.style.height = this.scrollHeight + 'px'; 
} 