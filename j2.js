// Image slideshow logic
const images = [
    "./assets1/1.jpg",
    "./assets1/2.jpg",
    "./assets1/3.jpg",
    "./assets1/4.jpg",
    "./assets1/5.jpg",
    "./assets1/6.jpg",
];

let currentIndex = 0;
const slideshowImage = document.getElementById("slideshowImage");

function changeImage() {
    currentIndex = (currentIndex + 1) % images.length; // Loop through images
    slideshowImage.src = images[currentIndex];
}

// Change image every 2 seconds
setInterval(changeImage, 2000);