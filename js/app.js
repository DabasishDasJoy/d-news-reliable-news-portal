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
            <a class=" news-text-secondary text-decoration-none" href="#" onclick="loadNewsOfCategory('${category.category_id}', '${category.category_name}')">${category.category_name}</a>
        `;
        categoriesLists.appendChild(list);
    });
}   

const loadNewsOfCategory = (categoryId, categoryName) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => displayNewsByCategory(data.data, categoryName))
        .catch(error => console.log(error))
}

const displayNewsByCategory = (newsList, categoryName) => {
    console.log(newsList);
    document.getElementById('news-by-category').classList.remove('d-none');
    document.getElementById('number-of-news').innerText = `${newsList.length ? `${newsList.length} items found for category ${categoryName}`: `No items found for category ${categoryName}!`}`;
    document.getElementById('news-view-by-category').classList.remove('d-none');
}

loadCategories();