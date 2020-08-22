const home = document.getElementById('home');
const about = document.getElementById('about');
const projects = document.getElementById('projects');
const skills = document.getElementById('skills');
const education = document.getElementById('education');
const contact = document.getElementById('contact');
const navSecA = document.querySelectorAll('#nav-sec a');
const secs = [home, about, projects, skills, education, contact];
const quickActions = document.getElementById('quick-actions');
const hoverShowQuickActions = document.getElementById(
	'hover-show-quick-actions'
);
const form = document.getElementsByTagName('form')[0];
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
});
quickActions.addEventListener('mouseover', () => {
	quickActions.classList.remove('quick-actions-hidden');
});

var lastScrollTop = 0;
window.addEventListener('scroll', function () {
	// when the user is scrolling, hide the quick action toolbar
	// hide quick sections when out of home section
	// if (window.innerWidth > 864) {
	// 	if (window.scrollY > secHeights[0])
	// 		quickActions.classList.add('quick-actions-hidden');
	// 	else quickActions.classList.remove('quick-actions-hidden');
	// }
	// // hide quick sections when out of home section on smaller screens
	// // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
	// else {
	var st = window.pageYOffset || document.documentElement.scrollTop;
	if (st > lastScrollTop) {
		quickActions.classList.add('quick-actions-hidden');
	} else {
		quickActions.classList.remove('quick-actions-hidden');
	}
	lastScrollTop = st <= 0 ? 0 : st;
	// }
	// for nav selection animation

	let sum = secHeights[0] / 3;
	let i = 1;
	while (sum < window.scrollY) {
		sum += (2 * secHeights[i - 1]) / 3 + secHeights[i] / 3;
		i++;
	}
	i--;
	for (let j = 0; j < navSecA.length; j++) {
		navSecA[j].classList.remove('selected');
	}
	if (i < 6 && window.innerWidth > 864) {
		navSecA[i].classList.add('selected');
		// section title animation
		for (let j = 0; j < i + 1; j++) {
			secs[j].querySelector('svg').classList.add('logo');
		}
	} else if (window.innerWidth <= 864) {
		sum = (-3 * window.innerHeight) / 4;
		i = 0;
		while (sum < window.scrollY) {
			sum += secHeights[i];
			i++;
		}
		for (let j = 0; j < i && j < 6; j++) {
			secs[j].querySelector('svg').classList.add('logo');
			console.log(secs[j]);
		}
	}
});
// // if screen width is less than , equal to 864(breakpoint) then skip the reveal animation
// if (window.innerWidth <= 864) {
// 	for (let j = 0; j < secs.length; j++) {
// 		secs[j].querySelector('svg').classList.add('logo');
// 	}
// }

// textarea auto resize height code snippet
textarea = document.querySelector('#autoresizing');
textarea.addEventListener('input', autoResize, false);

function autoResize() {
	this.style.height = 'auto';
	this.style.height = this.scrollHeight + 'px';
}

// ! AJAX form submition using fetch

form.addEventListener('submit', (e) => {
	e.preventDefault();

	//	submittion/loading
	form.classList.add('disp-n');
	document.getElementById('form-sending').classList.remove('disp-n');

	const formData = new FormData(form);
	fetch(form.getAttribute('action'), {
		method: 'POST',
		headers: {
			Accept: 'application/x-www-form-urlencoded;charset=UTF-8',
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
		},
		body: new URLSearchParams(formData).toString(),
	})
		.then((res) => {
			// successful
			if (res) {
				form.classList.add('disp-n');
				document.getElementById('form-sending').classList.add('disp-n');
				document
					.getElementById('form-submitted')
					.classList.remove('disp-n');
			}
			// not successful
			else {
				form.classList.add('disp-n');
				document
					.getElementById('form-error')
					.classList.remove('disp-n');
			}
		})
		.catch((error) => {
			form.classList.add('disp-n');
			document.getElementById('form-error').classList.remove('disp-n');
			console.error(error);
		});
});

// view certificates/achievements

const closeBtn = document.querySelectorAll('.close');
const viewCert = document.querySelector('#view-cert');
const certM = document.querySelector('#viewing-cert');

// Events
viewCert.addEventListener('click', () => {
	certM.style.display = 'block';
});

closeBtn[0].addEventListener('click', () => {
	certM.style.display = 'none';
});

window.addEventListener('click', (e) => {
	if (e.target == certM)
		document.querySelector('#viewing-cert').style.display = 'none';
});

// Close If Outside Click
function outsideClick(e) {
	if (e.target == modal) {
		modal.style.display = 'none';
	}
}

const viewAchi = document.querySelector('#view-achi');
const certA = document.querySelector('#viewing-achi');

// Events
viewAchi.addEventListener('click', () => {
	certA.style.display = 'block';
});

closeBtn[1].addEventListener('click', () => {
	certA.style.display = 'none';
});

window.addEventListener('click', (e) => {
	if (e.target == certA) certA.style.display = 'none';
});

// theme changing logic

const theme = document.getElementById('theme');

theme.addEventListener('click', () => {
	document.body.classList.toggle('dark');
	document.querySelector('svg:nth-child(1)').classList.toggle('disp-n');
	document.querySelector('svg:nth-child(2)').classList.toggle('disp-n');
});

// implement project section expansion logic here

// responsive hamburger menu

const menu = document.getElementsByClassName('hamb')[0];
const navSec = document.getElementById('nav-sec');

menu.addEventListener('click', () => {
	navSec.classList.toggle('disp-nav');
});

document.body.addEventListener('click', (e) => {
	if (e.target.parentElement != menu) navSec.classList.remove('disp-nav');
});

