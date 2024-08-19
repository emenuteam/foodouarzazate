
const menu = [
    { name: "Shawarma Normal", price: "25", category: "shawarma", image: "1.jpg" },
    { name: "Shawarma Fromage", price: "30", category: "shawarma", image: "2.jpg" },
    { name: "Tacos Shawarma", price: "35", category: "shawarma", image: "3.jpg" },
    { name: "Shawarma XL", price: "60", category: "shawarma", image: "4.jpg" },
    { name: "Plat Shawarma", price: "35", category: "shawarma", image: "5.jpg" },
    { name: "Salad Shawarma", price: "35", category: "shawarma", image: "6.jpg" },
    { name: "Shawarma Special", price: "45", category: "shawarma", image: "7.jpg" },
    { name: "0.5Kg Shawarma", price: "80", category: "shawarma", image: "8.jpg" },
    { name: "1kg Shawarma", price: "160", category: "shawarma", image: "9.jpg" },

    { name: "Tacos Cordon Bleu", price: "35", category: "tacos", image: "1.jpg" },
    { name: "Tacos Viande Hachée", price: "35", category: "tacos", image: "2.jpg" },
    { name: "Tacos Saussice", price: "30", category: "tacos", image: "3.jpg" },
    { name: "Tacos Gratiné", price: "50", category: "tacos", image: "4.jpg" },
    { name: "Tacos Special", price: "40", category: "tacos", image: "5.png" },
    { name: "Tacos Nuggets", price: "30", category: "tacos", image: "6.png" },
    { name: "Tacos Mix", price: "35", category: "tacos", image: "7.png" },
    { name: "Tacos Dinde", price: "30", category: "tacos", image: "8.jpg" },


    { name: "Tacos Dinde XL", category: "tacos_xl", image: "1.jpg", price: "50" },
    { name: "Tacos Viande Hachée XL", category: "tacos_xl", image: "2.jpg", price: "60" },
    { name: "Tacos Mix XL", category: "tacos_xl", image: "3.jpeg", price: "60" },
    { name: "Tacos Nuggets XL", category: "tacos_xl", image: "4.png", price: "50" },
    { name: "Tacos Cordon Bleu XL", category: "tacos_xl", image: "5.jpg", price: "60" },
    { name: "Tacos Special XL", category: "tacos_xl", image: "6.jpg", price: "70" },
    { name: "Tacos Sauccice XL", category: "tacos_xl", image: "7.jpg", price: "50" },

    { name: "Cheese Burger", price: "35", category: "burger", image: "1.jpeg" },
    { name: "Double Burger", price: "60", category: "burger", image: "2.jpg" },
    { name: "Chicken Burger", price: "35", category: "burger", image: "3.jpg" },
    { name: "Double Chicken Burger", price: "60", category: "burger", image: "4.webp" },
    { name: "Burger Cordon Bleu", price: "35", category: "burger", image: "5.jpeg" },
    { name: "Double Cordon Burger", price: "60", category: "burger", image: "6.jpeg" },

    { name: "Burrito Dinde", price: "20", category: "burrito", image: "1.jpg" },
    { name: "Burrito Mix", price: "25", category: "burrito", image: "2.jpg" },
    { name: "Burrito Viande Hachée", price: "25", category: "burrito", image: "3.jpg" },
    { name: "Burrito Nuggets", price: "20", category: "burrito", image: "4.jpeg" },
    { name: "Burrito Cordon Bleu", price: "25", category: "burrito", image: "5.jpg" },
    { name: "Burrito Special", price: "25", category: "burrito", image: "6.jpg" },
    { name: "Burrito Saussice", price: "20", category: "burrito", image: "7.webp" },

    { name: "Burrito Viande Hachée XL", price: "40", category: "burrito_xl", image: "1.jpeg" },
    { name: "Burrito Dinde XL", price: "35", category: "burrito_xl", image: "2.jpeg" },
    { name: "Burrito Mix XL", price: "50", category: "burrito_xl", image: "3.webp" },
    { name: "Burrito Nuggets XL", price: "35", category: "burrito_xl", image: "4.jpg" },
    { name: "Burrito Saussice XL", price: "35", category: "burrito_xl", image: "5.webp" },
    { name: "Burrito Cordon Bleu XL", price: "35", category: "burrito_xl", image: "6.jpeg" },
    { name: "Burrito Special XL", price: "60", category: "burrito_xl", image: "7.png" },


    { name: "Nuggets Pack 6", price: "30", category: "nugget", image: "1.jpeg" },
    { name: "Nuggets Pack 9", price: "40", category: "nugget", image: "2.jpg" },
    { name: "Nuggets Pack 12", price: "60", category: "nugget", image: "3.jpg" },

    { name: "Pepsi", price: "5", category: "beverage", image: "1.jpg" },
    { name: "7up", price: "5", category: "beverage", image: "2.webp" },
    { name: "Tropical", price: "6", category: "beverage", image: "3.webp" },
    { name: "Orange", price: "5", category: "beverage", image: "4.webp" },
    { name: "Citron", price: "5", category: "beverage", image: "5.webp" },
    { name: "Aquafina", price: "5", category: "beverage", image: "6.jpeg" },

];

// get the menu section
const mealSection = document.getElementById('meal-section');
let basket = JSON.parse(localStorage.getItem('basket')) || [];

$(() => {
    // the menu_filter
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
        categoryFood.forEach(food => {
            createNewMenuItem(food);
        });


    });

    // handle the basket button click event to redirect to the basket page
    document.getElementById('basket-button').addEventListener('click', (e) => {

        window.location.href = 'basket.html';
    });

});

/* -------------------- for formatting the category names ------------------- */
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


const createNewMenuItem = (meal) => {
    // check if the meal is already in the basket
    const existingItem = basket.find(item => item.name === meal.name);
    
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('meal', 'd-flex', 'flex-column', 'justify-content-between', 'align-items-center', 'gap-2');
    
    if (existingItem) {
        mealDiv.classList.add('active');
    }

    let image_path = './images/' + meal.category.split('_').join('').toUpperCase() + '/' + meal.image;
    mealDiv.innerHTML = `
                <div class="">
                    <img src="${image_path}" alt="${meal.name}" class="">
                </div>
                <div class="">
                    <h5 class="card-title">${meal.name}</h5>
                </div>
                <div class="btn-group btn_add_to_basket" onclick="addToBasket('${meal.name}', ${meal.price}, '${image_path}', event)">
                    <button class="btn btn-outline-warning btn-icon"><i class="fas fa-shopping-cart"></i></button>
                    <button type="button" class="btn btn-outline-secondary btn-price">${meal.price} DH</button>
                </div>
            `;
    // create the meal div
    if (existingItem) {
        mealDiv.querySelector('.btn-group').classList.add('active');
    }
    mealSection.appendChild(mealDiv);
};

// Beef, Chicken, Dessert, Lamb, Pasta, Pork, Seafood, Side, Starter, Vegan, Vegetarian

// append categories
const categories = menu.map(meal => meal.category);
const uniqueCategories = [...new Set(categories)];

uniqueCategories.forEach(category => {

    const li = document.createElement('li');
    li.textContent = capitalizeAndUppercaseSecond(category);
    li.setAttribute('data-category', category);
    document.getElementById('filters_menu').appendChild(li);
});

// append meals
const showMenuItems = () => {
    menu.forEach(meal => {
        createNewMenuItem(meal);
    });
};

// show menu items
showMenuItems();


function addToBasket(name, price, image, e) {
    // log
    const existingItem = basket.find(item => item.name === name);
    const btnGroup = e.currentTarget;
    console.log(btnGroup.parent);
    

    if (!existingItem) {
        // existingItem.quantity++;
        basket.push({ name, price, quantity: 1, image });
    
        // add the active class to the basket button parent
        btnGroup.classList.add('active');
        btnGroup.parentElement.classList.add('active');
    }else {
        basket = basket.filter(item => item.name !== name);
        // remove the active class to the basket button parent
        btnGroup.classList.remove('active');
        btnGroup.parentElement.classList.remove('active');
    }

    localStorage.setItem('basket', JSON.stringify(basket));

    // change the badge value
    const badge = document.getElementById('basket-badge');

    // if basket is empty, don't show the badge: class d-none & d-block
    if (basket.length === 0) {
        badge.classList.add('d-none');

    } else {
        badge.classList.remove('d-none');
    }

    badge.textContent = basket.length;

}