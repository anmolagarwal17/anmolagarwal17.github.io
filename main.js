window.addEventListener('scroll', function () {
	var two = document.querySelector('#projects');
	if (
		window.scrollY +
			(Math.max(
				document.documentElement.clientHeight,
				window.innerHeight || 0
			) *
				3) /
				5 >
		two.offsetTop + two.offsetHeight
	) {
		console.log('You got it!');
	}
});
