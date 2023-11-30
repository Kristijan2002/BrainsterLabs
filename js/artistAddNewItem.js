const isPublished = document.querySelector("#inputCheckbox");
const inputTitle = document.querySelector("#inputTitle");
const inputDesc = document.querySelector("#description");
const inputType = document.querySelector("#inputType");
const inputPrice = document.querySelector("#inputPrice");
const inputImgUrl = document.querySelector("#inputImgUrl");
const takeSnapshotBtn = document.querySelector("#takeSnapshotBtn");
const videoElement = document.querySelector("#videoElement");
const addNewItemBtn = document.querySelector(".addNewItemBtn");
const save = document.querySelector(".save");
const cancelBtn = document.querySelector("#cancelBtn");
const takePhoto = document.querySelector("#takePhoto");
const canvas = document.querySelector("#takeSnapshotBtn");
const camera = document.querySelector(".camera");
const cameraText = document.querySelector(".cameraText");
let nextId = 61;

takePhoto.addEventListener("click", () => {
  let img = canvas.toDataURL("image/png");
  console.log(img);
  inputImgUrl.value = img;
});

takeSnapshotBtn.addEventListener("click", () => {
  navigator.mediaDevices
    .getUserMedia({
      video: {
        minAspectRatio: 1.333,
        minFrameRate: 60,
        width: 390,
      },
    })
    .then(function (stream) {
      videoElement.srcObject = stream;
      const context = canvas.getContext("2d");
      videoElement.addEventListener("play", function () {
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      });
    })
    .catch(function (error) {
      console.error("Error accessing the camera:", error);
    });
});

function createNewItem() {
  const newItem = {
    id: nextId,
    title: inputTitle.value,
    description: inputDesc.value,
    type: inputType.value,
    image: inputImgUrl.value,
    price: inputPrice.value,
    artist: localStorage.getItem("artist"),
    dateCreated: new Date().toISOString(),
    isPublished: isPublished.checked,
    isAuctioning: false,
    // dateSold: dateSold,
    // priceSold: priceSold,
  };
  nextId++;
  return newItem;
}

function createItemCard() {
  createCard();
}

if (addNewItemBtn.classList.contains("addNewItemBtn")) {
  addNewItemBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (
      inputTitle.value &&
      inputDesc.value &&
      inputType.value &&
      inputImgUrl.value &&
      inputPrice.value
    ) {
    }

    const newItem = createNewItem();

    parseData.push(newItem);

    localStorage.setItem("items", JSON.stringify(parseData));

    const itemCardHTML = createItemCard(parseData);
    artistItemsBox.innerHTML += itemCardHTML;

    window.location.hash = "artistItemsPage";
  });
}

// --------------------------------------------------------------------------------------
document.querySelector(".logo2").addEventListener("click", () => {
  location.reload();
});
document.querySelector(".burgerMenu2").addEventListener("click", () => {
  document.querySelector(".dropDown2").style.display = "block";
});

document.querySelector(".logo3").addEventListener("click", () => {
  location.reload();
});
document.querySelector("#homeNavigator2").addEventListener("click", () => {
  location.reload();
});
document.querySelector("#auctionNavigator2").addEventListener("click", () => {
  window.location.hash = "auction";
  document.querySelector(".dropDown2").style.display = "none";
});
document.querySelector("#itemsNavigator2").addEventListener("click", () => {
  document.querySelector(".dropDown2").style.display = "none";
  window.location.hash = "artistItemsPage";
});
