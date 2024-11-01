const accessKey = "Ef_JIVLiNxaTePOC41r_-6YjK0-_uzWzl6N_CmX68aM";

const form = document.querySelector("form")
const searchBtn = document.querySelector("form > button");
const searchResult = document.getElementById("searchResult");
const loadMore = document.getElementById("loadMore");

let page = 1;

async function searchImage () {
    keyword = searchText.value;
   try {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    results.map((result => {
        const image = document.createElement("img");
        image.src = result.urls.small;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink)
    }))

    loadMore.style.display = "block";
   } catch (error) {
    const errorImg = document.createElement("p");
    errorImg.innerHTML = "Invalid Search Keyword, Try again..."
    searchResult.appendChild(errorImg);
    loadMore.style.display = "none";
   }
}

form.addEventListener("submit", e => {
    e.preventDefault();
    searchResult.innerHTML = "";
    loadMore.style.display = "none";
    searchImage();
});



loadMore.addEventListener("click", e=>{
    page++;
    searchImage();
})