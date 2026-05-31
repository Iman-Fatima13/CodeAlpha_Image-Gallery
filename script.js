
const cards = document.querySelectorAll(".card");
const images = document.querySelectorAll(".card img");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.getElementById("close");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const buttons = document.querySelectorAll(".filters button");
const search = document.getElementById("search");

const zoomInBtn = document.getElementById("zoomIn");
const zoomOutBtn = document.getElementById("zoomOut");


const rotateBtn = document.getElementById("rotateBtn");


const brightness = document.getElementById("brightness");
const contrast = document.getElementById("contrast");

const grayBtn = document.getElementById("grayBtn");
const resetBtn = document.getElementById("resetBtn");

let currentIndex = 0;

let scale = 1;
let rotation = 0;
let grayscale = false;


images.forEach((img, index) => {

  img.addEventListener("click", () => {

    currentIndex = index;

    showImage();

    lightbox.style.display = "flex";

  });

});



function showImage(){

  lightboxImg.src = images[currentIndex].src;

}


nextBtn.addEventListener("click", () => {

  currentIndex++;

  if(currentIndex >= images.length){
    currentIndex = 0;
  }

  resetTransform();

  showImage();

});


prevBtn.addEventListener("click", () => {

  currentIndex--;

  if(currentIndex < 0){
    currentIndex = images.length - 1;
  }

  resetTransform();

  showImage();

});



closeBtn.addEventListener("click", () => {

  lightbox.style.display = "none";

});


lightbox.addEventListener("wheel", (e) => {

  e.preventDefault();

  if(e.deltaY < 0){

    scale += 0.1;

  }
  else{

    if(scale > 0.1){
      scale -= 0.1;
    }

  }

  updateTransform();

});
  

buttons.forEach(button => {

  button.addEventListener("click", () => {

    document.querySelector(".active")
    .classList.remove("active");

    button.classList.add("active");

    const filter = button.dataset.filter;

    cards.forEach(card => {

      if(filter === "all"){

        card.style.display = "block";

      }
      else{

        if(card.classList.contains(filter)){

          card.style.display = "block";

        }
        else{

          card.style.display = "none";

        }

      }

    });

  });

});



search.addEventListener("keyup", () => {

  const value = search.value.toLowerCase();

  cards.forEach(card => {

    if(card.className.toLowerCase().includes(value)){

      card.style.display = "block";

    }
    else{

      card.style.display = "none";

    }

  });

});

function applyFilters(){

  lightboxImg.style.filter = `
  
  brightness(${brightness.value}%)

  contrast(${contrast.value}%)

  ${grayscale ? "grayscale(100%)" : ""}

  `;

}



brightness.addEventListener("input", applyFilters);



contrast.addEventListener("input", applyFilters);



grayBtn.addEventListener("click", () => {

  grayscale = !grayscale;

  applyFilters();

});


resetBtn.addEventListener("click", () => {

  brightness.value = 100;

  contrast.value = 100;

  grayscale = false;

  scale = 1;

  rotation = 0;

  applyFilters();

  updateTransform();

});


rotateBtn.addEventListener("click", () => {

  rotation += 90;

  updateTransform();

});

zoomOutBtn.addEventListener("click", () => {

  if(scale > 0.1){

    scale -= 0.1;

  }

  updateTransform();

});
;


zoomOutBtn.addEventListener("click", () => {

  if(scale > 0.4){

    scale -= 0.2;

  }

  updateTransform();

});



function updateTransform(){

  lightboxImg.style.transform =

  `scale(${scale}) rotate(${rotation}deg)`;

}


function resetTransform(){

  scale = 1;

  rotation = 0;

  grayscale = false;

  brightness.value = 100;

  contrast.value = 100;

  updateTransform();

  applyFilters();

}