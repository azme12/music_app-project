const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    album: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: [
        'Jazz',
        'Electronic',
        'Rock',
        'Pop',
        'Hip-Hop',
        'Rap',
        'Classical',
        'Ethiopian Music',
        'other',
      ],
      required: true,
    },

    songUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

// Create a text index on the title, artist, album, and genre fields
SongSchema.index({title: 'text', artist: 'text', album: 'text', genre: 'text'});

module.exports = Song = mongoose.model('songs', SongSchema);
