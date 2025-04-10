import { galleryImage } from './store.js';
document.addEventListener('DOMContentLoaded', () => {

  const galleryContainer = document.querySelector('.galleryContainer');
  galleryImage.forEach(image => {
    galleryContainer.innerHTML +=`
           <div class="col-lg-3 col-md-4">
        <div class="gallery-item">
          <a href="${image.src}" class="glightbox" data-gallery="images-gallery">
            <img src="${image.src}" alt="${image.alt}" class="img-fluid">
          </a>
        </div>
      </div>
    `;
  });
  const lightbox = GLightbox({
    selector: '.glightbox'
  });
  
  const heroCarousel = document.querySelector('#hero-carousel');
  if (!heroCarousel) return;

  const carousel = new bootstrap.Carousel(heroCarousel, {
    interval: 10000,
    ride: 'carousel',
    pause: false,
    wrap: true,
    touch: false,
    keyboard: false
  });

  // Hide controls if they exist
  document.querySelector('.carousel-control-prev')?.style.setProperty('display', 'none');
  document.querySelector('.carousel-control-next')?.style.setProperty('display', 'none');
  document.querySelector('.carousel-indicators')?.style.setProperty('display', 'none');
});
