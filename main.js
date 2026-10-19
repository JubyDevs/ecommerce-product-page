const menuIcon = document.getElementById ("menuIcon");
const nav = document.querySelector ("nav");
const closeIcon = document.getElementById ("closeIcon");
const background = document.querySelector (".background");





// Menu Funtionality

menuIcon.addEventListener ('click', () => {
    nav.classList.add ("open");
    background.classList.add ("active");

    closeIcon.addEventListener ('click', () => {
        nav.classList.remove ("open");
        background.classList.remove ("active");

    });
});