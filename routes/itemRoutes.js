const {
  insertItem,
  updateItem,
  getItems,
  itemModel,
} = require("../model/itemLogic.js");
/**
 * Handles GET requests to retrieve items based on query parameters.
 *
 * This route handler fetches items that match the query parameters provided in the request.
 * It utilizes the `getItems` function to retrieve the data and sends it as a JSON response.
 *
 * @function itemRouter
 * @param {Object} req - The request object containing query parameters.
 * @param {Object} res - The response object used to send back the retrieved items.
 * @returns {void} Sends a JSON response with the list of items or an error message.
 */
const itemRouter = async (req, res) => {
  try {
    const key = req.query;
    const items = await getItems(key);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to show the item" });
  }
};

/**
 * Handles POST requests to insert a new item.
 *
 * This route handler processes the request to insert a new item into the database.
 * It expects the item data to be provided in the request body and uses the
 * `insertItem` function to perform the insertion.
 *
 * @function itemInsertRouter
 * @param {Object} req - The request object containing the item data in the body.
 * @param {Object} res - The response object used to send back the result of the insertion operation.
 * @returns {void} Sends a JSON response indicating the success or failure of the item insertion.
 */
const itemInsertRouter = async (req, res) => {
  try {
    const item = { ...req.body };
    await insertItem(item);
    res.status(200).json({ message: "Item inserted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error inserting item" });
  }
};

/**
 * Handles PUT requests to update an existing item.
 *
 * This route handler processes the request to update an item based on the provided filter and update data.
 * It validates the input, performs the update using the `updateItem` function, and responds with the result.
 *
 * @function itemUpdateRouter
 * @param {Object} req - The request object containing the filter and update data in the body.
 * @param {Object} res - The response object used to send back the result of the update operation.
 * @returns {void} Sends a JSON response indicating the success or failure of the item update.
 */
const itemUpdateRouter = async (req, res) => {
  try {
    const { filter, update } = req.body;

    // Validate input
    if (!filter || typeof filter !== "object") {
      return res.status(400).json({ error: "Invalid filter" });
    }
    if (!update || typeof update !== "object") {
      return res.status(400).json({ error: "Invalid update data" });
    }

    const result = await updateItem(filter, update);

    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ message: "Item not found or no changes applied" });
    }

    res.status(200).json({ message: "Item updated successfully!" });
  } catch (error) {
    console.error("Error updating item:", error.message);
    res.status(500).json({ error: "Error updating item" });
  }
};

/**
 * Handles DELETE requests to remove an item based on its barcode.
 *
 * This route handler processes the request to delete an item from the database using the barcode
 * provided in the request parameters. It uses the `findOneAndDelete` method to remove the item
 * and responds with the result.
 *
 * @function itemDeleteRouter
 * @param {Object} req - The request object containing the barcode of the item to be deleted in the parameters.
 * @param {Object} res - The response object used to send back the result of the deletion operation.
 * @returns {void} Sends a JSON response indicating the success or failure of the item deletion.
 */
const itemDeleteRouter = async (req, res) => {
  try {
    const { barcode } = req.params;

    const result = await itemModel.findOneAndDelete({ barcode: barcode });

    if (!result) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error.message);
    res.status(500).json({ error: "Error deleting item" });
  }
};

module.exports = {
  itemRouter,
  itemInsertRouter,
  itemUpdateRouter,
  itemDeleteRouter,
};
