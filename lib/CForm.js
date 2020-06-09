export class CForm {
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

    console.log(await response.text());
  }
}
