// To anyone are reading my code
// My code is dynamic. you can easily add or reduce images in the collection just 1 line only!!
// StepI : increase or decrease the value of a variable named "numberOfImages" (line : 7)
const carouselContainer = document.querySelector(".carousel-container");
const carouselSlide = document.querySelector(".carousel-slide");
const circleBtnContainer = document.querySelector(".circleBtnContainer");
const numberOfImages = 7; //---- increase the value up to 12. Because there're 11 images in folder image
const srcImages = [];

createImages();
createCircleBtns();

function createImages() {
  // define src img array
  for (let index = 1; index <= numberOfImages; index++) {
    srcImages.push(`image/natural_wonder${index}.jpg`);
  }
  // clone first & last image
  const lastCloneSrc = srcImages.length;
  srcImages.unshift(`image/natural_wonder${lastCloneSrc}.jpg`);
  const firstCloneSrc = 1;
  srcImages.push(`image/natural_wonder${firstCloneSrc}.jpg`);

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
}
const carouselImages = document.querySelectorAll(".carousel-slide img"); // get all images

function createCircleBtns() {
  for (let index = 0; index < numberOfImages; index++) {
    circleBtn = document.createElement("i");
    circleBtn.classList.add("fas");
    circleBtn.classList.add("fa-circle");
    circleBtn.setAttribute("id", index + 1);
    circleBtnContainer.append(circleBtn);
  }
}
const circleBtns = document.querySelectorAll(".fa-circle");

const transformAnimation = "transform 0.5s ease-in-out";
// event circle buttons
circleBtns.forEach((btn) => {
  btn.addEventListener("click", clickCircleBtn);
});
function clickCircleBtn(event) {
  slideImages(event.target.id);
  carouselSlide.style.transition = transformAnimation;
  counter = event.target.id;
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

// animation slide
let sizeContainer = carouselContainer.clientWidth;
let counter = 1;
function slideImages(count) {
  carouselSlide.style.transform =
    "translateX(" + -sizeContainer * count + "px)";
  focusCircleBtn();
}
slideImages(counter);

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
//Event Arrow Button
nextBtn.addEventListener("click", () => {
  if (counter >= carouselImages.length - 1) return;
  carouselSlide.style.transition = transformAnimation;
  counter++;
  slideImages(counter);
});

prevBtn.addEventListener("click", () => {
  if (counter <= 0) return;
  carouselSlide.style.transition = transformAnimation;
  counter--;
  slideImages(counter);
});

// Carousel Images Mirage
carouselSlide.addEventListener("webkitTransitionEnd", () => {
  if (carouselImages[counter].id === "lastClone") {
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - 2;
    slideImages(counter);
  }
  if (carouselImages[counter].id === "firstClone") {
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
