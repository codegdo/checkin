import Inventory from './inventory.js';
import prompt from './prompt.js';
import products from './products.json' assert { type: 'json' };

async function getOrder(inventory, numItems) {
  while (true) {
    const itemId = await prompt('Enter an item number: ');
    if (itemId === 'q') {
      break;
    }
  }

  return 'order';
}

async function displayOrder() {}

async function purchaseOrder() {}

async function getOrderAgain() {
  const orderAgain = await prompt('Order again (yes/no)? ');

  if (orderAgain !== 'y' && orderAgain !== 'yes') {
    return false;
  }

  return true;
}

async function main() {
  const inventory = new Inventory(products);
  const numItems = await inventory.getNumberOfItems();
  const catalogue = await inventory.getCatalogue();

  console.log(catalogue);

  while (true) {
    // take order
    const order = await getOrder();

    // display order

    // purchase order

    // order again
    const reorder = await getOrderAgain();

    if (!reorder) break;
  }
}

main();
