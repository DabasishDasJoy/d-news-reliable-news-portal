// ------------Load Categories data ------
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/news/categories")
        .then(response => response.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error))
}

// -------------Display the categories data on the top-----
const displayCategories = (categories) => {
    const categoriesLists = document.getElementById('categories-lists');

    // ----------after getting the categories show one category news as default first------
    loadHome(categories[categories.length - 1]);

    // --------------Show all the categories in list on top-------
    categories.forEach(category => {
        const list = document.createElement('li');
        list.innerHTML = `
            <a class="news-text-secondary text-decoration-none py-1 px-2 rounded-2" href="#" onclick="loadNewsOfCategory('${category.category_id}', '${category.category_name}')">${category.category_name}</a>
        `;
        categoriesLists.appendChild(list);
    });
}

// ------default data display---
const loadHome = (category) => {
    loadNewsOfCategory(category.category_id, "Home");
}

// -----------get target category's all news--------
const loadNewsOfCategory = (categoryId, categoryName) => {
    // --------start spinner-------
    toggleSpinner(true);

    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayNewsByCategory(data.data, categoryName))
        .catch(error => console.log(error))
}

// ----------------show target category's information in the top--------
const displayNewsByCategory = (newsList, categoryName) => {
    // ---------showing display news section---------
    document.getElementById('news-by-category').classList.remove('d-none');

    // ----------display number of news items found----------
    document.getElementById('number-of-news').innerText = `${newsList.length ? `${newsList.length} items found for category ${categoryName}` : `No items found for category ${categoryName}!`}`;

    // -------------display news viewing section---------
    displayAllNewsOfCategory(newsList.sort((a, b) => b.total_view - a.total_view));

    // ------stop spinner----------
    toggleSpinner(false);

    // ------------Sort by view--------
    const select = document.getElementById('sort-options');
    select.addEventListener('change', function (event) {
        // -----Sorting data and send on demand--------
        const view = event.target.value;
        if (view === 'd') {
            displayAllNewsOfCategory(newsList.sort((a, b) => b.total_view - a.total_view));
        }
        else {
            displayAllNewsOfCategory(newsList.sort((a, b) => a.total_view - b.total_view));
        }
    })
    // ------Changing to default selection-----
    select.value = 'd';
}


// -----------show all the news of the category in the website-------------
const displayAllNewsOfCategory = (newsList) => {

    const displayNewsContainer = document.getElementById('news-view-by-category');
    displayNewsContainer.classList.remove('d-none');

    // --------------remove previous data before showing new result--------
    displayNewsContainer.textContent = ``;

    // --------------display news-----------
    newsList.forEach(news => {
        const newsContainer = document.createElement('div');
        newsContainer.classList.add('col');
        newsContainer.innerHTML = `
            <div class="card h-100 flex-lg-row p-2" onclick="loadNewsDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#newDetailsModal">
                <img src="${news.thumbnail_url}" class="card-img news-image" alt="...">
                <div class="card-body d-flex flex-column justify-content-between py-4">
                    <div>
                        <h5 class="card-title fw-bold">${news.title}
                        </h5>
                        <p class="card-text text-secondary mt-3">${news.details.split(" ").length > 50 ? `${news.details.substr(0, news.details.indexOf(" ", 300))}...` : `${news.details}`}
                        </p>
                    </div>
                    <div class="row row-cols-4 mt-3">
                        <div class="col-lg-5 col-6 d-flex justify-content-start align-items-center">
                            <img src="${news.author.img}" class="rounded-circle img-fluid" alt="" style="width:60px; height:60px">
                            <div class="ms-3">
                                <p class="m-0 fw-bold">${news.author.name ? news.author.name : "No data found!"}</p>
                                <p class="text-muted m-0">${news.author.published_date ? news.author.published_date.split(" ")[0] : "No data found!"}</p>
                            </div>
                        </div>

                        <div class="col-lg-3 col-3 d-flex justify-content-md-center justify-content-start align-items-center">
                            <p class="m-0 text-secondary fw-bold"><i class="fa-regular fa-eye"></i> ${news.total_view ? news.total_view : "No data found!"}</p>
                        </div>

                        <div class="col-3 d-flex justify-content-md-center align-items-center">
                            <div>
                                <i class="fa-regular fa-star-half-stroke"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                        </div>
                        <div class="col-1 d-none d-md-flex justify-content-center align-items-center">
                            <button onclick="loadNewsDetails('${news._id}')" class="btn border-0 news-text-primary" data-bs-toggle="modal" data-bs-target="#newDetailsModal"><i
                            class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        displayNewsContainer.appendChild(newsContainer);
    });
}

// ----------get the news details by id------------
const loadNewsDetails = (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayNewsDetails(data.data[0]))
        .catch(error => console.log(error))
}


// --------------display news details in modal--------------
const displayNewsDetails = (details) => {
    // -----Show modal title---
    const newBody = document.getElementById('news-body');
    newBody.innerHTML = `
        <div class="h-100 d-flex flex-column p-2">
            <div class="text-center">
                <img src="${details.image_url}" class="card-img img-fluid" alt="..." style="width: auto; height:auto">
            </div>

            <div class="card-body d-flex flex-column justify-content-between py-4">
                <div>
                    <h5 class="card-title fw-bold">${details.title}
                    </h5>
                    <p class="card-text text-secondary mt-3"> ${details.details}}
                    </p>
                </div>
                
                    <div class="row row-cols-3 mt-4">
                        <div class="col-6 d-flex justify-content-start align-items-center">
                            <img src="${details.author.img}" class="rounded-circle img-fluid" alt="" style="width:60px; height:60px">
                            <div class="ms-3">
                                <p class="m-0 fw-bold">${details.author.name ? details.author.name : "No data found!"}</p>
                                <p class="text-muted m-0">${details.author.published_date ? details.author.published_date.split(" ")[0] : "No data found!"}</p>
                            </div>
                        </div>

                        <div class="col-3 d-flex justify-content-center align-items-center">
                            <p class="m-0 text-secondary fw-bold"><i class="fa-regular fa-eye"></i> ${details.total_view ? details.total_view : "No data found!"}</p>
                        </div>

                        <div class="col-3 d-flex justify-content-center align-items-center">
                            <div>
                                <i class="fa-regular fa-star-half-stroke"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                        </div>
                    </div>
                    
                
            </div>
        </div>
    `;
}

// ---------------spinner toggler-----------
const toggleSpinner = (isSpinning) => {
    if (isSpinning) {
        document.getElementById('spinner').classList.remove('d-none');
    }
    else {
        document.getElementById('spinner').classList.add('d-none');
    }
}

loadCategories();