// Import required libraries and modules
const express = require("express"); 
const dotenv = require("dotenv"); 
const cors = require("cors"); 

const cookieParser = require("cookie-parser"); 
const app = express(); 
app.use(cookieParser()); 
// Configure CORS with options allowing credentials and any origin
app.use(cors({
  credentials: true,
  origin: true
}));  

// Set Express to trust the first proxy
app.set("trust proxy", 1); 

// Enable parsing of incoming JSON payloads
app.use(express.json());

// Load environment variables from .env file
dotenv.config({ path: "./.env" });

// Connect to MongoDB using the connectDB function
const connectDB = require("./DB/conn");

// Import MongoDB schemas 
require("./model/userSchema");
require("./model/hallSchema");
require("./model/bookingSchema");

// Include routes 
app.use(require("./router/authRoutes"));
app.use(require("./router/bookingRoutes"));
app.use(require("./router/hallRoutes"));

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT;

// Start the Express server 
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
