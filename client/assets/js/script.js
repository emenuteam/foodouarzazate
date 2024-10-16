let URL_API = 'http://localhost:8000'; // Adjust the URL to your Laravel app
let menu = [];
let basket = JSON.parse(localStorage.getItem('basket')) || [];

async function fetchMeals() {
    try {
        const response = await fetch(`${URL_API}/api/allmeals`); // Adjust the URL to your Laravel app
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        menumeals = await response.json();
        menu = menumeals.filter(item => item.availability === 1);

        console.log("menu", menu);

        // After fetching meals, render the categories and meals
        appendCategories();
        showMenuItems();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchMeals();
});

const mealSection = document.getElementById('meal-section');

// Function to append categories
function appendCategories() {
    const categories = menu.map(meal => meal.category);
    const uniqueCategories = [...new Set(categories)];

    uniqueCategories.forEach(category => {
        const li = document.createElement('li');
        li.textContent = capitalizeAndUppercaseSecond(category);
        li.setAttribute('data-category', category);
        document.getElementById('filters_menu').appendChild(li);
    });

    // Now bind the filter event after categories are created
    $('.filters_menu li').click(function () {
        $('.filters_menu li').removeClass('active');
        $(this).addClass('active');

        const category = $(this).data('category');

        // clear the menu
        $('#meal-section').empty();

        if (category == "All" || category == undefined) {
            showMenuItems();
            return;
        }

        const categoryFood = menu.filter(food => food.category === category);
        console.log(categoryFood);

        // append the new menu
        categoryFood.forEach((food, index) => {
            createNewMenuItem(food, index);
        });
    });
}

// Append meals to the menu section
const showMenuItems = () => {
    menu.forEach((meal, index) => {
        createNewMenuItem(meal, index);
    });
};

const createNewMenuItem = (meal, index) => {
    const existingItem = basket.find(item => item.name === meal.name);

    const mealDiv = document.createElement('div');
    mealDiv.classList.add('meal', 'd-flex', 'flex-column', 'justify-content-between', 'align-items-center', 'gap-2');

    if (existingItem) {
        mealDiv.classList.add('active');
    }

    let image_path = './images/' + meal.category.split('_').join('').toUpperCase() + '/' + meal.image;
    mealDiv.innerHTML = `
        <div class="">
            <img src="${URL_API}/storage/${meal.image}" alt="${meal.name}" class="">
        </div>
        <div class="">
            <h5 class="card-title">${meal.name}</h5>
        </div>
        <div class="btn-group btn_add_to_basket" onclick="addToBasket('${meal.name}', ${meal.price}, '${meal.image}', event)">
            <button class="btn btn-outline-warning btn-icon"><i class="fas fa-shopping-cart"></i></button>
            <button type="button" class="btn btn-outline-secondary btn-price">${meal.price} DH</button>
        </div>
    `;

    if (existingItem) {
        mealDiv.querySelector('.btn-group').classList.add('active');
        mealDiv.querySelector('.btn-group .btn-icon i').classList.remove('fas', 'fa-shopping-cart');
        mealDiv.querySelector('.btn-group .btn-icon i').classList.add('bi', 'bi-trash3-fill');
    }else{
        mealDiv.querySelector('.btn-group').classList.remove('active');
        mealDiv.querySelector('.btn-group .btn-icon i').classList.add('fas', 'fa-shopping-cart');
        mealDiv.querySelector('.btn-group .btn-icon i').classList.remove('bi', 'bi-trash3-fill');
    }

    mealDiv.style.transform = 'translateY(-200px)';
    mealDiv.style.opacity = 0;
    mealDiv.style.margin = '10px 0';

    mealSection.appendChild(mealDiv);

    // Apply animation with GSAP
    gsap.to(mealDiv, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
        delay: index * 0.1
    });
};

// Capitalize and format category names
function capitalizeAndUppercaseSecond(word) {
    let words = word.split('_');
    words = words.map((w, index) => {
        if (index === 1) {
            return w.toUpperCase();
        }
        return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    });
    return words.join(' ');
}

// Add item to the basket
function addToBasket(name, price, image, e) {
    const existingItem = basket.find(item => item.name === name);
    const btnGroup = e.currentTarget;
    const iconElement = btnGroup.querySelector('i');

    if (!existingItem) {
        basket.push({ name, price, quantity: 1, image });
        btnGroup.classList.add('active');
        btnGroup.parentElement.classList.add('active');
        iconElement.classList.remove('fas', 'fa-shopping-cart');
        iconElement.classList.add('bi', 'bi-trash3-fill');

    } else {
        basket = basket.filter(item => item.name !== name);
        btnGroup.classList.remove('active');
        btnGroup.parentElement.classList.remove('active');
        iconElement.classList.remove('bi', 'bi-trash3-fill');
        iconElement.classList.add('fas', 'fa-shopping-cart');
    }

    localStorage.setItem('basket', JSON.stringify(basket));

    // Update basket badge
    const badge = document.getElementById('basket-badge');
    if (basket.length === 0) {
        badge.classList.add('d-none');
    } else {
        badge.classList.remove('d-none');
    }
    badge.textContent = basket.length;
}
