
document.addEventListener('DOMContentLoaded', () => {
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
