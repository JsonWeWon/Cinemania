document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        themeSwitch.checked = savedTheme === 'light-theme';
    } else {
        // Default to dark theme
        body.classList.add('dark-theme');
        themeSwitch.checked = false;
    }

    // Handle theme switch
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
    });
});
