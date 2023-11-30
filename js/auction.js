const auctionCardDiv = document.querySelector(".auctionCardDiv");
let bidBtn;
let bidForm;

function updateTimerDisplay(timerElement, endTime) {
  const timerInterval = setInterval(function () {
    const now = new Date().getTime();
    const timeRemaining = endTime - now;

    if (timeRemaining <= 0) {
      timerElement.textContent = "Auction ended";
      clearInterval(timerInterval);
    } else {
      const minutes = Math.floor(timeRemaining / 60000);
      const seconds = Math.floor((timeRemaining % 60000) / 1000);
      const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
      timerElement.textContent = `Time left: ${formattedTime}`;
    }
  }, 1000);
}

let amount;
function cardForAuction() {
  auctionCardDiv.innerHTML = "";
  getData();

  parseData
    .filter((itm) => itm.isAuctioning)
    .forEach((itm) => {
      const cardWrapper = document.createElement("div");
      cardWrapper.classList.add("cardWrapper");
      cardWrapper.id = itm.id;
      amount = itm.price / 2;
      cardWrapper.innerHTML = `
        <div class="card" id="${itm.id}">
            <img src="${itm.image}" alt="art-image">
            <div class="cardText">
                <div class="nameAndPrice">
                    <div>
                        <h5 class="itemTitle">${itm.title}</h5>
                        <p class="date">${itm.dateCreated}</p>
                    </div>
                </div>
                <p class="desc">${itm.description}</p>
            </div>
        </div>
        <h3 class="biddingPrice">Starting price ${itm.price / 2}$</h3>
        <h3 class="biddingTimer"></h3>
        <div class="bidInfo">
        <form class="bidForm">
        <span> <input type="number" class="myOffer" placeholder="Your offer">
        <button class="bidBtn">Bid</button>
        </span>
       
        <div class="ulLists">
        <ul class="myBids">Your Bids</ul>
        <ul class="otherBids">Other Bids</ul>
        </div>
        </form>
        </div>`;

      bidBtn = document.querySelectorAll(".bidBtn");
      bidForm = document.querySelectorAll(".bidForm");

      auctionCardDiv.appendChild(cardWrapper);

      const timerElement = cardWrapper.querySelector(".biddingTimer");

      const itemWithTimerStr = localStorage.getItem(`timer_${itm.id}`);
      if (itemWithTimerStr) {
        const itemWithTimer = JSON.parse(itemWithTimerStr);
        const endTime = itemWithTimer.expirationTime;
        updateTimerDisplay(timerElement, endTime);
      } else {
        timerElement.textContent = "Auction ended (No timer data)";
      }
    });
}
cardForAuction();
function bidding() {
  auctionCardDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("bidBtn")) {
      const parentContainer = e.target.closest(".bidForm");
      if (parentContainer) {
        const myOfferInput = document.querySelector(".myOffer");
        if (myOfferInput) {
          const offerValue = myOfferInput.value;
          console.log(offerValue);

          const listItem = document.createElement("li");
          listItem.textContent = offerValue;

          const listItemOther = document.createElement("li");

          const myBidsList = parentContainer.querySelector(".myBids");
          if (myBidsList) {
            myBidsList.appendChild(listItem);
          }

          const formData = new FormData();
          formData.append("amount", amount);

          fetch("https://projects.brainster.tech/bidding/api", {
            method: "POST",
            body: formData,
          }).then((res) =>
            res.json().then((data) => console.log("DATA: ", data))
          );
        }
      }
    }
  });
}

bidding();
