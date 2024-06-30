const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const dbConnect = require("./databaseConnection");
const { userSchema } = require("./schema");

// Import the User model from Mongoose
const User = mongoose.model("user", userSchema);

/**
 * Searches for a user based on the provided key.
 * @param {string} key - The email of the user to search for.
 * @returns {Promise<Object|null>} - The user object if found, otherwise null.
 * @throws {Error} - Throws an error if there is an issue during the search process.
 */
async function searchUser(key) {
  try {
    // Ensure the database connection is established
    await dbConnect();

    // Find the user based on the provided email
    const user = await User.findOne(key).exec();

    // Return the found user object or null if not found
    return user;
  } catch (error) {
    // Throw an error with a descriptive message
    throw new Error("Error searching the email");
  }
}

/**
 * Creates a new user document and saves it to the database.
 * @param {Object} user - The user object containing relevant data.
 * @returns {Promise<void>} Resolves if the user is successfully saved, otherwise rejects with an error.
 */
async function signUp(user) {
  try {
    const existingUser = await searchUser({ email: user.email });

    if (existingUser) {
      throw new Error("Email already exist!");
    }

    // Create a new User instance with the provided data
    const userInfo = new User(user);
    await userInfo.save();
  } catch (error) {
    // Handle any errors that occur during the process
    throw error;
  }
}

/**
 * Signs in a user by comparing the input password with the stored hashed password.
 * @param {string} inputEmail - The email of the user.
 * @param {string} password - The plain-text password.
 * @returns {Promise<boolean>} Resolves with a boolean indicating if the passwords match.
 * @throws {Error} If an error occurs during the sign-in process.
 */
async function signIn(inputEmail, password) {
  try {
    // Find the user based on the input email
    const existingUser = await searchUser({ email: inputEmail });

    if (!existingUser) {
      return null;
    }

    // Compare the input password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return null;
    }

    return passwordMatch;
  } catch (error) {
    // Throw an error message
    throw new Error(error.message);
  }
}

/**
 * Updates a user document based on the provided filter.
 * @param {Object} filter - The filter to find the user to update.
 * @param {Object} update - The update data for the user.
 * @returns {Promise<Object>} - The result of the update operation.
 * @throws {Error} - Throws an error if there is an issue during the update process.
 */
async function updateUser(filter, update) {
  try {
    await dbConnect();
    const result = await User.updateOne(filter, update);
    return result;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}

/**
 * Deletes a user based on the provided filter.
 * @param {Object} filter - The filter to find the user to delete.
 * @returns {Promise<Object>} - The result of the delete operation.
 */
async function deleteUser(filter) {
  try {
    // Connnect to DB.
    await dbConnect();

    // Delete user.
    const result = await User.deleteOne(filter);

    return result;
  } catch (error) {
    // Throw new error.
    throw new Error(`Error deleting user: ${error.message}`);
  }
}

module.exports = { signUp, signIn, deleteUser, updateUser, searchUser };
