AOS.init();
const dots = document.getElementById("ham-menu");
const links = document.getElementById("nav-links");
const searchBox = document.getElementById("search-textbox");
const searchIcon = document.getElementById("search-icon");

searchIcon.addEventListener('click', () => { 
  if(searchBox.classList.contains("show")){
    searchBox.classList.remove("show");
  }else{
    searchBox.classList.add("show");
  }
});

dots.addEventListener('click', () => {
  if(dots.classList.contains("show")){
    links.classList.add("show");
    dots.classList.remove("show");
  }else{
    links.classList.remove("show");
    dots.classList.add("show");
  }
});

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