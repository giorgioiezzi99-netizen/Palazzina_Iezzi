document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu.hidden = false;
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return;
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
});
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const heroVideo = document.querySelector('[data-hero-video]');
const videoToggle = document.querySelector('[data-video-toggle]');
videoToggle.hidden = false;
function syncVideoControl() {
  videoToggle.setAttribute('aria-label', heroVideo.paused ? 'Riproduci il video' : 'Metti in pausa il video');
  videoToggle.innerHTML = heroVideo.paused
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7Z"/></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6v12M16 6v12"/></svg>';
}
heroVideo.addEventListener('play', syncVideoControl);
heroVideo.addEventListener('pause', syncVideoControl);
videoToggle.addEventListener('click', () => {
  if (heroVideo.paused) heroVideo.play().catch(syncVideoControl);
  else heroVideo.pause();
});
function respectMotion() { if (motion.matches) heroVideo.pause(); }
respectMotion();
motion.addEventListener('change', respectMotion);
syncVideoControl();
const tabs = Array.from(document.querySelectorAll('[data-plan]'));
const tablist = document.querySelector('.plan-tabs');
tablist.setAttribute('role', 'tablist');
function selectPlan(tab, focus = false) {
  tabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute('role', 'tab');
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(item.getAttribute('aria-controls'));
    panel.setAttribute('role', 'tabpanel');
    panel.hidden = !selected;
  });
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectPlan(tab));
  tab.addEventListener('keydown', (event) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectPlan(tabs[next], true); }
  });
});
selectPlan(tabs[0]);
const dialog = document.querySelector('.image-dialog');
const dialogImage = dialog.querySelector('.dialog-image');
const zoomButton = dialog.querySelector('[data-zoom]');
const imageWrap = dialog.querySelector('.dialog-image-wrap');
let imageTrigger;
document.querySelectorAll('[data-image-title]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    imageTrigger = link;
    dialogImage.src = link.href;
    dialogImage.alt = link.querySelector('img')?.alt || link.dataset.imageTitle;
    dialog.querySelector('#image-dialog-title').textContent = link.dataset.imageTitle;
    dialog.querySelector('[data-original]').href = link.href;
    dialog.classList.remove('is-zoomed');
    zoomButton.setAttribute('aria-pressed', 'false');
    zoomButton.textContent = 'Ingrandisci';
    imageWrap.scrollTo(0, 0);
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
});
dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  imageTrigger?.focus({ preventScroll: true });
});
zoomButton.addEventListener('click', () => {
  const zoomed = dialog.classList.toggle('is-zoomed');
  zoomButton.setAttribute('aria-pressed', String(zoomed));
  zoomButton.textContent = zoomed ? 'Adatta alla finestra' : 'Ingrandisci';
  imageWrap.scrollTo(0, 0);
});
