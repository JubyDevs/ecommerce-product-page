
const form = document.querySelector("form");
const menuIcon = document.getElementById("menuIcon");
const cart = document.getElementById("cart");
const cartIcon = document.getElementById("cartIcon");
const cartNum = document.querySelector(".cart-num");
const cartEmpty = document.querySelector(".cart-empty");
const cartFilled = document.querySelector(".cart-filled");
const itemNum = document.getElementById("itemNum");
const totalPrice = document.querySelector(".total");
const nav = document.querySelector("nav");
const closeIcon = document.getElementById("closeIcon");
const background = document.querySelector(".background");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const minus = document.getElementById("minusIcon");
const plus = document.getElementById("plusIcon");
const thumbs = document.querySelectorAll(".thumbnail");
const thumbImg = document.querySelectorAll(".thumb");
const mainImg = document.getElementById("mainImg");
const checkOutBtn = document.getElementById("checkOutBtn");
const deleteIcon = document.getElementById("deleteIcon");
let count = document.getElementById("count");

// Menu Functionality

function openMenu() {
    nav.classList.add("open");
    background.classList.add("active");

    menuIcon.setAttribute("aria-expanded", "true");
    nav.removeAttribute("inert");
    nav.setAttribute("aria-hidden", "false");
    background.setAttribute("aria-hidden", "false");

    closeIcon.focus();
}

function closeMenu() {
    nav.classList.remove("open");
    background.classList.remove("active");

    menuIcon.setAttribute("aria-expanded", "false");
    nav.setAttribute("aria-hidden", "true");
    nav.setAttribute("inert", "");
    background.setAttribute("aria-hidden", "true");

    menuIcon.focus();
}

menuIcon.addEventListener("click", openMenu);
closeIcon.addEventListener("click", closeMenu);

document.addEventListener("keydown", e => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
        closeMenu();
    }
});

// Cart Functionality

let isEmpty = true;

function closeCart() {
    cart.style.display = "none";
    cart.setAttribute("aria-hidden", "true");
    cart.setAttribute("inert", "");
    cartIcon.setAttribute("aria-expanded", "false");
}

cartIcon.addEventListener("click", () => {
    const isOpen = cart.style.display === "block";

    if (isOpen) {
        closeCart();
    } else {
        cart.style.display = "block";
        cart.removeAttribute("inert");
        cart.setAttribute("aria-hidden", "false");
        cartIcon.setAttribute("aria-expanded", "true");

        if (!isEmpty) {
            cartEmpty.style.display = "none";
            cartFilled.classList.add("show");
        }
    }
});

document.addEventListener("keydown", e => {
    if (e.key === "Escape" && cart.style.display === "block") {
        closeCart();
        cartIcon.focus();
    }
});

// Slideshow Functionality

let currentIndex = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("slide-active", i === index);
        slide.setAttribute("aria-hidden", i === index ? "false" : "true");
    });
}

showSlide(currentIndex);

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
});

// Quantity Functionality

count.value = 0;
count.min = 0;
count.step = 1;

minus.addEventListener("click", () => {
    const quantity = Number(count.value);
    count.value = Math.max(0, quantity - 1);
});

plus.addEventListener("click", () => {
    const quantity = Number(count.value);
    count.value = Math.max(0, quantity) + 1;
});

// Add to Cart Functionality

let total;

function calculate(quantity) {
    total = 125 * quantity;
    return total;
}

form.addEventListener("submit", e => {
    e.preventDefault();

    const quantity = Number(count.value);

    if (!Number.isInteger(quantity) || quantity <= 0) {
        cartNum.classList.remove("show");
        cartEmpty.style.display = "block";
        count.focus();
        return;
    }

    cartNum.textContent = quantity;
    itemNum.textContent = quantity;
    calculate(quantity);
    totalPrice.textContent = total;

    cartNum.classList.add("show");
    cartEmpty.style.display = "none";
    cartFilled.classList.add("show");

    isEmpty = false;
});

// Delete cart item

deleteIcon.addEventListener("click", () => {
    cartFilled.classList.remove("show");
    cartEmpty.style.display = "block";
    cartNum.classList.remove("show");

    itemNum.textContent = "0";
    totalPrice.textContent = "0";
    isEmpty = true;
});

// Checkout

checkOutBtn.addEventListener("click", () => {
    closeCart();

    cartNum.classList.remove("show");
    cartFilled.classList.remove("show");
    cartEmpty.style.display = "block";

    itemNum.textContent = "0";
    totalPrice.textContent = "0";
    isEmpty = true;

    form.reset();
    count.value = 0;

    cartIcon.focus();
});

// Thumbnail Functionality

thumbs.forEach((thumb) => {
    function selectThumbnail() {
        thumbs.forEach(t => {
            t.classList.remove("active");
            t.setAttribute("aria-pressed", "false");
        });

        thumb.classList.add("active");
        thumb.setAttribute("aria-pressed", "true");

        mainImg.style.opacity = "0";

        mainImg.addEventListener("transitionend", function handleTransition() {
            mainImg.removeEventListener("transitionend", handleTransition);
            mainImg.style.opacity = "1";
        }, { once: true });

        mainImg.src = thumb.dataset.large;
    }

    thumb.addEventListener("click", selectThumbnail);

    // Keyboard support for thumbnails that use role="button".
    thumb.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            selectThumbnail();
        }
    });
});
