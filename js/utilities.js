// ========get the current page====
const currentPage = window.location.pathname;
const navLinks = document.querySelectorAll('nav a');

// ============check if a link of all links have the current page path====
navLinks.forEach(link => {
    if (link.href.includes(`${currentPage}`)) {
        // --------Add the active class----
        link.classList.add('news-active');
    }
});

