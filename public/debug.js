console.log('Debug script loaded');
window.addEventListener('load', () => {
    console.log('Window loaded');
    console.log('React root:', document.getElementById('root'));
    console.log('Dark mode toggle:', document.querySelector('.dark-mode-toggle'));
    console.log('Debug panel:', document.querySelector('.debug-panel'));
    console.log('Dark mode state:', localStorage.getItem('darkMode'));
    console.log('HTML classes:', document.documentElement.className);
});
