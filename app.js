// PEXELS API KEY
// 563492ad6f917000010000018c7452dc64df4df08df2d1c422d637d7

const auth = "563492ad6f917000010000018c7452dc64df4df08df2d1c422d637d7";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const moreBtn = document.querySelector(".more-btn");
let fetchLink;
let searchValue;
let currentSearch;
let pageNum = 1;

// EVENT LISTENERS
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  // prevent default behavior of page refreshing when form submitted
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
moreBtn.addEventListener("click", loadMore);

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
    galleryImg.innerHTML = `
    <div class="gallery-info">
    <p>${photo.photographer}</p>
    <a href=${photo.src.original}>Download</a>
    </div>
    <img src=${photo.src.large} />
    `;
    gallery.appendChild(galleryImg);
  });
}

// Get curated photos from Pexels
async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

// Search photos with query string
async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

// Clear current gallery and replace with searched images
function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

// Load more pictures
async function loadMore() {
  pageNum++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${pageNum}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${pageNum}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

curatedPhotos();
