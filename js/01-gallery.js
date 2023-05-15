import { galleryItems } from "./gallery-items.js";
// Change code below this line

const refs = {
  gallery: document.querySelector(".gallery"),
};

const markup = galleryItems
  .map((item) => {
    return `
      <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
      <img class="gallery__image" src="${item.preview}" alt="${item.description}" data-source="${item.original}" /></a>
      </li>
    `;
  })
  .join("");
refs.gallery.innerHTML = markup;

refs.gallery.addEventListener("click", openModalWindow);
function openModalWindow(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const imageUrl = event.target.dataset.source;
  console.log(imageUrl);
  const instance = basicLightbox.create(`
    <img src="${imageUrl}" width="800" height="600">
`);
  instance.show();

  const visible = instance.visible();

  document.addEventListener("keydown", closeModalOnEscape);
  function closeModalOnEscape(event) {
    if (event.code === "Escape" && visible) {
      instance.close();
      document.removeEventListener("keydown", closeModalOnEscape);
    }
  }
}
