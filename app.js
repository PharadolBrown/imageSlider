const carouselSlide = document.querySelector(".carousel-slide");
const carouselContainer = document.querySelector(".carousel-container");

// define src img array
const numberOfImages = 7;
const srcImages = [];

for (let index = 1; index <= numberOfImages; index++) {
  srcImages.push(`image/natural_wander${index}.jpg`);
}
// clone first & last image
const lastCloneSrc = srcImages.length;
srcImages.unshift(`image/natural_wander${lastCloneSrc}.jpg`);
const firstCloneSrc = 1;
srcImages.push(`image/natural_wander${firstCloneSrc}.jpg`);

//create element img & add first , last clone class to some img
for (let index = 0; index <= srcImages.length - 1; index++) {
  const image = document.createElement("img");
  image.src = srcImages[index];
  let idImg = "";
  index == 0
    ? (idImg = "lastClone")
    : index == srcImages.length - 1
    ? (idImg = "firstClone")
    : (idImg = index);
  image.setAttribute("id", idImg);
  carouselSlide.append(image);
}
const carouselImages = document.querySelectorAll(".carousel-slide img");  // get images


//create element circle button
const circleBtnContainer = document.querySelector(".circleBtnContainer");
for (let index = 0; index < numberOfImages; index++) {
  circleBtn = document.createElement("i");
  circleBtn.classList.add("fas");
  circleBtn.classList.add("fa-circle");
  circleBtn.setAttribute("id", index + 1);
  circleBtnContainer.append(circleBtn);
}
const circleBtns = document.querySelectorAll(".fa-circle");



function clickCircleBtn(event) {
  // event.target.classList.add("clicked");
  slideImages(event.target.id);
  carouselSlide.style.transition = "transform 0.5s ease-in-out";
  console.log("circle count from " + counter);
  counter = event.target.id;
  console.log("circle count to " + counter);
  focusCircleBtn();
}

function focusCircleBtn() {
  for (let index = 1; index <= numberOfImages; index++) {
    if (counter == index) {
      circleBtns[index - 1].classList.add("now");
    } else {
      circleBtns[index - 1].classList.remove("now");
    }
  }
}

circleBtns.forEach((btn) => {
  btn.addEventListener("click", clickCircleBtn);
  //
});


//Counter
let counter = 1;
console.log("define counter : " + counter);

//Buttons
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

let sizeContainer = carouselContainer.clientWidth;

function slideImages(count) {
  console.log(" now counter : " + count);
  carouselSlide.style.transform ="translateX(" + -sizeContainer * count + "px)";
  // console.log("-sizeContainer" + sizeContainer + "*" + count);
  focusCircleBtn();
}
slideImages(counter);

//Button Listeners
nextBtn.addEventListener("click", () => {
  if (counter >= carouselImages.length - 1) return;
  carouselSlide.style.transition = "transform 0.5s ease-in-out";
  counter++;
  slideImages(counter);
});

prevBtn.addEventListener("click", () => {
  if (counter <= 0) return;
  carouselSlide.style.transition = "transform 0.5s ease-in-out";
  counter--;
  slideImages(counter);
});

// Carousel Images
carouselSlide.addEventListener("webkitTransitionEnd", () => {
  if (carouselImages[counter].id === "lastClone") {
    console.log("transition slide is working");
    console.log(carouselImages[counter]);
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - 2;
    slideImages(counter);
  }
  if (carouselImages[counter].id === "firstClone") {
    console.log("transition slide is working");
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - counter;
    slideImages(counter);
  }
});

//set when screen size is has changes
window.onresize = function () {
  sizeContainer = carouselContainer.clientWidth;
  slideImages(counter);
};
