const mongoose = require("mongoose");
const dbConnect = require("./databaseConnection");
const { item } = require("./schema");

//Model for inserting an item into database
const itemModel = mongoose.model("item", item);

/**
 * Insert an item using item schema and insert into item collection.
 * @param {Object} item - contain an item in object.
 * @return {Error} If an error occurs during inserting item or saving the item.
 */
async function insertItem(item) {
  try {
    // Create a new document based on the 'item' schema
    const newItem = new itemModel(item);

    // Connect to the database (assuming dbConnect sets up the connection)
    await dbConnect();

    // Search the Item if the item already exist then throw an error.
    const foundProducts = await itemModel.find(item);
    if (foundProducts) throw new Error("Product already have!");

    // Save the new item document
    await newItem.save();
  } catch (error) {
    // throw an error if there is an error
    throw error;
  }
}

/**
 * Updates a document in the 'item' collection.
 * @param {Object} filter - Filter criteria for selecting the document.
 * @param {Object} update - Changes to apply to the document.
 * @return {Error} If an error occurs during the update process.
 */
async function updateItem(filter, update) {
  try {
    // Set the 'updatedAt' field to the current date and time
    update.$set.updateAt = new Date().toISOString().slice(0, 19);

    // Get the 'item' model (replace with your actual model name)
    const updatemodel = await mongoose.model("item");

    // Connect to the database (assuming dbConnect sets up the connection)
    await dbConnect();

    // Update the document
    await updatemodel.updateOne(filter, update);
  } catch (error) {
    // throw an error if there is an error
    throw error;
  }
}

/**
 * Retrieves items based on the provided search key.
 * @param {object} key - Key for searching items.
 * @returns {Promise<Array>} - An array of found products.
 */
async function getItems(key) {
  try {
    // Call the database connection.
    dbConnect();

    // Declare a constant varialble name foundProducts and asign an await find().
    const foundProducts = await itemModel.find(key);

    // Return an array found products
    return foundProducts;
  } catch (error) {
    // return an error if there is an error occurs when searching an items.
    throw error;
  }
}

module.exports = { insertItem, updateItem, getItems };
