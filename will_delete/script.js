document.addEventListener('DOMContentLoaded', function() {
	const modal = document.getElementById('teamModal');
	const teamLink = document.getElementById('teamLink');
	const closeButton = document.getElementById('closeModal');

	// Our Team Modal Open Function
	teamLink.addEventListener('click', function() {
		modal.classList.add('active');
		document.body.style.overflow = 'hidden';
	});

	// Our Team Modal Close Function
	function closeModal() {
		modal.classList.remove('active');
		document.body.style.overflow = 'auto';
	}

	// X Button Click Function
	closeButton.addEventListener('click', closeModal);

	// Outside of the Modal Click Function
	modal.addEventListener('click', function(e) {
		if (e.target === modal) {
			closeModal();
		}
	});

	// Close the Modal with Keyboard ESC Button Function
	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape') {
			closeModal();
		}
	});
});