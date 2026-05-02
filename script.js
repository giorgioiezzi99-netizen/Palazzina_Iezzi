const header = document.querySelector("[data-header]");
const heroVideo = document.querySelector("[data-hero-video]");
const autoplayVideos = document.querySelectorAll("[data-autoplay-video]");
const galleryButtons = document.querySelectorAll(".gallery-button");
const previewImage = document.querySelector("[data-preview]");
const previewTitle = document.querySelector("[data-preview-title]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

if (heroVideo && prefersReducedMotion) {
  heroVideo.pause();
  heroVideo.removeAttribute("autoplay");
}

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting) {
          video.play().catch(() => {});
          return;
        }

        video.pause();
      });
    },
    { threshold: 0.45 }
  );

  autoplayVideos.forEach((video) => videoObserver.observe(video));
}
