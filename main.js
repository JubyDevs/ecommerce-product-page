const form = document.querySelector ("form");
const menuIcon = document.getElementById ("menuIcon");
const cart = document.getElementById ("cart");
const cartIcon = document.getElementById ("cartIcon");
const cartNum = document.querySelector (".cart-num");
const cartEmpty = document.querySelector (".cart-empty");
const cartFilled = document.querySelector (".cart-filled");
const itemNum = document.getElementById ("itemNum");
const totalPrice = document.querySelector (".total");
const nav = document.querySelector ("nav");
const closeIcon = document.getElementById ("closeIcon");
const background = document.querySelector (".background");
const slides = document.querySelectorAll (".slide");
const prevBtn = document.getElementById ("prevBtn");
const nextBtn = document.getElementById ("nextBtn");
const minus = document.getElementById ("minusIcon");
const plus = document.getElementById ("plusIcon");
const thumbs = document.querySelectorAll (".thumbnail");
const thumbImg = document.querySelectorAll (".thumb");
const mainImg = document.getElementById ("mainImg");
const checkOutBtn = document.getElementById ("checkOutBtn");
const deleteIcon = document.getElementById ("deleteIcon");
let count = document.getElementById ("count");




// Menu Funtionality

menuIcon.addEventListener ('click', () => {
    nav.classList.add ("open");
    background.classList.add ("active");

    closeIcon.addEventListener ('click', () => {
        nav.classList.remove ("open");
        background.classList.remove ("active");

    });
});

//Cart Functionaality

let isEmpty = true;

cartIcon.addEventListener ('click', () => {

    if (cart.style.display === '') {
        cart.style.display = "block";

        if (!isEmpty) {
            cartEmpty.style.display = 'none';
            cartFilled.classList.add ('show');
        }
    } else {
        cart.style.display = "";
    }
})

// SlideShow Functionality
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

// Count Funtionality
count.value = 0;

minus.addEventListener ('click', () => {

    if (count.value == 0) {
        count.value = 0;
    } else  {
        count.value--;
    };
});

plus.addEventListener ('click', () => {
    count.value++;
})

// add to cart function 

let total;

function calculate (count) {
    total = 125 * count;
}



form.addEventListener ("submit", e => {

    e.preventDefault();

    if (count.value == 0) {
        cartNum.classList.remove ('show');
        cartEmpty.style.display = 'block';
        return;
    } else {
        cartNum.textContent = count.value;
        itemNum.textContent = count.value;
        calculate(count.value);
        totalPrice.textContent = total;
        cartNum.classList.add ('show');

        isEmpty = false;

        deleteIcon.addEventListener ('click', () => {
            cartFilled.classList.remove ('show');
            cartEmpty.style.display = "block";
            cartNum.classList.remove ('show');
        });

        checkOutBtn.addEventListener ('click', () => {
            cart.style.display = 'none';
            cartNum.classList.remove ('show');
            form.reset();
        });
    };
});


// thumbnail Funtionality

thumbs.forEach (thumb => {
    thumb.addEventListener ('click', () => {

        thumbs.forEach ( t=> t.classList.remove ('active'));
        thumb.classList.add('active');

        mainImg.style.opacity = "0";

        setTimeout(() => {
            mainImg.src = thumb.dataset.large;
            mainImg.style.opacity = '1';
        }, 150);
    });
});



