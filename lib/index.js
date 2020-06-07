import { CTextElement } from "./CTextElement.js";
import { CAttrElement } from "./CAttrElement.js";
import { CImageElement } from "./CImageElement.js";

//TODO: Add a custom Link Tag: CLinkElement -> cocoa-link
//TODO: Add a Dynamic Loader, until the data is fetched!

class Cocoa {
  constructor(apiKey) {
    this.key = apiKey;

    this.url;
    this.textElements;
    this.attributeElements;
    this.imageElements;
    this.data;

    this.init();
  }

  init() {
    this.url = "http://localhost:3500";
    this.textElements = this.textElementSelector();
    this.attributeElements = this.attributeElementSelector();
    this.imageElements = this.imageElementSelector();
    this.fetchData();
  }

  textElementSelector() {
    let textElements = [];

    const findTextElements = (regex) => {
      const allElements = document.querySelectorAll("*");
      for (let el of allElements) {
        for (let attribute of el.attributes) {
          if (attribute.name.toLowerCase().match(regex)) {
            let textElement = {
              element: el,
              value: attribute.value,
            };
            textElements.push(new CTextElement(textElement));
          }
        }
      }
    };

    findTextElements(/(cocoa-text)/gi);
    return textElements;
  }

  attributeElementSelector() {
    let attributeElements = [];

    const findAttributeElements = (regex) => {
      const allElements = document.querySelectorAll("*");
      for (let el of allElements) {
        for (let attribute of el.attributes) {
          if (attribute.name.toLowerCase().match(regex)) {
            let attributeElement = {
              element: el,
              value: attribute.value,
            };

            attributeElements.push(new CAttrElement(attributeElement));
          }
        }
      }
    };

    findAttributeElements(/(cocoa-attr)/gi);
    return attributeElements;
  }

  imageElementSelector() {
    let imageElements = [];

    const findImageElements = (regex) => {
      const allImages = document.querySelectorAll("img");
      for (let el of allImages) {
        for (let attribute of el.attributes) {
          if (attribute.name.toLowerCase().match(regex)) {
            let attributeElement = {
              element: el,
              value: attribute.value,
            };

            imageElements.push(new CImageElement(attributeElement));
          }
        }
      }
    };
    findImageElements(/(cocoa-img)/gi);

    return imageElements;
  }

  async fetchData() {
    let data = await fetch(this.url);
    this.data = await data.json();

    this.start();
  }

  start() {
    this.setTitle();
    this.setText();
    this.setAttributes();
    this.setImages();
  }

  setTitle() {
    if (this.data.title) {
      document.title = this.data.title.trim();
    }
  }

  setText() {
    for (const el of this.textElements) {
      for (const text of this.data.text) {
        if (text.id === el.value) {
          el.node.textContent = text.content.trim();
        }
      }
    }
  }

  setAttributes() {
    for (const element of this.attributeElements) {
      for (const attribute of element.attributes) {
        for (const attr of this.data.attributes) {
          if (attribute === attr.id) {
            element.node.setAttribute(attr.attribute.trim(), attr.value);
          }
        }
      }
    }
  }

  setImages() {
    for (const imgEl of this.imageElements) {
      for (const img of this.data.images) {
        if (img.id === imgEl.value) {
          imgEl.node.setAttribute("src", img.src);
          imgEl.node.setAttribute("alt", img.alt);
        }
      }
    }
  }
}

new Cocoa("srvtheone");
