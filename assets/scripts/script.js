const icon = document.querySelector(".nav-icon");
const menu = document.querySelector("header nav ul");
const availabilities = document.querySelectorAll(".availability");

icon.addEventListener("click", () => {
  icon.classList.toggle("open");
  menu.style.top === "0%"
    ? (menu.style.top = "-800px")
    : (menu.style.top = "0%");
});

availabilities.forEach((availability) => {
  const img = availability.querySelector("img");

  availability.addEventListener("mouseover", () => {
    img.style.outline = "10px solid #0A7A6A";
  });

  availability.addEventListener("mouseout", () => {
    img.style.outline = "10px solid #ccc";
  });
});

