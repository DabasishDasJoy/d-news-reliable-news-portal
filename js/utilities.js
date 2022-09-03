const currentPage = window.location.pathname;
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    if(link.href.includes(`${currentPage}`)){
        link.classList.add('news-active');
    }
});