//My code is dynamic. you can easily add or reduce images in the collection just 1 line only!!
//StepI : increase or decrease the value of a variable named "numberOfImage" (line 8)

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
console.log(srcImages);

//create element img & add first , last clone class to some img
for (let index = 0; index <= srcImages.length - 1; index++) {
  const image = document.createElement("img");
  image.src = srcImages[index];
  let idImg = "";
  index == 0? (idImg = "lastClone"): 
  index == srcImages.length - 1 ? (idImg = "firstClone") : idImg = index;
  image.setAttribute("id", idImg);
  carouselSlide.append(image);
}
const carouselImages = document.querySelectorAll(".carousel-slide img");

//Buttons
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

//Counter
let counter = 1;
let sizeContainer = carouselContainer.clientWidth;

function slideImages() {
  carouselSlide.style.transform =
    "translateX(" + -sizeContainer * counter + "px)";
}
slideImages();

//Button Listeners
nextBtn.addEventListener("click", () => {
  if (counter >= carouselImages.length - 1) return;
  carouselSlide.style.transition = "transform 0.5s ease-in-out";
  counter++;
  console.log("next to img counter " + counter);
  carouselSlide.style.transform = slideImages();
});

prevBtn.addEventListener("click", () => {
  if (counter <= 0) return;
  carouselSlide.style.transition = "transform 0.5s ease-in-out";
  console.log("prev to img counter" + counter);
  counter--;
  carouselSlide.style.transform = slideImages();
});

// Carousel Images
carouselSlide.addEventListener("webkitTransitionEnd", () => {
  console.log("start transition working");
  if (carouselImages[counter].id === "lastClone") {
    console.log("transition slide is working");
    console.log(carouselImages[counter]);

    carouselSlide.style.transition = "none";
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = slideImages();
  }
  if (carouselImages[counter].id === "firstClone") {
    console.log("transition slide is working");
    console.log(carouselImages[counter]);
    console.log(`${counter}=====${carouselImages.length - counter}`);
    console.log("imagesLength : " + carouselImages.length);

    carouselSlide.style.transition = "none";
    counter = carouselImages.length - counter; 
    carouselSlide.style.transform = slideImages();
  }
});

//set when screen size is has changes
window.onresize = function () {
  sizeContainer = carouselContainer.clientWidth;
  console.log("resize container to" + sizeContainer);
  carouselSlide.style.transform = slideImages();
};