const nav = document.querySelector("nav");
const sectionOne = document.querySelector(".home-container");
const footer = document.querySelector(".footer-data");

const sectionOneOptions = {
  rootMargin: "-50px 0px 0px 0px"
};
const footerOptions = {
  rootMargin: "0px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function(
  entries,
  sectionOneObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }
  });
},
sectionOneOptions);

const footerObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      nav.style.display = "block";
    } else {
      nav.style.display = "none";
    }
  });
}, footerOptions);

sectionOneObserver.observe(sectionOne);
footerObserver.observe(footer);