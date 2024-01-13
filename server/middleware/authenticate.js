const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

// Middleware to authenticate and authorize incoming requests
const Authenticate = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const bearerHeader = req.headers["authorization"];
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    // Verify the token using the secret key
    const verifyTokens = jwt.verify(token, process.env.SECRET_KEY);

    // Query the database to find a user with the same ID and matching token
    const rootUser = await User.findOne({
      _id: verifyTokens._id,
      "tokens.token": token,
    });

    // If the user is not found, throw an error
    if (!rootUser) {
      throw new Error("User not found");
    }

    // Modify the request object by adding token, user, and user ID
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
    
  } catch (error) {
    res.status(401).send("Unauthorized: No valid token");
  }
};


module.exports = Authenticate;
