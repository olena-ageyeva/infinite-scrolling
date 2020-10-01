const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photos = [];

// Unsplash API
const count = 10;
const apiKey = "bBneZCXaX8ofEOTqlw6U-tyvIhtwGCzMOpxLZmTo44k";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Helper Function to Set Attributes on DOM element
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Create Elements for Links and Photos
function displayPhotos(photos) {
  photos.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");

    setAttributes(item, { href: photo.links.html, target: "_blank" });
    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const photos = await response.json();
    displayPhotos(photos);
  } catch (error) {}
}

//check if scrolling near bottom, load more images
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    getPhotos();
  }
});

//On Load
getPhotos();
