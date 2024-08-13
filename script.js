// script.js

const meals = [
    { category: "Shawarma", name: "Shawarma Normal", price: 25 },
    { category: "Shawarma", name: "Shawarma Fromage", price: 30 },
    // ... (other meals)
    { category: "Boisson", name: "Pepsi", price: 5 }
];

const mealSection = document.getElementById('meal-section');
const basket = JSON.parse(localStorage.getItem('basket')) || [];

meals.forEach(meal => {
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('meal');
    mealDiv.innerHTML = `
        <img src="placeholder.png" alt="${meal.name}">
        <h3>${meal.name}</h3>
        <p>${meal.price}dh</p>
        <button onclick="addToBasket('${meal.name}', ${meal.price})">Add to Basket</button>
    `;
    mealSection.appendChild(mealDiv);
});

function addToBasket(name, price) {
    const existingItem = basket.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        basket.push({ name, price, quantity: 1 });
    }
    localStorage.setItem('basket', JSON.stringify(basket));
}

document.getElementById('basket-button').addEventListener('click', () => {
    window.location.href = 'basket.html';
});
