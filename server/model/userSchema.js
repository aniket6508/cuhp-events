const mongoose = require("mongoose"); 
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 

// Define a Mongoose schema for the 'User' model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  adminKey: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  verifyToken: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
  },
});

// Middleware: Before saving a user document, hash the password using bcrypt
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Method: Generate an authentication token using the user's ID and a secret key
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, { expiresIn: '2d' });
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

// Create a Mongoose model named 'User' using the defined schema
const User = new mongoose.model("USER", userSchema);
module.exports = User;
