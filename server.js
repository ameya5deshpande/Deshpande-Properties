const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require("express");
const cors = require("cors"); // Import the CORS package

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB successfully!");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

    
    
    const app = express();

    // Enable CORS for all routes
    app.use(cors());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    // Mongoose Property Schema
    const propertySchema = new mongoose.Schema({
      location: String,
      price: Number,
      area: String,
      bedrooms: Number,
      bathrooms: Number,
      images: [String]  // Store image URLs or paths
    });
    const Property = mongoose.model("Property", propertySchema);
    
    // Route to handle property addition
    app.post("/add-property", async (req, res) => {
      try {
        console.log("Request body:", req.body);  // Log request data
        const newProperty = new Property({
          location: req.body.location,
          price: req.body.price,
          area: req.body.area,
          bedrooms: req.body.bedrooms,
          bathrooms: req.body.bathrooms,
          images: req.body.images  // Modify based on your image upload logic
        });
        await newProperty.save();
        res.status(201).json({message: "Property added successfully!"});
      } catch (error) {
        res.status(500).json({message: "Error adding property."});
      }
    });

// Start server and listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});
    