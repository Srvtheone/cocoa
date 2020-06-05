export class CAttrElement {
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
