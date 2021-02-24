const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const count = 30;
const apiKey = 'mzb1mvfCKxWhNOGKJPLavR8127E-_-kpTmP67umE1VA';
const URL = `https://api.unsplash.com/photos/random/
?client_id=${apiKey}&count=${count}&orientation=portrait`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === 30){
        ready = true;
        loader.hidden = true;
    }
}

function setAttributes(element, attributes){
    for ( const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhoto() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach(photo => {
        const el = document.createElement('a');
        setAttributes(el, {
            href: photo.links.html,
            target: '_blank'
        });

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // Loading Effect
        img.addEventListener('load',imageLoaded)

        el.appendChild(img);
        imageContainer.appendChild(el);
    });
}

// Get photos
async function getPhotos() {
    try{
        const response = await fetch(URL);
        photosArray = await response.json();
        displayPhoto();
    }catch(error){
        console.log(error);
    }
}

// Scrolling Infinite Effect
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos(); 
    }
});



//
getPhotos();