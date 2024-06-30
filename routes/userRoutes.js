const { deleteUser, updateUser, searchUser } = require("../model/user.js");

/**
 * Handles requests to retrieve user information based on query parameters.
 *
 * This route handler searches for users based on the query parameters provided in the request.
 * It uses the `searchUser` function to perform the search and returns the user information in the response.
 * If the search fails, it returns an error message.
 *
 * @function userRouter
 * @param {Object} req - The request object that contains the query parameters for searching users.
 * @param {Object} res - The response object used to send back the user information or an error message.
 * @returns {void} Sends a JSON response with the user data or an error message.
 */
const userRouter = async (req, res) => {
  try {
    const key = req.query;
    const users = await searchUser(key);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to show the users list." });
  }
};

/**
 * Handles requests to update user information based on the provided filter and update data.
 *
 * This route handler processes updates to user information by using the `updateUser` function.
 * It expects the `filter` and `update` data to be provided in the request body.
 * The function validates the input data, performs the update, and responds with a success message or an
 * appropriate error message based on the outcome.
 *
 * @function userUpdateRouter
 * @param {Object} req - The request object that contains the `filter` and `update` data in the body.
 * @param {Object} res - The response object used to send back the result of the update operation.
 * @returns {void} Sends a JSON response indicating the success or failure of the update operation.
 */
const userUpdateRouter = async (req, res) => {
  try {
    const { filter, update } = req.body;

    // Validate input
    if (!filter || typeof filter !== "object") {
      return res.status(400).json({ error: "Invalid filter" });
    }
    if (!update || typeof update !== "object") {
      return res.status(400).json({ error: "Invalid update data" });
    }

    const result = await updateUser(filter, update);

    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ message: "User not found or no changes applied" });
    }

    res.status(200).json({ message: "User updated successfully!" });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ error: "Error updating user" });
  }
};

/**
 * Handles requests to delete a user based on the provided email address.
 *
 * This route handler processes user deletion by using the `deleteUser` function.
 * It expects the email address of the user to be provided in the request body.
 * The function validates the presence of the email, performs the deletion,
 * and responds with a success message or an appropriate error message based on the outcome.
 *
 * @function userDeleteRouter
 * @param {Object} req - The request object containing the `email` address in the body.
 * @param {Object} res - The response object used to send back the result of the deletion operation.
 * @returns {void} Sends a JSON response indicating the success or failure of the deletion operation.
 */
const userDeleteRouter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const filter = { email };
    const result = await deleteUser(filter);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Error deleting user" });
  }
};

module.exports = { userRouter, userUpdateRouter, userDeleteRouter };
