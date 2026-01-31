/* ===== Feature 1: Live Status Rotator ===== */

const statusMessages = [
  "Currently debugging at 2 AM ...",
  "Optimizing SQL queries...",
  "Pushing to GitHub...",
  "ctrl + alt + T...",
  "Refactoring for the 5th time...",
  "Coffee + Code = Life...",
];

let currentIndex = 0;

function rotateStatus() {
  const statusText = document.getElementById("status-text");
  if (statusText) {
    currentIndex = (currentIndex + 1) % statusMessages.length;
    statusText.textContent = statusMessages[currentIndex];
  }
}

setInterval(rotateStatus, 3000);

/* ===== Feature 2: Project Filter ===== */

function filterProjects(skill) {
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card) => {
    const tech = card.getAttribute("data-tech").toLowerCase();
    const parent = card.parentElement;

    if (tech.includes(skill.toLowerCase())) {
      parent.style.display = "block";
    } else {
      parent.style.display = "none";
    }
  });
}

function showAllProjects() {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card) => {
    card.parentElement.style.display = "block";
  });
}

window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const filter = params.get("filter");
  if (filter) {
    filterProjects(filter);
  }
};

window.filterProjects = filterProjects;
window.showAllProjects = showAllProjects;
