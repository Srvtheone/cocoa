class Cocoa {
  constructor() {
    this.url = "http://localhost:3500";
    this.elements = [];
  }

  init() {
    this.elements = [...document.querySelectorAll("[cocoa]")];
    this.fetchData();
  }

  async fetchData() {
    let data = await fetch(this.url);
    let final = await data.json();
    this.elements[0].textContent = final.data;
    for (const el of this.elements) {
      console.log(el.getAttribute("cocoa"));
    }
  }
}

class CElement {}

let cocoa = new Cocoa();

cocoa.init();
