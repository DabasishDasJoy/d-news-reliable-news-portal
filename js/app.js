const loadCategories = () => {
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
    newsList.sort((a,b)=> b.total_view - a.total_view);
    document.getElementById('news-by-category').classList.remove('d-none');
    document.getElementById('number-of-news').innerText = `${newsList.length ? `${newsList.length} items found for category ${categoryName}` : `No items found for category ${categoryName}!`}`;
    const displayNewsContainer = document.getElementById('news-view-by-category');
    displayNewsContainer.classList.remove('d-none');
    displayNewsContainer.textContent = ``;
    newsList.forEach(news => {
        const newsContainer = document.createElement('div');
        newsContainer.classList.add('col');
        newsContainer.innerHTML = `
            <div class="card h-100 flex-md-row p-2">
                <img src="${news.thumbnail_url}" class="card-img news-image" alt="...">
                <div class="card-body d-flex flex-column justify-content-between py-4">
                    <div>
                        <h5 class="card-title fw-bold">${news.title}
                        </h5>
                        <p class="card-text text-secondary mt-3">${news.details.split(" ").length > 50 ? `${news.details.substr(0, news.details.indexOf(" ", 300))}...` : `${news.details}`}
                        </p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex justify-content-center align-items-center">
                            <img src="${news.author.img}" class="rounded-pill img-fluid" alt="" style="width:60px; height:60px">
                            <div class="ms-3">
                                <p class="m-0">${news.author.name ? news.author.name : "No data found!"}</p>
                                <p class="text-muted m-0">${news.author.published_date ? news.author.published_date: "No data found!"}</p>
                            </div>
                        </div>
                        <div class="d-flex align-items-center">
                            <p class="m-0 text-secondary fw-bold"><i class="fa-regular fa-eye"></i> ${news.total_view ? news.total_view : "No data found!"}</p>
                        </div>
                        <div>
                            <i class="fa-regular fa-star-half-stroke"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <button onclick="" class="btn border-0 news-text-primary"><i
                                class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
        `;

        displayNewsContainer.appendChild(newsContainer);
    });
}

loadCategories();