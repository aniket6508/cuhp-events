const mongoose = require("mongoose");

const DB = process.env.DATABASE;

//Mongoose allows query filters to match multiple properties, 
//even if they're not explicitly defined in the schema.
mongoose.set('strictQuery', false)


const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
