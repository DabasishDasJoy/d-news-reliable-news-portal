const currentPage = window.location.pathname;
console.log(currentPage);
const navLinks = document.querySelectorAll('nav a');
const catagoryLinks = document.querySelectorAll('#categories-lists a');

navLinks.forEach(link => {
    if (link.href.includes(`${currentPage}`)) {
        link.classList.add('news-active');
    }
});



