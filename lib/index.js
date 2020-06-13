"use strict";
//TODO: Add a custom Link Tag: CLinkElement -> cocoa-link
//TODO: Add a Dynamic Loader, until the data is fetched!

// TODO: !MUST: Add Support For Dynamic Lists

export class CList {
  constructor() {}
}

class CTextElement {
  constructor({ element, value }) {
    this.node = element;
    this.value = value;
  }
}

class CAttrElement {
  constructor({ element, value }) {
    this.node = element;
    this.attributes;
    this.setAttributes(value);
  }

  setAttributes(value) {
    let attributes = [];
    const tempAttributes = value.split(" ");

    for (const attribute of tempAttributes) {
      if (attribute) {
        attributes.push(attribute);
      }
    }
    this.attributes = attributes;
  }
}

class CForm {
  constructor({ form, id, submitUrl }) {
    this.node = form;
    this.id = id;
    this.submitUrl = submitUrl;

    this.formData;

    this.init();
  }

  init() {
    this.node.addEventListener("submit", (e) => {
      e.preventDefault();
      this.setFormData();
      this.submit();
    });
  }

  setFormData() {
    let elements = [];
    let formData = {};

    for (const element of this.node.elements) {
      if (
        element.tagName.toLowerCase() !== "button" &&
        element.type.toLowerCase() !== "submit"
      ) {
        elements.push(element);
      }
    }

    if (elements.length > 0) {
      for (const element of elements) {
        formData[element.name] = element.value.trim();
      }
    }

    this.formData = formData;
  }

  async submit() {
    let response = await fetch(this.submitUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.formData),
    });
  }
}

class CImageElement {
  constructor({ element, value }) {
    this.node = element;
    this.value = value;
  }
}

class Cocoa {
  constructor(apiKey) {
    this.KEY = apiKey;

    this.URL;
    this.contactUrl;
    this.textElements;
    this.attributeElements;
    this.imageElements;
    this.forms;
    this.data;

    this.init();
  }

  init() {
    this.URL = "http://localhost:3500";
    this.contactUrl = "http://localhost:3500/contact";

    this.fetchData();

    this.textElements = this.textElementSelector();
    this.attributeElements = this.attributeElementSelector();
    this.imageElements = this.imageElementSelector();
    this.forms = this.formSelector();
  }

  formSelector() {
    let forms = [];

    const findForms = (regex) => {
      const formElements = document.querySelectorAll("form");
      for (const form of formElements) {
        for (const attribute of form.attributes) {
          if (attribute.name.toLowerCase().match(regex)) {
            let formElement = {
              form,
              id: attribute.value,
              submitUrl: this.contactUrl,
            };

            forms.push(new CForm(formElement));
          }
        }
      }
    };

    findForms(/(cocoa-form)/gi);
    return forms;
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
    let data = await fetch(this.URL);
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
          if (el.node.hasChildNodes()) {
            el.node.childNodes[0].textContent = text.content.trim();
          } else {
            el.node.textContent = text.content.trim();
          }
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
