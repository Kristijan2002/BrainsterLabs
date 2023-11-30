const artistItemsBox = document.querySelector("#artistItemsBox");
const saveBtn = document.querySelector(".save");
let parseData;
let item;
let card;
let cardId;

window.addEventListener("load", () => {
  if (!localStorage.getItem("items")) {
    localStorage.setItem("items", JSON.stringify(items));
  }
});

function selectBtns() {
  const sendToAuction = document.querySelectorAll(".sendToAuction");
  const publish = document.querySelectorAll(".publish");
  const unpublish = document.querySelectorAll(".unpublish");
  const remove = document.querySelectorAll(".remove");
  const edit = document.querySelectorAll(".edit");

  publish.forEach((publishClick) => {
    const card = publishClick.parentElement.parentElement;
    const cardId = +card.id;
    const item = parseData.find((itm) => itm.id === cardId);

    publishClick.addEventListener("click", (e) => {
      e.preventDefault();
      item.isPublished = true;

      const itemIndex = parseData.findIndex((itm) => itm.id === item.id);
      if (itemIndex !== -1) {
        parseData[itemIndex] = item;
        localStorage.setItem("items", JSON.stringify(parseData));
        getData();
        createCard();
      }
    });
  });

  unpublish.forEach((unpublishClick) => {
    const card = unpublishClick.parentElement.parentElement;
    const cardId = +card.id;
    const item = parseData.find((itm) => itm.id === cardId);

    unpublishClick.addEventListener("click", (e) => {
      e.preventDefault();
      item.isPublished = false;

      const itemIndex = parseData.findIndex((itm) => itm.id === item.id);

      if (itemIndex !== -1) {
        parseData[itemIndex] = item;
        localStorage.setItem("items", JSON.stringify(parseData));
      }
      getData();
      createCard();
    });
  });

  remove.forEach((removeClick) => {
    removeClick.addEventListener("click", (e) => {
      e.preventDefault();

      const card = removeClick.parentElement.parentElement;
      const cardId = +card.id;

      const itemIndex = parseData.findIndex((item) => item.id === cardId);

      if (itemIndex !== -1) {
        parseData.splice(itemIndex, 1);

        localStorage.setItem("items", JSON.stringify(parseData));
        getData();
        createCard();
      }
    });
  });

  sendToAuction.forEach((sendToAuctionClick) => {
    sendToAuctionClick.addEventListener("click", (e) => {
      e.preventDefault();

      const card = sendToAuctionClick.parentElement.parentElement;
      const cardId = +card.id;

      const item = parseData.find((item) => item.id === cardId);

      if (item) {
        const timerMinutes = 2;
        const expirationTime = Date.now() + timerMinutes * 60 * 1000;

        const itemWithTimer = {
          item: item,
          expirationTime: expirationTime,
        };
        localStorage.setItem(`timer_${item.id}`, JSON.stringify(itemWithTimer));

        item.isAuctioning = true;

        const itemIndex = parseData.findIndex((item) => item.id === cardId);
        if (itemIndex !== -1) {
          parseData[itemIndex] = item;
          localStorage.setItem("items", JSON.stringify(parseData));
        }

        getData();
        createCard();
      }
    });
  });

  edit.forEach((edit) => {
    edit.addEventListener("click", () => {
      saveBtn.style.display = "block";
      addNewItemBtn.style.display = "none";
      window.location.hash = "artistAddNewItem";
      card = edit.parentElement.parentElement;
      cardId = +card.id;
      item = parseData.find((itm) => itm.id === cardId);

      if (item) {
        isPublished.checked = item.isPublished;
        inputTitle.value = item.title;
        inputDesc.value = item.description;
        inputType.value = item.type;
        inputPrice.value = item.price;
        inputImgUrl.value = item.image;
        camera.src = item.image;
        camera.style.width = "90%";
        cameraText.style.display = "none";
      }
    });
  });
}

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.hash = "artistItemsPage";
  item.isPublished = isPublished.checked;
  item.title = inputTitle.value;
  item.description = inputDesc.value;
  item.type = inputType.value;
  item.price = inputPrice.value;
  item.image = inputImgUrl.value;

  isPublished.checked = "";
  inputTitle.value = "";
  inputDesc.value = "";
  inputType.value = "";
  inputPrice.value = "";
  inputImgUrl.value = "";
  camera.src = "./img/camera.png";
  camera.style.width = "20%";
  cameraText.style.display = "block";

  itemIndex = parseData.findIndex((itm) => itm.id === item.id);

  if (itemIndex !== -1) {
    parseData[itemIndex] = item;
    localStorage.setItem("items", JSON.stringify(parseData));
    getData();
    createCard();
  }
});

itemsNavigator.addEventListener("click", () => {
  getData();
  createCard();
});

function getData() {
  const itemsLs = localStorage.getItem("items");
  parseData = JSON.parse(itemsLs);
}

function createCard() {
  artistItemsBox.innerHTML = "";
  parseData.forEach((itm) => {
    if (itm.artist === artistName.outerText) {
      artistItemsBox.innerHTML += `
        <div class="cardWrapper">
        <div class="card" id="${itm.id}">   
        <img src="${itm.image}", alt="art-image">
        <div class="cardText">
        <div class="nameAndPrice">
                    <div>
                        <h5 class="itemTitle">${itm.title}</h5>
                        <p class="date">${itm.dateCreated}</p>
                    </div>
                    <span class="price">$${itm.price}</span>
                </div>
                <p class="desc">${itm.description}</p>
            </div>
        <div class="cardBtns">
            <button class="${
              itm.isAuctioning ? "onAuction" : "sendToAuction"
            }">${itm.isAuctioning ? "On Auction" : "Send to Auction"}</button>
            <button class="${itm.isPublished ? "unpublish" : "publish"}">${
        itm.isPublished ? "Unpublish" : "Publish"
      }</button>
            <button class="remove">Remove</button>
            <button class="edit">Edit</button>
        </div>
      </div>
      </div>`;
    }
  });
  selectBtns();
}

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.hash = "artistItemsPage";
});

// -------------------------------------------------------------------------------------------
document.querySelector("#burgerMenu1").addEventListener("click", function () {
  document.querySelector(".dropDown1").style.display = "block";
});
document.querySelector(".logo3").addEventListener("click", () => {
  location.reload();
});
document.querySelector("#homeNavigator1").addEventListener("click", () => {
  location.reload();
});
document.querySelector("#auctionNavigator1").addEventListener("click", () => {
  window.location.hash = "auction";
  document.querySelector(".dropDown1").style.display = "none";
});
document.querySelector("#itemsNavigator1").addEventListener("click", () => {
  document.querySelector(".dropDown1").style.display = "none";
});
