const galleryImages = document.querySelectorAll('.gallery-img');

galleryImages.forEach(galleryImg => {
    const enlargeButton = galleryImg.querySelector('.enlarge-btn');
    
    galleryImg.addEventListener('mouseenter', () => {
        enlargeButton.style.visibility = 'visible';
    });
    
    galleryImg.addEventListener('mouseleave', () => {
        enlargeButton.style.visibility = 'hidden';
    });
});

const modal = document.getElementById('modal');
const fullImage = document.getElementById('full-image');
const closeModal = document.querySelector('.close-btn');

galleryImages.forEach(galleryImg => {
    const enlargeButton = galleryImg.querySelector('.enlarge-btn');
    enlargeButton.addEventListener('click', function() {
        const thumbnail = this.previousElementSibling;
        fullImage.src = thumbnail.src;
        modal.style.display = 'flex';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});
