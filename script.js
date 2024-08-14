// script.js

const meals = ["salade-nicoise-au-thon.jpeg", "92e4599e84a5ee6f19a210b3b7e291a4.jpg", "i130335-steak-hache-au-four.jpeg", "club-sandwich-pouletistock-662f57c0b00da.avif", "pizza-saumon-fume.jpeg", "pizza-fruit-mer-1200.jpg", "pizza-saumon.jpg", "matcha-latte-gospecialtycoffee.webp", "Recette-gateau-chocolat-mascarpone-facile-Lilie-Bakery.png", "i387-pizza-thon.webp", "tagliatelles-au-thon.webp", "recipe-image-legacy-id-1001491_11-2e0fa5c.jpg", "DSC_1751.png", "unnamed.png", "k_Photo_Recipe Ramp Up_2021-12-White-Hot-Chocolate_white-hot-chocolate.jpeg", "vraie-pizza-napolitaine.png", "download (1).jpeg", "Milkshake-chocolat-noisette.png", "Bourbon-Spiked-Hot-Chocolate-21.jpg", "poitrine de poulet sauce sublime.0.jpg", "panna cotta-1.png", "i22479-milk-shake-myrtilles.jpeg", "brochettes-de-poulet-epice-la-recette-et-la-marinade-originale-de-cyril-lignac.jpg", "images (7).jpeg", "recette-de-brochettes-de-boeuf-hache-facon-keftas-au-barbecue.jpg", "97cefae7-4560-4967-9d7b-1130c8355f98.avif", "i76673-shake-aux-fruits-de-la-passion.jpeg", "cafe americano.png", "ali.jpeg", "ChefMayerNachosBurgerBigMac_1200x1200.webp", "vraie-pizza-napolitaine.webp", "panna cotta-1.webp", "i79008-photo-de-tajine-de-poulet-aux-epices.jpeg", "images (6).jpeg", "recettes_du_quebec-_-9ed5af7c8926f72285eec70e4a4693c5ee631d3b-_-phpjb7GIm.png", "Carbonara_6a.png", "recettes_du_quebec-_-9ed5af7c8926f72285eec70e4a4693c5ee631d3b-_-phpjb7GIm", "i145392-tanjia-marrakchia.jpeg", "CREPE NUTELLA.jpeg", "drink-au-pamplemousse.webp", "tagliatelles-au-thon.png", "smoothie-canne-sucre-fond-jardin_741910-15190.avif", "Miel.png", "milkshake-coco.png", "banana-split-9.png", "Tea-Leaves-Boba-Kit-2-702x1024.png", "i150504-dinde-sauce-roquefort.webp", "AdobeStock_277063507.jpeg", "MANGO.avif", "SALADE RICHE.jpg", "20211201-crispy-roasted-potatoes-vicky-wasik-45-d75608ce325e4ffbab665084eba642c8.jpg", "MANGO.png", "HOTCHOC ORANGE.jpeg", "i179784-nachos-poulet.jpeg", "cafe-bombon-1.jpg", "Peche-melba-Lilie-Bakery.webp", "the-marocain_tea.jpg", "image_0651923_20220406_ob_b30279_tacos-viande.jpg", "Pasticciofruitsdemer_d9ece117-4482-4230-be7d-5032ff584df2_530x@2x.png", "air-fryer-chicken-nuggets-28.jpg", "CREPE BANANE & CHOCOLAT.jpg", "i150504-dinde-sauce-roquefort.png", "SES-mocha-.jpg", "panini-a-la-saucisse-toulouse-douce.jpg", "download (3).jpeg", "oualmas.jpeg", "61E1185E-A2FE-4F74-AA1B-07794BF998FE.jpg", "penne-fruits-de-mer-3w-774x516.png", "Peche-melba-Lilie-Bakery.png", "salade-concombre-et-tomates.jpg", "095e10c9-1fcf-42a9-b620-08b05b681119_zeTEfqo.jpg", "crepes-au-miel-aux-noix-de-pin-et-a-la-creme-fraiche-59c90933.webp", "pizza-regal-du-boucher-84262-1661440547-1.jpg", "club-sandwich-pouletistock-662f57c0b00da.png", "COUPE DE GLACE 3 BOULES.webp", "chocmint-hot-chocolate-1980x1320-125876-1.jpg", "nogat-glace.jpg", "panini-fruit-de-mer.jpg", "COUPE DE GLACE 3 BOULES.png", "42500_w1024h1024c1cx2592cy1728.jpg", "tajine-de-boeuf-safrane-aux-patates-douces.jpg", "Carbonara_6a.webp", "Milkshake-chocolat-noisette.avif", "crepes-au-miel-aux-noix-de-pin-et-a-la-creme.png", "cafe-special-au-cafe_904397-1665.avif", "steak5.webp", "images (5).jpeg", "tacos.jpeg", "cacao_chaud-96dpi-720.jpg", "i84653-spaghettis-bolognaise-rapides.jpg", "download (2).jpeg", "ChefMayerNachosBurgerBigMac_1200x1200.png", "crepe-confiture.png", "tajine-de-crevettes-4-scaled.jpg", "four-cheese-margherita-pizza-recipe-12-scaled.jpg", "verre-milkshake-pistache-bol-pistaches-arriere-plan_787273-4087.avif", "tajin-maroc.png", "tacos-fruits-de-mer.jpg", "images.jpeg", "milkshake-persan-de-safran-avec-des-feuilles-de-basilic-96846669.png", "flat-white-d8ada0f.jpg", "i28438-crepes-choco-nutella.jpeg", "mousse-au-chocolat-noir-245e98c4.png", "i31803-chocolat-chaud.jpeg", "panini-mix.jpg", "smoothie-canne-sucre-fond-jardin_741910-15190.png", "HVB8IK.jpg", "i134573-tajine-vegetarien.jpeg", "salade-de-mais-a-la-mexicaine.jpg", "i74487-tagliatelles-aux-3-fromages.jpg", "TIRAMISU ITALIEN.jpg", "HOT\u0421H\u041e\u0421 DARK.jpeg", "paninis-dinde-et-pesto-1.jpg", "HOTCHOC CARAMEL.jpeg", "i34581-salade-nicoise-rapide.jpeg", "5624_w1024h1024c1cx1872cy2808.jpg", "Cafe-viennois-couv-V1.png", "IMG_4582-scaled.jpg", "FIIWELOSS_7.webp", "images (8).jpeg", "milkshake-coco.webp", "897813_387793.webp", "aminces-de-dinde-sauce-moutarde.webp", "1200x600-the-au-lait.jpg", "brochettes-de-preparation-de-viande-hachee-de-boeuf-a-la-provencale-caviar-daubergines-et-feta.png", "salade-de-fruits.jpg", "images (2).jpeg", "TH\u00c9 NOIR LIPTON.png", "images (4).jpeg", "97cefae7-4560-4967-9d7b-1130c8355f98.png", "PEACH.jpeg", "milkshake-persan-de-safran-avec-des-feuilles-de-basilic-96846669 (1).png", "verre-milkshake-pistache-bol-pistaches-arriere-plan_787273-4087 (1).png", "aminces-de-dinde-sauce-moutarde.png", "banana-split-9.jpg", "POMME VERTE.jpg", "i73776-avocat-farci-a-la-mayonnaise.jpg", "6e5a71e77c2f5048d34029694491d36a8480aa6b-recipe.jpg", "Couscous-marocain-aux-l\u00e9gumes-frais-legumineuses-viande-recette-traditionnelle-classique_1_680.jpg", "Charcuterie-Board-Panini_21.jpg", "i387-pizza-thon.png", "drink-au-pamplemousse.png", "caramel_popcorn.png", "Tea-Leaves-Boba-Kit-2-702x1024.webp", "tortillasaucissefumee.jpg", "vervain.jpg", "caramel_popcorn.webp", "i72680-panini-au-thon-tomate-et-avocat.jpeg", "milkshake-persan-de-safran-avec-des-feuilles-de-basilic-96846669.webp", "i74271-harira-choumicha.jpeg", "Peche-melba-Lilie-Bakery (1).png", "images (1).jpeg", "milkshakespeculoos-7.jpg", "verre-milkshake-pistache-bol-pistaches-arriere-plan_787273-4087 (2).png", "TH\u00c9 NOIR LIPTON.webp", "14891-original.webp", "258686-IcedCaramelMacchiato-ddmps-4x3-104704-2effb74f7d504b8aa5fbd52204d0e2e5.jpg", "cafe americano.webp", "penne-fruits-de-mer-3w-774x516.webp", "panini-aux-crevettes.jpeg", "what-is-espresso-765702-hero-03_cropped-ffbc0c7cf45a46ff846843040c8f370c.jpg", "cafe-special-au-cafe_904397-1665.png", "DSC_1751.webp", "VERVEINE AU LAIT.png", "matcha-latte-gospecialtycoffee.png", "__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2017__02__20170210-barbajada-milanese-coffee-cocoa-vicky-wasik-6-cddd037c955c4b0bb2f72bad5bca0c50.jpg", "Meilleur-restaurant-avec-service-de-livraison-\u00e0-Tanger-1.jpg", "verre-milkshake-pistache-bol-pistaches-arriere-plan_787273-4087.png", "COOKIE LATTE.jpeg", "salade-exotique-598x449.jpg", "Pasticciofruitsdemer_d9ece117-4482-4230-be7d-5032ff584df2_530x@2x.webp", "images (3).jpeg", "brochettes-de-preparation-de-viande-hachee-de-boeuf-a-la-provencale-caviar-daubergines-et-feta.webp", "Crispy-Chicken-Burger-square-FS-4518.jpg", "01-pain-tafarnout.jpg", "steak5.png", "download.jpeg"];

const mealSection = document.getElementById('meal-section');
let basket = JSON.parse(localStorage.getItem('basket')) || [];

meals.forEach(meal => {
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('meal');
    mealDiv.innerHTML = `
        <img src="./images/${meal}" alt="shawarma" class="">
        <div class="">
            <h3 class="card-title">shawarma</h3>
            <p class="card-text">100 dh</p>
            <button onclick="addToBasket('shawarma', 100)" class="btn btn-primary">Add to Basket</button>
        </div>
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

    // e.preventDefault();
    // change the badge value
    const badge = document.getElementById('basket-badge');
    // const basket = JSON.parse(localStorage.getItem('basket')) || [];
    // if basket is empty, don't show the badge: class d-none & d-block
    if (basket.length === 0) {
        badge.classList.add('d-none');
    } else {
        badge.classList.remove('d-none');
    }

    badge.textContent = basket.length;
}

document.getElementById('basket-button').addEventListener('click', (e) => {
    
    window.location.href = 'basket.html';
});

// checkout-button
document.getElementById('checkout-button').addEventListener('click', (e) => {
    e.preventDefault();
    // clear basket
    localStorage.removeItem('basket');
    window.location.href = 'checkout.html';
});
