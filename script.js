const header = document.querySelector("[data-header]");
const galleryButtons = document.querySelectorAll(".gallery-button");
const previewImage = document.querySelector("[data-preview]");
const previewTitle = document.querySelector("[data-preview-title]");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    galleryButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    previewImage.src = button.dataset.image;
    previewImage.alt = button.dataset.title;
    previewTitle.textContent = button.dataset.title;
  });
});

window.addEventListener("scroll", updateHeader);
updateHeader();
