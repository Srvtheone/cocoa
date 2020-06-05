import { CTextElement } from "./CTextElement.js";

class Cocoa {
  constructor() {
    this.url = "http://localhost:3500";
    this.textElements;
    this.data;
  }

  init() {
    this.textElements = this.elementSelector();
    this.fetchData();
  }

  elementSelector() {
    let textElements = [];

    function findTextElements(regex) {
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
    }

    findTextElements(/(cocoa-text)/gi);
    return textElements;
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
}

let cocoa = new Cocoa();

cocoa.init();
