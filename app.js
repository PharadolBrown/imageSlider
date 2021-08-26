// To anyone are reading my code
// My code is dynamic. you can easily add or reduce images in the collection just 1 line only!!
// StepI : increase or decrease the value of a variable named "numberOfImage" (line 8)

const carouselSlide = document.querySelector(".carousel-slide");
const carouselContainer = document.querySelector(".carousel-container");

// define src img array
const numberOfImages = 3;
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
  index == 0
    ? (idImg = "lastClone")
    : index == srcImages.length - 1
    ? (idImg = "firstClone")
    : (idImg = index);
  image.setAttribute("id", idImg);
  carouselSlide.append(image);
}

//create element circle button
const circleBtnContainer = document.querySelector(".circleBtnContainer");
for (let index = 0; index < numberOfImages; index++) {
  console.log("create circle Button : " + index);
  circleBtn = document.createElement("i");
  circleBtn.classList.add("fas");
  circleBtn.classList.add("fa-circle");
  circleBtn.setAttribute("id", index+1);
  circleBtnContainer.append(circleBtn);
}
const circleBtns = document.querySelectorAll(".fa-circle");
console.log(circleBtns)

//Counter
let counter = 1;


function clickCircleBtn(event) {
  event.target.classList.add("clicked");
  carouselSlide.style.transform =
    "translateX(" + -sizeContainer * event.target.id + "px)";
  carouselSlide.style.transition = "transform 0.5s ease-in-out";
  counter=event.target.id;
  console.log(counter)
}

circleBtns.forEach((btn)=>{
  btn.addEventListener('click',clickCircleBtn)
})


const carouselImages = document.querySelectorAll(".carousel-slide img");

//Buttons
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");


let sizeContainer = carouselContainer.clientWidth;

function slideImages(count) {
  carouselSlide.style.transform =
    "translateX(" + -sizeContainer * count + "px)";
}
slideImages();

//Button Listeners
nextBtn.addEventListener("click", () => {
  if (counter >= carouselImages.length - 1) return;
  carouselSlide.style.transition = "transform 0.5s ease-in-out";
  console.log("from counter : "+counter+"next");
  counter++;
  console.log("to counter " + counter+"next");
  carouselSlide.style.transform = slideImages(counter);
});

prevBtn.addEventListener("click", () => {
  if (counter <= 0) return;
  console.log("from counter : " + counter + "prev");
  carouselSlide.style.transition = "transform 0.5s ease-in-out";
  console.log("to counter " + counter + "prev");
  counter--;
  carouselSlide.style.transform = slideImages(counter);
});

// Carousel Images
carouselSlide.addEventListener("webkitTransitionEnd", () => {
  console.log("start transition working");
  if (carouselImages[counter].id === "lastClone") {
    console.log("transition slide is working");
    console.log(carouselImages[counter]);
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = slideImages(counter);
  }
  if (carouselImages[counter].id === "firstClone") {
    console.log("transition slide is working");
    console.log(carouselImages[counter]);
    console.log(`${counter}=====${carouselImages.length - counter}`);
    console.log("imagesLength : " + carouselImages.length);

    carouselSlide.style.transition = "none";
    counter = carouselImages.length - counter;
    carouselSlide.style.transform = slideImages(counter);
  }
});

//set when screen size is has changes
window.onresize = function () {
  sizeContainer = carouselContainer.clientWidth;
  console.log("resize container to" + sizeContainer);
  carouselSlide.style.transform = slideImages(counter);
};
