require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();

// ✅ Middleware
app.use(express.json());

app.use(cors({
  origin: "https://google-2-s99c.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// ✅ MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));

// ✅ Schema
const formSchema = new mongoose.Schema({
  search: String
});

const DataModel = mongoose.model("data", formSchema);

// ✅ POST API
app.post("/searchData", async (req, res) => {
  const { search } = req.body;

  try {
    const newData = new DataModel({ search });
    await newData.save();

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
      search: search,
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

// ✅ GET API
app.get("/searchData", async (req, res) => {
  try {
    const data = await DataModel.find().sort({ _id: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ IMPORTANT: Render PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
