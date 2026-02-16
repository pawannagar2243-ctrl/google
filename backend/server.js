require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();

// ✅ Sirf ye use karo
app.use(cors());

app.use(express.json());

// ✅ MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// POST
app.post("/searchData", async (req, res) => {
  const { search } = req.body;

  try {
    const response = await axios.get(
      "https://google-search74.p.rapidapi.com/",
      {
        params: {
          query: search,
          limit: "5",
          related_keywords: "true"
        },
        headers: {
          "x-rapidapi-key": process.env.RAPID_API_KEY,
          "x-rapidapi-host": "google-search74.p.rapidapi.com"
        }
      }
    );

    res.json({
      success: true,
      search,
      result: response.data
    });

  } catch (error) {
    console.log("API Error:", error.message);
    res.status(500).json({
      success: false,
      error: "Google Search API Error"
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
