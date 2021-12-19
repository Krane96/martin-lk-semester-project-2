export function navigationToggle () {   
    const toggleNavButton = document.querySelector('.toggle-button');
    const headerNav = document.querySelector('.navigation');
    const headerIcons = document.querySelector('.navigation-icons');
    const headerStyle = document.querySelector('.header');
    
    toggleNavButton.addEventListener('click', () => {
        headerNav.classList.toggle('active');
        headerIcons.classList.toggle('active');
        headerStyle.classList.toggle('active-header');
    });
    }