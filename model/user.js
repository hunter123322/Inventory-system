const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const dbConnect = require("./databaseConnection");
const { user } = require("./schema");

// Import the User model from Mongoose
const User = mongoose.model("user", user);

/**
 * Creates a new user document and saves it to the database.
 * @param {Object} user - The user object containing relevant data.
 * @returns {Promise<Error>} Resolves if the user is successfully saved, otherwise rejects with an error.
 */
async function signUp(user) {
  try {
    // Create a new User instance with the provided data
    const userInfo = new User(user);

    // Establish a database connection
    await dbConnect();

    // Save the user document to the database
    await userInfo.save();
  } catch (error) {
    // Handle any errors that occur during the process
    return error;
  }
}

/**
 * Generates a hash for the given password.
 * @param {string} password - The plain-text password.
 * @returns {Promise<string>} Resolves with the hashed password.
 * @throws {Error} If an error occurs during hashing.
 */
async function signIn(inputEmail, password) {
  try {
    // Find the user based on the input email
    const user = await User.findOne({ inputEmail }).exec();

    if (!user) {
      console.log("User not found");
      return;
    }

    // Compare the input password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
  } catch (error) {
    // Throw an error message
    throw ("Error fetching user:", error.message);
  }
}

module.exports = { signUp, signIn };
