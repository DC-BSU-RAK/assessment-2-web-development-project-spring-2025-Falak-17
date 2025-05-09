// Smooth scroll to any section by ID
window.addEventListener("scroll", () => {
  const items = document.querySelectorAll(".news-item");
  const triggerPoint = window.innerHeight - 100;

  items.forEach(item => {
    const boxTop = item.getBoundingClientRect().top;

    if (boxTop < triggerPoint) {
      item.classList.add("show");
    } else {
      item.classList.remove("show"); // this makes it re-animate when shown again
    }
  });
});

// Reveal chef cards on scroll
window.addEventListener("scroll", revealChefCards);
document.addEventListener("DOMContentLoaded", revealChefCards); // Reveal if already in view

function revealChefCards() {
  const cards = document.querySelectorAll(".chef-card");
  cards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < window.innerHeight - 100) {
      card.classList.add("visible");
    }
  });
}


