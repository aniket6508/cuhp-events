const mongoose = require('mongoose');

// Define a Mongoose schema for the 'Hall' model
const hallSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures uniqueness of the 'name' field
  },
  location: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  amenities: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  hallCreater: {
    type: String,
    required: true,
  },
});

const Hall = mongoose.model('Hall', hallSchema);
module.exports = Hall;
