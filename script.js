var slideshow = document.getElementById("slideshow");
var slides = [
  "https://www.ethicalconsumer.org/sites/default/files/styles/primary_image_large/public/images/2021-11/Fast-fashion.jpg?h=a2921b4c&itok=4lb15rou",
  "https://images.squarespace-cdn.com/content/v1/5bc48c0bb2cf795f04afac54/1610978803203-R6KHDIHLRT9FYHVLOJOM/r+%E2%80%9C3+out+of+5+fast+fashion+items+end+up+in+a+landfill%E2%80%9D_.jpg",
  "https://images.squarespace-cdn.com/content/v1/5981c7129f7456741cde6662/1506605681248-HEC87ZZKF9R1OG5331GK/FASHION+%26+GREENHOUSE+GAS+EMISSIONS",
"https://ichef.bbci.co.uk/news/976/cpsprodpb/14087/production/_102755028_gettyimages-468186160.jpg",
  "https://www.worlds-finest-wool.com/wp-content/uploads/2020/12/fast-fashion-live-cycle.jpg",
  "https://assets-global.website-files.com/5f7aa56d48dec31d4a24db4f/60b07ebd55d028e407e07901_FastFashionAwareness.jpeg",
  "https://miro.medium.com/max/1400/1*8K4nGMlL-SLouqO3gvZzRQ.jpeg",
  
];
var slideshowHeight = 800;
var slideshowWidth = 1500;
var fullWidth = slideshowWidth*slides.length;
var slideContainer = document.createElement("div");

slideshow.style.height = slideshowHeight+"px";
slideshow.style.width = slideshowWidth+"px";
slideContainer.style.height = slideshowHeight+"px";
slideContainer.style.width = fullWidth+"px";
function createSlide(img){
  let slide = document.createElement("div");
  if(img == slides[0]){
    slide.id="firstSlide";
  }
  slide.classList.add("slide");
  slideContainer.appendChild(slide);
  slide.style.display = "inline-block";
  slide.style.height = slideshowHeight+"px";
  slide.style.width = slideshowWidth+"px";
  slide.style.backgroundImage = "url('"+img+"')";
  slide.style.backgroundSize = "cover";
  slide.style.backgroundPositon = "center";
  slideshow.appendChild(slideContainer);
}
slides.forEach(img => createSlide(img));

var sliding = false;

function slide(){
  if (sliding == false){
    clearInterval(time)
    sliding = true;
    let firstSlide = document.getElementById("firstSlide");
    firstSlide.style.marginLeft = -1*slideshowWidth+"px";
    setTimeout(function(){
      var first = slides.shift();
      slides.push(first);
      slideContainer.innerHTML="";
      slides.forEach(img => createSlide(img));
      sliding = false;
      time = setInterval(slide,6000);
    },1000);
  }
}
function slideBack(){
  if (sliding == false){
    clearInterval(time)
    sliding = true;
    var last = slides.pop();
    slides.unshift(last);
    slideContainer.innerHTML="";
    slides.forEach(img => createSlide(img));
    let firstSlide = document.getElementById("firstSlide");
    firstSlide.style.marginLeft = -1*slideshowWidth+"px";
    setTimeout(function(){
      firstSlide.style.marginLeft = 0;
    },10);
    setTimeout(function(){
      sliding = false;
      time = setInterval(slide,6000);
    },1000);
  }
}

var time = setInterval(slide,6000);

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dots = Array.from(document.querySelectorAll(".dot"));

let button = document.querySelector(".like-button");

button.addEventListener("click", function(e) {
  e.preventDefault();
  this.classList.toggle("active");
  this.classList.add("animated");
  generateClones(this);
});

function generateClones(button) {
  let clones = randomInt(2, 4);
  for (let it = 1; it <= clones; it++) {
    let clone = button.querySelector("svg").cloneNode(true),
      size = randomInt(5, 16);
    button.appendChild(clone);
    clone.setAttribute("width", size);
    clone.setAttribute("height", size);
    clone.style.position = "absolute";
    clone.style.transition =
      "transform 0.5s cubic-bezier(0.12, 0.74, 0.58, 0.99) 0.3s, opacity 1s ease-out .5s";
    let animTimeout = setTimeout(function() {
      clearTimeout(animTimeout);
      clone.style.transform =
        "translate3d(" +
        (plusOrMinus() * randomInt(10, 25)) +
        "px," +
        (plusOrMinus() * randomInt(10, 25)) +
        "px,0)";
      clone.style.opacity = 0;
    }, 1);
    let removeNodeTimeout = setTimeout(function() {
      clone.parentNode.removeChild(clone);
      clearTimeout(removeNodeTimeout);
    }, 900);
    let removeClassTimeout = setTimeout( function() {
      button.classList.remove("animated")
    }, 600);
  }
}

function plusOrMinus() {
  return Math.random() < 0.5 ? -1 : 1;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
      
  });
});


function reveal() {
  var reveals = document.querySelectorAll (".reveal")
  for (var i = 0; i<reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add ("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);