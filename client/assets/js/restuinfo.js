$(document).ready(function() {
    let GLOBAL_URL = 'http://localhost:8000'; // Adjust the URL to your Laravel app

    const fetchDataRest = async () => {
        try {
            const response = await fetch(`${GLOBAL_URL}/api/restaurants`);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    const restaurant = data[0]; // Assuming you only need the first restaurant
                    let restData = {
                        id: restaurant.id,
                        websiteLogo: restaurant.website_logo === null ? null : `${GLOBAL_URL}/storage/${restaurant.website_logo}`,
                        bg_image: restaurant.bg_image === null ? null : `${GLOBAL_URL}/storage/${restaurant.bg_image}`,
                        email_address: restaurant.email_address,
                        fax_phone: restaurant.fax_phone,
                        physical_address: restaurant.physical_address,
                        instagram_link: restaurant.instagram_link,
                        facebook_link: restaurant.facebook_link,
                        restaurant_name: restaurant.restaurant_name,
                        subheading: restaurant.subheading,
                        server: restaurant.server,
                        facture: restaurant.facture
                    };

                    console.log("restData", restData);
                    $('#pageTitle').text(restData.restaurant_name);
                    // Update the navbar logo
                    if (restData.websiteLogo) {
                        $(".navbar-logo").attr("src", restData.websiteLogo);
                        $('#favicon').attr('href', restData.websiteLogo);
                    }

                    // Update the header content (restaurant name and subheading)
                    $("#header").css("background-image", `url(${restData.bg_image || './images/3.jpeg'})`);
                    $("#header h1").text(restData.restaurant_name);
                    $("#header p").text(restData.subheading);

                    // Update the contact details (email, phone, address)
                    $(".contact-info-div a").attr("href", `mailto:${restData.email_address}`).text(restData.email_address);
                    $(".contact-info-div p:nth-child(2) a").attr("href", `tel:${restData.fax_phone}`).text(restData.fax_phone);
                    // $(".contact-info-div p:nth-child(2)").text(restData.fax_phone);
                    $(".address span").text(restData.physical_address);

                    // Update the social media links
                    if (restData.instagram_link) {
                        $(".social-media").append(`<a href="${restData.instagram_link}" target="_blank"><i class="bi bi-instagram"></i></a>`);
                    }
                    if (restData.facebook_link) {
                        $(".social-media").append(`<a href="${restData.facebook_link}" target="_blank"><i class="bi bi-facebook"></i></a>`);
                    }

                }
            } else {
                console.error("Error fetching data: ", response.statusText);
            }
        } catch (error) {
            console.error("Fetch error: ", error);
        }
    };

    // Call the fetch function on page load
    fetchDataRest();
});
