window.location.hash = "#";
const landingPage = document.querySelector("#landingPage");
const visitor = document.querySelector("#visitor");
const visitorHomePage = document.querySelector("#visitorHomePage");
const visitorListing = document.querySelector("#visitorListing");
const artist = document.querySelector("#artist");
const artistHomePage = document.querySelector("#artistHomePage");
const artistItemsPage = document.querySelector("#artistItemsPage");
const artistAddNewItem = document.querySelector("#artistAddNewItem");
const auction = document.querySelector("#auction");
const findOneMoreBtn = document.querySelector("#findOneMoreBtn");
const addNewItem = document.querySelector("#addNewItem");

const artistName = document.querySelector("#artistNameListPage");
const artistNameAddNewItem = document.querySelector("#artistNameAddNewItem");

const chooseArtis = document.querySelector("#art");
let option = "";

visitorHomePage.style.display = "none";
visitorListing.style.display = "none";
artistHomePage.style.display = "none";
artistItemsPage.style.display = "none";
artistAddNewItem.style.display = "none";
auction.style.display = "none";

artist.addEventListener("click", () => {
  chooseArtis.style.fontWeight = "900";
});

chooseArtis.addEventListener("click", () => {
  if (chooseArtis.value != "Choose") {
    window.location.hash = "artistHomePage";
    option = chooseArtis.value;
    localStorage.setItem("artist", option);
    artistName.textContent = option;
    artistNameAddNewItem.textContent = option;
    localStorage.setItem("artist", option);
  }
});

visitor.addEventListener("click", () => {
  window.location.hash = "visitorHomePage";
});

addNewItem.addEventListener("click", () => {
  window.location.hash = "artistAddNewItem";
  addNewItemBtn.style.display = "block";
  cameraText.style.display = "block";
  saveBtn.style.display = "none";
});

findOneMoreBtn.addEventListener("click", () => {
  window.location.hash = "visitorListing";
});

window.addEventListener("popstate", function () {
  checkingLocation();
});

function checkingLocation() {
  if (location.hash === "#visitorHomePage") {
    landingPage.style.display = "none";
    visitorHomePage.style.display = "block";
    visitorListing.style.display = "none";
    artistHomePage.style.display = "none";
    artistItemsPage.style.display = "none";
    artistAddNewItem.style.display = "none";
    auction.style.display = "none";
  } else if (location.hash === "#artistHomePage") {
    landingPage.style.display = "none";
    artistHomePage.style.display = "block";
    visitorHomePage.style.display = "none";
    visitorListing.style.display = "none";
    artistItemsPage.style.display = "none";
    artistAddNewItem.style.display = "none";
    auction.style.display = "none";
  } else if (location.hash === "#visitorListing") {
    landingPage.style.display = "none";
    visitorListing.style.display = "block";
    visitorHomePage.style.display = "none";
    artistHomePage.style.display = "none";
    artistItemsPage.style.display = "none";
    artistAddNewItem.style.display = "none";
    auction.style.display = "none";
  } else if (location.hash === "#artistItemsPage") {
    landingPage.style.display = "none";
    artistItemsPage.style.display = "block";
    visitorHomePage.style.display = "none";
    visitorListing.style.display = "none";
    artistHomePage.style.display = "none";
    artistAddNewItem.style.display = "none";
    auction.style.display = "none";
  } else if (location.hash === "#artistAddNewItem") {
    landingPage.style.display = "none";
    artistAddNewItem.style.display = "block";
    visitorHomePage.style.display = "none";
    visitorListing.style.display = "none";
    artistHomePage.style.display = "none";
    artistItemsPage.style.display = "none";
    auction.style.display = "none";
  } else if (location.hash === "#auction") {
    landingPage.style.display = "none";
    auction.style.display = "block";
    visitorHomePage.style.display = "none";
    visitorListing.style.display = "none";
    artistHomePage.style.display = "none";
    artistItemsPage.style.display = "none";
    artistAddNewItem.style.display = "none";
  } else {
    landingPage.style.display = "block";
    auction.style.display = "none";
    visitorHomePage.style.display = "none";
    visitorListing.style.display = "none";
    artistHomePage.style.display = "none";
    artistItemsPage.style.display = "none";
    artistAddNewItem.style.display = "none";
  }
}
