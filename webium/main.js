var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    speed: 1500,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
    //Autoplay
    autoplay: {
      delay: 12000,
    },
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

});