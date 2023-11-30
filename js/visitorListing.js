const visitorItemsBox = document.querySelector("#visiotItemsBox");
const filterBtn = document.querySelector("#filterBtn");
const filterDiv = document.querySelector("#filterDiv");
const confirmFilterBtn = document.querySelector("#confirmFilterBtn");
const exitBtn = document.querySelector("#exitBtn");
const filterItemTitle = document.querySelector("#filterItemTitle");
const filterArtOptions = document.querySelector("#artOptions");
const filterMinPriceInput = document.querySelector("#minPriceInput");
const filterMaxPriceInput = document.querySelector("#maxPriceInput");
const filtertypeOptions = document.querySelector("#typeOptions");

confirmFilterBtn.addEventListener("click", () => {
  visitorItemsBox.innerHTML = "";
  const filterFormData = {
    title: filterItemTitle.value,
    art: filterArtOptions.value,
    minPrice: filterMinPriceInput.value,
    maxPrice: filterMaxPriceInput.value,
    type: filtertypeOptions.value,
  };

  const publishedItems = items.filter((itm) => itm.isPublished);
  const filteredItems = publishedItems.filter((item) => {
    return (
      item.title.includes(filterFormData.title) &&
      (filterFormData.art === "choose" || item.artist === filterFormData.art) &&
      (filterFormData.minPrice === "" ||
        item.price >= filterFormData.minPrice) &&
      (filterFormData.maxPrice === "" ||
        item.price <= filterFormData.maxPrice) &&
      (filterFormData.type === "choose" || item.type === filterFormData.type)
    );
  });
  filteredItems.forEach((item) => {
    visitorItemsBox.innerHTML += `
        <div class="cardWrapper">
          <div class="card">
            <img src="${item.image}" alt="art-image">
            <div class="cardText">
              <div class="nameAndPrice">
                <div>
                  <h3 class="itemArtistName">${item.artist}</h3>
                  <h5 class="itemTitle">${item.title}</h5>
                  <p class="date">${item.dateCreated}</p>
                </div>
                <span class="price">$${item.price}</span>
              </div>
              <p class="desc">${item.description}</p>
            </div>
          </div>
        </div>`;
  });
});
itemTypes.forEach((type) => {
  filtertypeOptions.innerHTML += `<option>${type}</option>`;
});

items
  .filter((itm) => itm.isPublished)
  .forEach((itm) => {
    visitorItemsBox.innerHTML += `<div class="cardWrapper">
  <div class="card">   
  <img src="${itm.image}", alt="art-image">
  <div class="cardText">
  <div class="nameAndPrice">
              <div>
              <h3 class="itemArtistName">${itm.artist}</h3>
                  <h5 class="itemTitle">${itm.title}</h5>
                  <p class="date">${itm.dateCreated}</p>
              </div>
              <span class="price">$${itm.price}</span>
          </div>
          <p class="desc">${itm.description}</p>
      </div>
  `;
  });

filterBtn.addEventListener("click", () => {
  filterDiv.style.display = "block";
  filterBtn.style.display = "none";
  window.scrollTo(0, 0);
});

confirmFilterBtn.addEventListener("click", () => {
  filterDiv.style.display = "none";
  filterBtn.style.display = "block";
  //   if(){

  //   }
});

exitBtn.addEventListener("click", () => {
  filterDiv.style.display = "none";
  filterBtn.style.display = "block";
});
