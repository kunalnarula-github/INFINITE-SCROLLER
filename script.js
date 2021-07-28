const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = []


// Unsplash API
const count = 10;
const apiKey = 'NinMZa4KJAsLdIA0eUWy5ZM0GIHBlCcQcHIKZC6hoVs';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helpter function to set Attributes on DOM elements
function setAttributes(element, Attributes){
    for (const key in Attributes){
        element.setAttribute(key, Attributes[key])
    }
}

// create Elements for Links and Photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded())
        // Put <img> inside <a>, then put both inside imgConatiner element
        item.appendChild(img)
        imageContainer.appendChild(item)

    });
}

// Get Photos from UNsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json()
        displayPhotos()
    } catch(error) {
        // Catch Error Here
    }
}


// Check to see if scrolling near the bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false
        getPhotos()
    }
})

// On Load
getPhotos();
