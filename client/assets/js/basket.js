// basket.js
let URL_API = 'http://localhost:8000'; // Adjust the URL to your Laravel app

const basketList = document.getElementById('basket-list');
const basket = JSON.parse(localStorage.getItem('basket')) || [];

$(() => {

    document.getElementById('checkout-button').addEventListener('click', () => {
        if (basket.length === 0) {
            return;
        }

        let orderDetails = "*My Order*:\n";
        let totalPrice = 0;

        basket.forEach(item => {
            orderDetails += `- ${item.name.trim()} x *${item.quantity}*  _*${item.price}DH*_\n`;
            totalPrice += item.price * item.quantity;
        });

        orderDetails += `\nTotal: *${totalPrice}DH*`;

        const whatsappNumber = "+212697069317";
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderDetails)}`;
        window.open(whatsappURL, '_blank');

        // Clear the basket
        localStorage.removeItem('basket');
        basket.length = 0;
        updateBasket();

        // Return home
        window.location.href = 'index.html';
    });
    updateBasket();
    calculateAndUpdateTotalPrice();

    // handle the back btn click event
    document.getElementById('back-button').addEventListener('click', () => {
        // window.location.reload();
        // window.history.back();
        window.location.href = 'index.html';
    });
});

/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */
function updateBasket() {

    basketList.innerHTML = '';
    basket.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('basket-item');
        li.innerHTML = `
            <div class="d-flex justify-content-between gap-2 py-3 border-bottom">
                <div class="">
                    <div class="d-flex align-items-center">
                        <img src="${URL_API}/storage/${item.image}" alt="${item.name}" class="rounded-circle" style="width: 50px; height: 50px;">
                        <div class="ms-3">
                            <span class="d-block item_name">${item.name}</span>
                            <span class="d-block fw-bold">${item.price} DH</span>
                        </div>
                    </div>
                </div>
                <div class="basket-item-operators">
                    <div class="input-group">
                        <button class="btn btn-outline-secondary" onclick="decreaseQuantity(${index})">-</button>
                        <input type="text" class="form-control menu_item_counter" value="${item.quantity}" readonly>
                        <button class="btn btn-outline-secondary" onclick="increaseQuantity(${index})">+</button>
                    </div>
                    <div class="basket-item-delete">
                        <button class="btn btn-danger" onclick="deleteItem(${index})"><i class="bi bi-trash3-fill"></i></button>
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
        return;
    }
    localStorage.setItem('basket', JSON.stringify(basket));

    // update the basket badge
    const badge = document.getElementById('basket-badge');
    badge.textContent = basket.length;
    updateBasket();
    calculateAndUpdateTotalPrice();
}

function increaseQuantity(index) {
    basket[index].quantity++;
    localStorage.setItem('basket', JSON.stringify(basket));
    updateBasket();
    calculateAndUpdateTotalPrice();
}
function deleteItem(index) {
    basket.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(basket));

    // update the basket badge
    const badge = document.getElementById('basket-badge');
    badge.textContent = basket.length;
    updateBasket();
    calculateAndUpdateTotalPrice();
}

function calculateAndUpdateTotalPrice() {
    const total = basket.reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.getElementById('price_total').textContent = total + 'DH';
}
