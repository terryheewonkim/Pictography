// PEXELS API KEY
// 563492ad6f917000010000018c7452dc64df4df08df2d1c422d637d7

const auth = "563492ad6f917000010000018c7452dc64df4df08df2d1c422d637d7";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;

// EVENT LISTENERS
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  // prevent default behavior of page refreshing when form submitted
  e.preventDefault();
  searchPhotos(searchValue);
});

// Update gallery based on input
function updateInput(e) {
  searchValue = e.target.value;
}

// Fetch API with url
async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

// Generate HTML for gallery pictures
function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src=${photo.src.large} />
    <p>${photo.photographer}</p>`;
    gallery.appendChild(galleryImg);
  });
}

// Get curated photos from Pexels
async function curatedPhotos() {
  const data = await fetchApi(
    "https://api.pexels.com/v1/curated?per_page=15&page=1"
  );
  generatePictures(data);
}

// Search photos with query string
async function searchPhotos(query) {
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`
  );
  generatePictures(data);
}

curatedPhotos();
