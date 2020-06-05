import { CTextElement } from "./CTextElement.js";
import { CAttrElement } from "./CAttrElement.js";

class Cocoa {
  constructor() {
    this.url = "http://localhost:3500";
    this.textElements;
    this.attributeElements;
    this.data;
  }

  init() {
    this.textElements = this.textElementSelector();
    this.attributeElements = this.attributeElementSelector();
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

            this.getAllAttributes(attribute.value);

            attributeElements.push(new CAttrElement(attributeElement));
          }
        }
      }
    };

    findAttributeElements(/(cocoa-attr)/gi);
    return attributeElements;
  }

  async fetchData() {
    let data = await fetch(this.url);
    this.data = await data.json();
    console.log(this.data);
    this.start();
  }

  start() {
    this.setHeadData();
    this.setText();

    console.log(this.textElements);
    console.log(this.attributeElements);
  }

  setHeadData() {
    if (this.data.title) {
      document.title = this.data.title.toString();
    }
  }

  setText() {
    for (const el of this.textElements) {
      for (const text of this.data.text) {
        if (text.id === el.value) {
          el.node.textContent = text.content;
        }
      }
    }
  }

  getAllAttributes() {}
}

let cocoa = new Cocoa();

cocoa.init();
