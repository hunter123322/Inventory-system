const { signUp, signIn } = require("../model/user.js");
const hasher = require("../controllers/passwordHasher.js");

/**
 * Handles user sign-up requests.
 *
 * This route handler processes the user registration request.
 * It validates the required fields, hashes the user's password,
 * saves the user data, and then sets up a session for the user.
 *
 * @async
 * @function signUpRouter
 * @param {Object} req - The request object, which should contain user data in its body.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 */
const signUpRouter = async (req, res) => {
  try {
    const user = req.body;
    console.log(user);
    if (
      !user.firstName ||
      !user.lastName ||
      !user.civil ||
      !user.location?.country ||
      !user.location?.region ||
      !user.location?.district ||
      !user.location?.municipality ||
      !user.location?.barangay ||
      !user.location?.zone ||
      !user.location?.zip ||
      !user.dateOfBirth?.year ||
      !user.dateOfBirth?.month ||
      !user.dateOfBirth?.day ||
      !user.gender ||
      !user.mobileNumber ||
      !user.email ||
      !user.username ||
      !user.password
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const hashedPassword = await hasher(user.password);
    user.password = hashedPassword;
    await signUp(user);

    req.session.username = user.username;

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Error creating user" });
  }
};

/**
 * Handles user sign-in requests.
 *
 * This route handler processes user sign-in attempts.
 * It verifies the user's credentials, sets up a session if authentication is successful,
 * and distinguishes between regular users and admins.
 * If the user is an admin, an error is thrown.
 *
 * @async
 * @function signInRouter
 * @param {Object} req - The request object, which should contain user credentials in its body.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 * @throws {Error} Throws an error if there's a problem with sign-in or if the user is an admin.
 */
const signInRouter = async (req, res) => {
  try {
    const user = req.body;
    const comparePassword = await signIn(user.email, user.password);

    if (!comparePassword) {
      res.status(401).json({ message: "Wrong password try again" });
    }
    req.session.username = user.email;
    const admin = await searchUser({ email: user.email });

    if (admin.admin) throw new Error();

    req.session.admin = user.password;
    res.status(200).json({ message: "Successfully signed in!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to sign in" });
  }
};

/**
 * Handles user logout requests.
 *
 * This route handler destroys the user's session, effectively logging them out.
 * It checks if a session exists and, if so, attempts to destroy it.
 * On success, it sends a success message; on failure, it returns an error.
 *
 * @function logoutRouter
 * @param {Object} req - The request object, which contains the user's session information.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 * @returns {void} Sends a JSON response indicating success or failure.
 */
const logoutRouter = (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to log out" });
      } else {
        res.status(200).json({ message: "Successfully logged out" });
      }
    });
  } else {
    res.status(400).json({ message: "No active session found" });
  }
};

module.exports = { signUpRouter, signInRouter, logoutRouter };
