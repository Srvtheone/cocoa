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
            let element = {
              element: el,
              name: attribute.name,
              value: attribute.value,
            };
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
    this.setTitle();
    this.setText();
  }

  setTitle() {
    if (this.data.title) {
      document.title = this.data.title.toString();
    }
  }

  setText() {
    for (const el of this.elements) {
      for (const data of this.data.content) {
        if (data.attr === el.value) {
          el.element.textContent = data.content;
        }
      }
    }
  }
}

let cocoa = new Cocoa();

cocoa.init();
