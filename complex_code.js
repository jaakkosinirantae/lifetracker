/* complex_code.js */

// This complex code demonstrates a sample e-commerce application for managing product inventory,
// calculating prices, generating invoices, and handling different user roles and permissions.

// Required libraries
const moment = require('moment');
const fs = require('fs');

// Product class representing a single product in the store
class Product {
  constructor(id, name, price, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  // Decrease the product quantity in stock
  decreaseStock(amount) {
    if (amount > this.quantity) {
      throw new Error('Insufficient stock!');
    }
    this.quantity -= amount;
  }
}

// User class representing an application user
class User {
  constructor(id, name, email, role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }

  // Generate invoice for the user's purchase
  generateInvoice(products) {
    let invoice = `Invoice for ${this.name} (${this.email})\n\n`;
    let total = 0;
    
    for (const product of products) {
      const price = product.price;
      invoice += `${product.name}\t\t${price}\n`;
      total += price;
    }
    
    invoice += `\nTotal: ${total}\n`;
    
    const invoiceFilename = `invoice_${moment().format('YYYYMMDDHHmm')}.txt`;
    fs.writeFileSync(invoiceFilename, invoice);
    
    console.log(`Invoice generated: ${invoiceFilename}`);
  }
}

// Sample product inventory
const products = [
  new Product(1, 'Laptop', 999, 10),
  new Product(2, 'Phone', 799, 20),
  new Product(3, 'Tablet', 499, 5),
  // ... More products ...
];

// Sample users
const users = [
  new User(1, 'John Doe', 'johndoe@example.com', 'customer'),
  new User(2, 'Jane Smith', 'janesmith@example.com', 'customer'),
  new User(3, 'Admin User', 'admin@example.com', 'admin'),
  // ... More users ...
];

// Sample purchase operation
const customer = users.find(user => user.role === 'customer');
const purchasedProducts = [products[0], products[2]]; // Selected products by the customer

for (const product of purchasedProducts) {
  product.decreaseStock(1);
}

customer.generateInvoice(purchasedProducts);

// Additional code for managing permissions, user authentication, and advanced functionalities goes here...

// ... Several more lines of code ...
// ... More functions, classes, and methods ...
// ... Complex business logic and algorithms ...

// End of code