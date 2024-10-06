
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


// customize the scroll bar

const { OverlayScrollbars, ClickScrollPlugin } = OverlayScrollbarsGlobal;

// optional: use the ClickScrollPlugin to make the option "scrollbars.clickScroll: true" available
OverlayScrollbars.plugin(ClickScrollPlugin);

const osInstance = OverlayScrollbars(document.body, {
    scrollbars: {
        clickScrolling: true,
    },
});

// scroll to top or reset the scroll position
// Get the button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Show the button when the user scrolls down 20px from the top of the document
window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
};

// When the user clicks on the button, scroll to the top of the document
scrollToTopBtn.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};