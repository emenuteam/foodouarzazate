// basket.js

const basket = JSON.parse(localStorage.getItem('basket')) || [];
const basketList = document.getElementById('basket-list');

function updateBasket() {
    basketList.innerHTML = '';
    basket.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('basket-item');
        li.innerHTML = `
            <div class="row">
            <div class="col">${item.name} - ${item.price}dh</div>
            <div class="col">
                <div class="input-group">
                <button class="btn btn-outline-secondary" onclick="decreaseQuantity(${index})">-</button>
                <input type="text" class="form-control" value="${item.quantity}" readonly>
                <button class="btn btn-outline-secondary" onclick="increaseQuantity(${index})">+</button>
                </div>
            </div>
            </div>
        `;
        basketList.appendChild(li);
    });
}

function decreaseQuantity(index) {
    if (basket[index].quantity > 1) {
        basket[index].quantity--;
    } else {
        basket.splice(index, 1);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    updateBasket();
}

function increaseQuantity(index) {
    basket[index].quantity++;
    localStorage.setItem('basket', JSON.stringify(basket));
    updateBasket();
}

document.getElementById('checkout-button').addEventListener('click', () => {
    if (basket.length === 0) {
        return;
    }

    let orderDetails = "Your Order:\n";
    basket.forEach(item => {
        orderDetails += `${item.name} x ${item.quantity} - ${item.price}dh each\n`;
    });

    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(orderDetails)}`;
    window.open(whatsappURL, '_blank');

    localStorage.removeItem('basket');
    basket.length = 0; // Clear basket
    updateBasket();
});

updateBasket();
