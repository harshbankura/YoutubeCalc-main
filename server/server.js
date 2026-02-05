require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const playlistRoutes = require('./routes/playlist');
app.use('/api/playlist', playlistRoutes);

// Database Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

// Start Server
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
