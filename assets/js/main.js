
$(() => {
    // set the basket badge value
    const badge = document.getElementById('basket-badge');
    badge.textContent = basket.length;
    console.log(basket.length);

    // if basket is empty, don't show the badge: class d-none & d-block
    if (basket.length != 0) {
        badge.classList.remove('d-none');
    } else {
        badge.classList.add('d-none');
    }
});
