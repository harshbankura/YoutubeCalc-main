const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  playlistUrl: {
    type: String,
    required: true,
  },
  playlistTitle: {
    type: String,
    default: 'Unknown Playlist',
  },
  videoCount: {
    type: Number,
    required: true,
  },
  totalDuration: {
    type: Number, // In seconds
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('History', historySchema);
