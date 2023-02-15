export default class Inventory {
  constructor(products) {
    this.catalogue = products;
    this.items = {};
    this.stock = {};
    this.generateItemsLookup();
  }

  async getNumberOfItems() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Object.keys(this.items).length;
  }

  async getCatalogue() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return this.catalogue;
  }

  async getItem(id) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.items[id];
  }

  generateItemsLookup() {
    const items = this.convertArrayToObject('id', this.catalogue);
    this.items = { ...items };
  }

  convertArrayToObject(key, items) {
    return items.reduce((item, i) => {
      return { ...item, [i[key]]: i };
    }, {});
  }
}
