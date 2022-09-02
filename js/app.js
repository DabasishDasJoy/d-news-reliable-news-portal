const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/news/categories")
        .then(response => response.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error))
}

const displayCategories = (categories) => {
    const categoriesLists = document.getElementById('categories-lists');

    categories.forEach(category => {
        const list = document.createElement('li');
        list.innerHTML = `
            <a class=" news-text-secondary text-decoration-none" href="#">${category.category_name}</a>
        `;
        categoriesLists.appendChild(list);
    });
}   

loadCategories();