class Order {
  constructor(inventory) {
    this.inventory = inventory;
    this.itemsByCategory = { "Burgers": [], "Sides": [], "Drinks": [] };
    this.combos = [];
  }

  async addItem(item_id) {
    const [stockLevel, item] = await Promise.all([
      this.inventory.getStock(item_id),
      this.inventory.getItem(item_id)
    ]);

    if (stockLevel == 0) {
      return [false, itemId];
    }

    const success = await this.inventory.decrementStock(itemId);
    if (!success) {
      return [false, itemId];
    }

    this.itemsByCategory[item.category].push(item);

    return [true, itemId];
  }

  findCombos() {
    let numberOfCombos = null;

    for (const categoryItems of Object.values(this.itemsByCategory)) {
      if (numberOfCombos == null) {
        numberOfCombos = categoryItems.length;
      } else {
        numberOfCombos = Math.min(numberOfCombos, categoryItems.length);
      }
    }

    this.itemsByCategory["Burgers"].sort((a, b) => a.price - b.price);
    this.itemsByCategory["Sides"].sort((a, b) => a.price - b.price);
    this.itemsByCategory["Drinks"].sort((a, b) => a.price - b.price);

    for (let i = 0; i < numberOfCombos; i++) {
      const burger = this.itemsByCategory["Burgers"].pop();
      const side = this.itemsByCategory["Sides"].pop();
      const drink = this.itemsByCategory["Drinks"].pop();
      const combo = new Combo(burger, side, drink);
      this.combos.push(combo);
    }
  }

  getPrice() {
    this.findCombos();
    let subTotal = 0;

    for (const category of Object.values(this.itemsByCategory)) {
      for (const item of category) {
        subTotal += item.price;
      }
    }

    for (const combo of this.combos) {
      subTotal += combo.price;
    }

    return subTotal;
  }

  toString() {
    let string = "";

    for (let i = 0; i < this.combos.length; i++) {
      string += this.combos[i].toString();
      if (i != this.combos.length - 1) {
        string += "\n";
      }
    }

    if (this.combos.length > 0) {
      string += "\n";
    }

    for (const category of Object.values(this.itemsByCategory)) {
      for (let i = 0; i < category.length; i++) {
        const item = category[i];
        const name = item.name || item.size;
        const price = item.price;
        let subcategory = item.subcategory || "";

        if (subcategory == null) {
          subcategory = "";
        }

        string += `$${price} ${name} ${subcategory}\n`;
      }
    }

    return string.slice(0, -1);
  }
}


class Inventory {
  constructor() {
    this.catalogue = {
      Burgers: [
        { id: 1, name: "Python Burger", price: 5.99 },
        { id: 2, name: "C Burger", price: 4.99 },
        { id: 3, name: "Ruby Burger", price: 6.49 },
        { id: 4, name: "Go Burger", price: 5.99 },
        { id: 5, name: "C++ Burger", price: 7.99 },
        { id: 6, name: "Java Burger", price: 7.99 },
      ],
      Sides: {
        Fries: [
          { id: 7, size: "Small", price: 2.49 },
          { id: 8, size: "Medium", price: 3.49 },
          { id: 9, size: "Large", price: 4.29 },
        ],
        "Caesar Salad": [
          { id: 10, size: "Small", price: 3.49 },
          { id: 11, size: "Large", price: 4.49 },
        ],
      },
      Drinks: {
        Coke: [
          { id: 12, size: "Small", price: 1.99 },
          { id: 13, size: "Medium", price: 2.49 },
          { id: 14, size: "Large", price: 2.99 },
        ],
        "Ginger Ale": [
          { id: 15, size: "Small", price: 1.99 },
          { id: 16, size: "Medium", price: 2.49 },
          { id: 17, size: "Large", price: 2.99 },
        ],
        "Chocolate Milk Shake": [
          { id: 18, size: "Small", price: 3.99 },
          { id: 19, size: "Medium", price: 4.49 },
          { id: 20, size: "Large", price: 4.99 },
        ],
      },
    };
    this._generateItemLookupDict();
    this.stock = {};
    for (let i = 0; i < this.items.length; i++) {
      this.stock[i + 1] = Math.floor(Math.random() * 16);
    }
    this.stockLock = new Promise(function (resolve, reject) {
      resolve("unlocked");
    });
  }

  _generateItemLookupDict() {
    this.items = {};
    for (let category in this.catalogue) {
      let categoryCollection = this.catalogue[category];
      if (Array.isArray(categoryCollection)) {
        for (let item of categoryCollection) {
          let newItem = Object.assign({}, item);
          newItem.category = category;
          newItem.subcategory = null;
          this.items[newItem.id] = newItem;
        }
      } else {
        for (let subcategory in categoryCollection) {
          for (let item of categoryCollection[subcategory]) {
            let newItem = Object.assign({}, item);
            newItem.category = category;
            newItem.subcategory = subcategory;
            this.items[newItem.id] = newItem;
          }
        }
      }
    }
  }

  async _verifyItemId(func, itemId) {
    if (!(itemId in this.stock)) {
      throw new Error(`No item with id: ${itemId} exists in the inventory.`);
    }
    let result = await func(this, itemId);
    return result;
  }

  async getNumberOfItems() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return Object.keys(this.items).length;
  }

  async getCatalogue() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return this.catalogue;
  }

  async getStock(itemId) {
    if (!(itemId in this.stock)) {
      throw new Error(`No item with id: ${item_id} exists in the inventory.`);
    }
    await new Promise(resolve => setTimeout(resolve, 2000));

    return this.stock[itemId];
  }

  async decrementStock(itemId) {
    if (!(itemId in this.stock)) {
      throw new Error(`No item with id: ${item_id} exists in the inventory.`);
    }
    if (this.stock[itemId] === 0) {
      return false;
    }
    this.stock[itemId] -= 1;
    return true;
  }

  async getItem(itemId) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return this.items[itemId];
  }
}

class Combo {
  static DISCOUNT = 0.15;

  constructor(burger, side, drink) {
    this.burger = burger;
    this.side = side;
    this.drink = drink;
    this.price = this._calculatePrice();
  }

  _calculatePrice() {
    let subtotal = this.burger["price"] + this.side["price"] + this.drink["price"];
    return Math.round(subtotal * (1 - Combo.DISCOUNT) * 100) / 100;
  }

  toString() {
    let string = `$${this.price} Burger Combo\n`;
    string += `${this.burger['name']}\n`;
    string += `${this.side['size']} ${this.side['subcategory']}\n`;
    string += `${this.drink['size']} ${this.drink['subcategory']}`;

    return string;
  }
}

function displayCatalogue(catalogue) {
  const burgers = catalogue['Burgers'];
  const sides = catalogue['Sides'];
  const drinks = catalogue['Drinks'];

  for (const burger of burgers) {
    const item_id = burger["id"];
    const name = burger["name"];
    const price = burger["price"];
    //console.log(`${item_id}. ${name} $${price}`);
  }

  for (const side in sides) {
    const sizes = sides[side];

    for (const size of sizes) {
      const item_id = size["id"];
      const size_name = size["size"];
      const price = size["price"];
      //console.log(`${item_id}. ${size_name} $${price}`);
    }
  }

  for (const beverage in drinks) {
    const sizes = drinks[beverage];

    for (const size of sizes) {
      const item_id = size["id"];
      const size_name = size["size"];
      const price = size["price"];
      //console.log(`${item_id}. ${size_name} $${price}`);
    }
  }
}

async function getOrder(inventory, numItems) {
  const order = new Order(inventory);
  const tasks = [];

  console.log("Please enter the number of items that you would like to add to your order. Enter q to complete your order.");

  while (true) {
    const itemId = prompt("Enter an item number:");
    if (itemId === "q") {
      break;
    }

    if (!Number.isInteger(Number(itemId))) {
      console.log("Please enter a valid number.");
      continue;
    }

    const itemIdInt = parseInt(itemId, 10);
    if (itemIdInt > numItems) {
      console.log(`Please enter a number below ${numItems + 1}.`);
      continue;
    }

    const addToOrderTask = order.addItem(itemIdInt);
    tasks.push(addToOrderTask);
  }

  console.log("Placing order...");

  for (const task of tasks) {
    // if the task returns False we could not add the item
    // to the order because the item is out of stock
    const [inStock, itemId] = await task;

    if (!inStock) {
      console.log(`Unfortunately item number ${itemId} is out of stock and has been removed from your order. Sorry!`);
    }
  }

  return order;
}

function displayOrder(order, subTotal, tax, total) {
  console.log("\nHere is a summary of your order: \n");
  console.log(order);
  console.log(`\nSubtotal: $${subTotal.toFixed(2)}`);
  console.log(`Tax: $${tax.toFixed(2)}`);
  console.log(`Total: $${total.toFixed(2)}`);
}

function purchaseOrder(total) {
  let answer = prompt(`Would you like to purchase this order for $${total.toFixed(2)} (yes/no)?`);
  if (answer === "y" || answer === "yes") {
    console.log("Thank you for your order!");
  } else {
    console.log("No problem, please come again!");
  }
}

async function main() {
  const inventory = new Inventory();
  const numItems = await inventory.getNumberOfItems();
  const catalogue = await inventory.getCatalogue();

  displayCatalogue(catalogue);

  while (true) {
    const order = await getOrder(inventory, numItems);
    const subTotal = order.getPrice();
    if (subTotal !== 0) {
      const tax = subTotal * 0.05;
      const total = subTotal + tax;

      displayOrder(order, subTotal, tax, total);
      purchaseOrder(total);
    }

    const orderAgain = prompt("Would you like to make another order (yes/no)?");
    if (orderAgain !== "y" && orderAgain !== "yes") {
      break;
    }
  }

  console.log("Goodbye!");
}

main();
