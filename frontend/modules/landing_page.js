import config from "../conf/index.js";

async function init() {
 
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}
//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
try {
  let response = await fetch(`${config.backendEndpoint}/cities`);
  let cities = await response.json();

  return cities;
} catch(err) {
  return null;
}
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
let rowData = document.getElementById("data");
let colData = document.createElement("div");
colData.className = "col-6 col-lg-3 mb-4";
colData.innerHTML = `
<a href = "pages/adventures/?city=${id}" target="_blank" id="${id}">
<div class="tile">
<img src="${image}" alt="${id}"/>
<div class= "tile-text text-white text-center">
<h5>${city}</h5>
<p>${description}</p>
</div>
</div>
</a>
`
rowData.append(colData);
}
export { init, fetchCities, addCityToDOM };
