
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const urlParams  = new URLSearchParams(search)
  const city = urlParams.get('city');
  console.log(city)
  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const res = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    const users = await res.json();

    return users;
  }
  catch(err){
    return null;
  }
  
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let rowData = document.getElementById("data")
  adventures.forEach((key) => {
    const colData = document.createElement("div");
    colData.className = `col-6 col-lg-3 mb-4`;
    colData.innerHTML = `
  <a href="detail/?adventure=${key.id}" id="${key.id}">
   <div class = "activity-card">
   <img src= "${key.image}" class = "activity-card img"/>
   <div class="category-banner">${key.category}</div>
   <div class= "d-flex justify-content-between">
    <h5 class = "text-left">${key.name}</h5>
    <p>${key.costPerHead}</p>
    </div>
    <div class = "d-flex justify-content-between">
    <h5 class = "text-left">Duration</h5>
    <p>${key.duration}Hours</p> 
    </div>
   </div> 
    </a>
    `;
       
  rowData.appendChild(colData);
  })
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
 return list.filter(adventure => adventure.duration > low && adventure.duration <= high);


}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
 return list.filter(adventure => categoryList.includes (adventure.category));
  
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList=[...list];

  if(null != filters.duration && filters.duration !== ""){
    const [low,high] = filters.duration.split("-");
    filteredList = filterByDuration(list, parseInt(low), parseInt(high)); 
  }

  if(null != filters.category && filters.category.length !== 0){
    filteredList = filterByCategory(filteredList, filters.category);
  }
  return filteredList;
}





  // Place holder for functionality to work in the Stubs
  

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
  
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  return JSON.parse(localStorage.getItem("filters"));


  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  document.getElementById("category-list").textContent ="";
  filters.category.forEach((category) => {
      let pillEle = document.createElement("div");
      pillEle.className = "category-filter";
      pillEle.innerHtml = `<div> ${category} </div>`
      document.getElementById("category-list").appendChild(pillEle);

  })

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
