// Smooth scrolling for links (plain JavaScript)
document.addEventListener('DOMContentLoaded', function () {
  // Get all links on the page
  const links = document.querySelectorAll('a');

  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      // Check if the link has a hash (like #section)
      if (link.hash) {
        event.preventDefault(); // Stop default jump to section
        const target = document.querySelector(link.hash); // Find target element

        if (target) {
          // Scroll to the target smoothly
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});

// Simple testimonial slider (plain JavaScript)
document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.testimonial-slider');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  const testimonials = document.querySelectorAll('.testimonial-box');
  let index = 0;

  function showTestimonial() {
    // Move slider to show the current testimonial
    slider.style.transform = 'translateX(' + (-index * 100) + '%)';
  }

  rightArrow.addEventListener('click', function () {
    // Go to next testimonial, loop back if at the end
    index = (index + 1) % testimonials.length;
    showTestimonial();
  });

  leftArrow.addEventListener('click', function () {
    // Go to previous testimonial, loop back if at the start
    index = (index - 1 + testimonials.length) % testimonials.length;
    showTestimonial();
  });
});

// Smooth scrolling for links (jQuery)
$(document).ready(function() {
  $('a').click(function(event) {
    if (this.hash !== '') {
      event.preventDefault(); // Stop default jump
      var hash = this.hash;

      // Animate scrolling to the target element
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800); // duration 800ms
    }
  });
});

// Simple testimonial slider (with pixel-based sliding)
let currentIndex = 0;

function showSlide(index) {
  const slider = document.querySelector('.testimonial-slider');
  const slideWidth = document.querySelector('.testimonial-box').offsetWidth;
  // Move the slider horizontally by slideWidth * index
  slider.style.transform = 'translateX(' + (-slideWidth * index) + 'px)';
}

function nextSlide() {
  currentIndex++;
  const totalSlides = document.querySelectorAll('.testimonial-box').length;
  if (currentIndex >= totalSlides) {
    currentIndex = 0; // Loop back to first slide
  }
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex--;
  const totalSlides = document.querySelectorAll('.testimonial-box').length;
  if (currentIndex < 0) {
    currentIndex = totalSlides - 1; // Loop back to last slide
  }
  showSlide(currentIndex);
}

// Connect arrows to functions
document.querySelector('.right-arrow').addEventListener('click', nextSlide);
document.querySelector('.left-arrow').addEventListener('click', prevSlide);