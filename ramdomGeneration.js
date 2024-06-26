const crypto = require("crypto");

// Generate a random string of specified length
function generateRandomString(length) {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

// Generate 100 random names
const numberOfNames = 100;
const nameLength = 8; // Adjust the desired length of each name
const randomNames = Array.from({ length: numberOfNames }, () =>
  generateRandomString(nameLength)
);

// console.log(randomNames);
console.clear();
const generateRandomProduct = () => {
  const randomProductName = `Product ${Math.floor(Math.random() * 1000)}`;
  const randomBarcode = Math.floor(Math.random() * 1000000000).toString();
  const randomDescription = `Description for ${randomProductName}`;
  const randomPrice = parseFloat((Math.random() * 100).toFixed(2));
  const randomCategory = ["Electronics", "Clothing", "Home", "Beauty"][
    Math.floor(Math.random() * 4)
  ];
  const randomMass = parseFloat((Math.random() * 1).toFixed(2));
  const randomLength = Math.floor(Math.random() * 20);
  const randomWidth = Math.floor(Math.random() * 10);
  const randomQuantity = Math.floor(Math.random() * 100);

  return {
    productName: randomProductName,
    barcode: randomBarcode,
    description: randomDescription,
    price: randomPrice,
    category: randomCategory,
    size: {
      mass: randomMass,
      length: randomLength,
      width: randomWidth,
    },
    quantity: randomQuantity,
  };
};

// Generate 100 random products
const randomProducts = Array.from({ length: 50 }, generateRandomProduct);

console.log(randomProducts);
