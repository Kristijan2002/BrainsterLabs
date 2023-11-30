let sliderInterval;
let slider2Interval;
let currentImageIndex = 0;

let scrollPosition = 0;
let scrollPosition2 = 0;
const scrollSpeed = 2;
const batchSize = 5;
let imagesAppended = false;
let imagesAppended2 = false;

function scrollImages(slider, direction) {
  if (direction === "right") {
    scrollPosition += scrollSpeed;
    if (
      !imagesAppended &&
      scrollPosition >= slider.scrollWidth - slider.clientWidth
    ) {
      items.forEach((item) => {
        const img = document.createElement("img");
        img.src = item.image;
        img.classList.add("image");

        slider.appendChild(img);
      });

      imagesAppended = true;
    } else if (scrollPosition < slider.scrollWidth - slider.clientWidth) {
      imagesAppended = false;
    }

    if (scrollPosition >= slider.scrollWidth) {
      scrollPosition = 0;
      imagesAppended = false;
    }
  } else if (direction === "left") {
    scrollPosition -= scrollSpeed;
    if (!imagesAppended && scrollPosition <= 0) {
      items.forEach((item) => {
        const img = document.createElement("img");
        img.src = item.image;
        img.classList.add("image");
        slider.appendChild(img);
      });

      imagesAppended = true;
    } else if (scrollPosition > 0) {
      imagesAppended = false;
    }

    if (scrollPosition <= 0) {
      scrollPosition = slider.scrollWidth - slider.clientWidth;
      imagesAppended = false;
    }
  }

  slider.scrollLeft = scrollPosition;
  sliderInterval = requestAnimationFrame(() => scrollImages(slider, direction));
}

function scrollImages2(slider, direction) {
  if (direction === "right") {
    scrollPosition2 += scrollSpeed;
    if (
      !imagesAppended2 &&
      scrollPosition2 >= slider.scrollWidth - slider.clientWidth
    ) {
      items.forEach((item) => {
        const img = document.createElement("img");
        img.src = item.image;
        img.classList.add("image");
        slider.appendChild(img);
      });

      imagesAppended2 = true;
    } else if (scrollPosition2 < slider.scrollWidth - slider.clientWidth) {
      imagesAppended2 = false;
    }

    if (scrollPosition2 >= slider.scrollWidth) {
      scrollPosition2 = 0;
      imagesAppended2 = false;
    }
  } else if (direction === "left") {
    scrollPosition2 -= scrollSpeed;
    if (!imagesAppended2 && scrollPosition2 <= 0) {
      items.forEach((item) => {
        const img = document.createElement("img");
        img.src = item.image;
        img.classList.add("image");
        img.addEventListener(
          "click",
          () => (window.location.hash = "visitorListing")
        );
        slider.appendChild(img);
      });

      imagesAppended2 = true;
    } else if (scrollPosition2 > 0) {
      imagesAppended2 = false;
    }

    if (scrollPosition2 <= 0) {
      scrollPosition2 = slider.scrollWidth - slider.clientWidth;
      imagesAppended2 = false;
    }

    slider.scrollLeft = scrollPosition2;
    slider2Interval = requestAnimationFrame(() =>
      scrollImages2(slider, direction)
    );
  }
}

window.addEventListener("popstate", () => {
  if (location.hash === "#visitorHomePage") {
    let slider = document.querySelector(".slider");
    if (!slider) {
      slider = document.createElement("div");
      slider.classList.add("slider");
      document.querySelector(".sliderBox").appendChild(slider);
    }

    let slider2 = document.querySelector(".slider2");
    if (!slider2) {
      slider2 = document.createElement("div");
      slider2.classList.add("slider2");
      document.querySelector(".sliderBox").appendChild(slider2);
    }

    items.forEach((item) => {
      const img = document.createElement("img");
      img.src = item.image;
      img.classList.add("image");
      img.addEventListener(
        "click",
        () => (window.location.hash = "visitorListing")
      );
      slider.appendChild(img);
    });

    items.forEach((item) => {
      const img = document.createElement("img");
      img.src = item.image;
      img.classList.add("image");
      slider2.appendChild(img);
    });

    slider.addEventListener("mouseenter", () => {
      cancelAnimationFrame(sliderInterval);
    });

    slider.addEventListener("mouseleave", () => {
      sliderInterval = requestAnimationFrame(() =>
        scrollImages(slider, "right")
      );
    });

    slider2.addEventListener("mouseenter", () => {
      cancelAnimationFrame(slider2Interval);
    });

    slider2.addEventListener("mouseleave", () => {
      slider2Interval = requestAnimationFrame(() =>
        scrollImages2(slider2, "left")
      );
    });

    scrollImages(slider, "right");
    scrollImages2(slider2, "left");
  }
});

const hummerBtn = document.querySelector("#hummerBtn");
hummerBtn.addEventListener("click", () => {
  window.location.hash = "auction";
});
document.querySelector("#logo").addEventListener("click", () => {
  location.reload();
});
