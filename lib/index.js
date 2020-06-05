import { CElement } from "./celement.js";

class Cocoa {
  constructor() {
    this.url = "http://localhost:3500";
    this.elements;
    this.data;
  }

  init() {
    this.elements = this.elementSelector();

    this.fetchData();
  }

  elementSelector() {
    let elements = [];

    function findEl(regex) {
      const allElements = document.querySelectorAll("*");
      for (let el of allElements) {
        for (let attribute of el.attributes) {
          if (attribute.name.toLowerCase().match(regex)) {
            let element;
            if (attribute.name.toLowerCase().match(/(cocoa-text)/gi)) {
              element = {
                element: el,
                name: attribute.name,
                value: attribute.value,
                type: "text",
              };
            }

            if (attribute.name.toLowerCase().match(/(cocoa-attr)/gi)) {
              element = {
                element: el,
                name: attribute.name,
                value: attribute.value,
                type: "attribute",
              };
            }

            elements.push(new CElement(element));
          }
        }
      }
    }

    findEl(/(cocoa*)/gi);
    return elements;
  }

  async fetchData() {
    let data = await fetch(this.url);
    this.data = await data.json();
    this.start();
  }

  start() {
    this.setHeadData();
    this.setText();
    this.setAttributes();
  }

  setHeadData() {
    if (this.data.title) {
      document.title = this.data.title.toString();
    }
  }

  setText() {
    for (const el of this.elements) {
      if (el.type === "text") {
        for (const text of this.data.text) {
          if (text.attr === el.value) {
            el.element.textContent = text.content;
          }
        }
      }
    }
  }
}

let cocoa = new Cocoa();

cocoa.init();
