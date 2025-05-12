// Smooth scrolling for links

document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('a');

  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (link.hash) {
        event.preventDefault();
        const target = document.querySelector(link.hash);

        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});

// Simple testimonial slider

document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.testimonial-slider');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  const testimonials = document.querySelectorAll('.testimonial-box');
  let index = 0;

  function showTestimonial() {
    slider.style.transform = `translateX(-${index * 100}%)`;
  }

  rightArrow.addEventListener('click', function () {
    index = (index + 1) % testimonials.length;
    showTestimonial();
  });

  leftArrow.addEventListener('click', function () {
    index = (index - 1 + testimonials.length) % testimonials.length;
    showTestimonial();
  });
});




// Smooth Scrolling for Navigation Links
$(document).ready(function() {
    $('a').click(function(event) {
        if (this.hash !== '') {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800);
        }
    });
});

// Simple Testimonial Slider
let currentIndex = 0;

function showSlide(index) {
    const slider = document.querySelector('.testimonial-slider');
    const slideWidth = document.querySelector('.testimonial-box').offsetWidth;
    slider.style.transform = 'translateX(' + (-slideWidth * index) + 'px)';
}

// Move to next slide
function nextSlide() {
    currentIndex++;
    if (currentIndex >= document.querySelectorAll('.testimonial-box').length) {
        currentIndex = 0;
    }
    showSlide(currentIndex);
}

// Move to previous slide
function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = document.querySelectorAll('.testimonial-box').length - 1;
    }
    showSlide(currentIndex);
}

// Event listeners for arrows
document.querySelector('.right-arrow').addEventListener('click', nextSlide);
document.querySelector('.left-arrow').addEventListener('click', prevSlide);
