const menuIcon = document.getElementById ("menuIcon");
const nav = document.querySelector ("nav");
const closeIcon = document.getElementById ("closeIcon");
const background = document.querySelector (".background");
const slides = document.querySelectorAll (".slide");
const prevBtn = document.getElementById ("prevBtn");
const nextBtn = document.getElementById ("nextBtn");




// Menu Funtionality

menuIcon.addEventListener ('click', () => {
    nav.classList.add ("open");
    background.classList.add ("active");

    closeIcon.addEventListener ('click', () => {
        nav.classList.remove ("open");
        background.classList.remove ("active");

    });
});


// SlideShow Functionnality
let currentIndex = 0;

function showSlide (index) {
    slides.forEach (slide => slide.classList.remove ('slide-active'));
    slides[index].classList.add('slide-active');
}

nextBtn.addEventListener('click', () => {

    currentIndex++;

    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    showSlide(currentIndex);
});

prevBtn.addEventListener('click', () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }

    showSlide(currentIndex);
});