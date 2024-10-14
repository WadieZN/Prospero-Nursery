const carousel = document.querySelector('.carousel');
const slides = Array.from(document.querySelectorAll('.slide'));
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const pagination = document.querySelector('.carousel-pagination');

let currentIndex = 0;

slides.forEach((_, index) => {
    const dot = document.createElement('span');
    if (index === currentIndex) dot.classList.add('active');
    pagination.appendChild(dot);
});

const updateCarousel = () => {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    document.querySelectorAll('.carousel-pagination span').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
};

const moveToNextSlide = () => {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
};

const moveToPrevSlide = () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = slides.length - 1;
    }
    updateCarousel();
};

rightArrow.addEventListener('click', moveToNextSlide);
leftArrow.addEventListener('click', moveToPrevSlide);

pagination.addEventListener('click', (e) => {
    if (e.target.tagName === 'SPAN') {
        currentIndex = Array.from(pagination.children).indexOf(e.target);
        updateCarousel();
    }
});

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

const setPositionByIndex = () => {
    currentTranslate = currentIndex * -carousel.clientWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
};

const setSliderPosition = () => {
    carousel.style.transform = `translateX(${currentTranslate}px)`;
};

const touchStart = (index) => (event) => {
    currentIndex = index;
    startPos = getPositionX(event);
    isDragging = true;
    carousel.classList.add('grabbing');
};

const touchMove = (event) => {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
        setSliderPosition();
    }
};

const touchEnd = () => {
    isDragging = false;
    carousel.classList.remove('grabbing');
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < slides.length - 1) {
        currentIndex += 1;
    }

    if (movedBy > 100 && currentIndex > 0) {
        currentIndex -= 1;
    }

    setPositionByIndex();
    updateCarousel();
};

const getPositionX = (event) => {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
};

    slides.forEach((slide, index) => {
        const slideImage = slide;
        slideImage.addEventListener('dragstart', (e) => e.preventDefault());

        slideImage.addEventListener('touchstart', touchStart(index));
        slideImage.addEventListener('touchend', touchEnd);
        slideImage.addEventListener('touchmove', touchMove);

        slideImage.addEventListener('mousedown', touchStart(index));
        slideImage.addEventListener('mouseup', touchEnd);
        slideImage.addEventListener('mouseleave', touchEnd);
        slideImage.addEventListener('mousemove', touchMove);
    });

updateCarousel();
