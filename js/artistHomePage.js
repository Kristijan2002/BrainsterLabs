const navH1 = document.querySelector("#artistName");
const burgerMenu = document.querySelector(".burgerMenu");
const itemsNavigator = document.querySelector("#itemsNavigator");
const totalItemsSold = document.querySelector("#totalItemsSold");
const totalIncome = document.querySelector("#totalIncome");

chooseArtis.addEventListener("click", function () {
  const artistItems = items.filter((item) => item.artist === option);
  const soldItems = artistItems.filter((item) => item.dateSold);
  const totalIncomeValue = soldItems.reduce((sum, item) => {
    return sum + item.priceSold;
  }, 0);
  totalIncome.textContent = `$${totalIncomeValue}`;
  totalItemsSold.textContent = `${soldItems.length}/${artistItems.length}`;
  filterDataAndRefreshChart("fourteen");
  navH1.textContent = `${option}`;
});

burgerMenu.addEventListener("click", function () {
  document.querySelector(".dropDown").style.display = "block";
});

itemsNavigator.addEventListener("click", function () {
  location.hash = "#artistItemsPage";
});

const today = new Date();

const dynamicLabels = [];
let timeFrameDays = 14;
for (let i = 0; i < timeFrameDays; i++) {
  const date = new Date(today);
  date.setDate(today.getDate() - i);
  dynamicLabels.unshift(new Date(date).getDate());
}

const ctx = document.getElementById("myChart").getContext("2d");

const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: dynamicLabels,
    datasets: [
      {
        label: "",
        data: [7],
        backgroundColor: "#A16A5E",
        borderColor: "#A16A5E",
        borderWidth: 1,
      },
    ],
  },
  options: {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  },
});

function updateChartWithData(data, dynamicLabels) {
  myChart.data.labels = dynamicLabels;

  if (dynamicLabels && dynamicLabels.length) {
    myChart.data.datasets[0].data = dynamicLabels.map(
      (label) => data[label] || 0
    );
  }

  myChart.update();
}

function filterDataAndRefreshChart(timeFrame) {
  let filteredData = [];
  let timeFrameDays;

  if (timeFrame === "seven") {
    timeFrameDays = 7;
  } else if (timeFrame === "fourteen") {
    timeFrameDays = 14;
  } else if (timeFrame === "thirty") {
    timeFrameDays = 30;
  }

  const accumulatedDays = [];
  items
    .filter((item) => item.artist === option)
    .forEach((element) => {
      const date = new Date(element.dateSold);
      const day = date.getDate();
      if (!accumulatedDays[day]) {
        accumulatedDays[day] = 1;
      } else {
        accumulatedDays[day] = accumulatedDays[day] + 1;
      }
    });

  const today = new Date();
  const dynamicLabels = [];

  if (timeFrame === "thirty") {
    for (let i = 0; i < timeFrameDays; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dynamicLabels.unshift(new Date(date).getDate());
    }
  } else {
    for (let i = 0; i < timeFrameDays; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dynamicLabels.unshift(new Date(date).getDate());
    }
  }

  updateChartWithData(accumulatedDays, dynamicLabels);
}

const sevenDays = document.querySelector("#sevenDays");
const fourteenDays = document.querySelector("#fourteenDays");
const thirtyDays = document.querySelector("#thirtyDays");

sevenDays.addEventListener("click", () => {
  filterDataAndRefreshChart("seven");
  sevenDays.parentElement.classList.add("selected");
  fourteenDays.parentElement.classList.remove("selected");
  thirtyDays.parentElement.classList.remove("selected");
});

fourteenDays.addEventListener("click", () => {
  filterDataAndRefreshChart("fourteen");
  fourteenDays.parentElement.classList.add("selected");
  sevenDays.parentElement.classList.remove("selected");
  thirtyDays.parentElement.classList.remove("selected");
});

thirtyDays.addEventListener("click", () => {
  filterDataAndRefreshChart("thirty");
  thirtyDays.parentElement.classList.add("selected");
  sevenDays.parentElement.classList.remove("selected");
  fourteenDays.parentElement.classList.remove("selected");
});

document.querySelector("#logo2").addEventListener("click", () => {
  location.reload();
});
document.querySelector("#homeNavigator").addEventListener("click", () => {
  location.reload();
});
document.querySelector("#auctionNavigator").addEventListener("click", () => {
  window.location.hash = "auction";
});
