const mongoose = require('mongoose');
const express = require('express');
const cloudinary = require('cloudinary');
const {
  uploadToCloudinary,
  uploadToCloudinaryV,
  removeFromCloudinary,
  uploadToCloudinaryA,
  uploadAudioToCloudinary,
  uploadImageToCloudinary,
} = require('./cloudinary');
const router = express.Router();
const upload = require('./upload');
const Song = require('./model/Songs');

// @router GET api/songs
// @desc Test router
// @access Public

router.get('/', (req, res) => res.send('Songs route'));

router.post('/new', upload.single('postAudio'), async (req, res) => {
  try {
    console.log('Uploading audio to Cloudinary...');
    // upload audio to cloudinary
    const data = await uploadToCloudinary(req.file.path, 'post-songs');
    console.log('Audio uploaded to Cloudinary:', data);
    // create new post with audio url and public ID
    const song = new Song({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      genre: req.body.genre,
      songUrl: data.secure_url,
      publicId: data.public_id,
      imageUrl: null,
    });
    // Check if genre is valid
    if (
      ![
        'Jazz',
        'Electronic',
        'Rock',
        'Pop',
        'Hip-Hop',
        'Rap',
        'Classical',
        'Ethiopian Music',
        'other',
      ].includes(req.body.genre)
    ) {
      return res
        .status(400)
        .send(
          'Invalid genre. Genre must be one of: Rock, Pop, Hip-Hop, Electronic, Classical, Jazz, Other'
        );
    }

    // save songUrl  to database
    const savedSong = await Song.updateOne({
      $set: {songUrl: data.url, publicId: data.public_id},
    });
    // save song to database

    const savedPOst = await song.save();
    res.status(200).json({message: 'song created', song: savedPOst});
  } catch (error) {
    console.log('Error:', error);
    res.status(400).send(error);
  }
});
// add cover image to music
// list all songs
router.get('/list', async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json({message: 'list of songs', song: songs});
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/list/:genre', async (req, res) => {
  try {
    const songs = await Song.find({genre: req.params.genre});
    res.status(200).json({message: 'list of songs by genre', song: songs});
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get('/stats', async (req, res) => {
  try {
    // Fetch all songs
    const songs = await Song.find();

    // Calculate total statistics
    const totalSongs = songs.length;
    const totalArtists = new Set(songs.map((song) => song.artist)).size;
    const totalAlbums = new Set(songs.map((song) => song.album)).size;
    const totalGenres = new Set(songs.map((song) => song.genre)).size;

    // number of  song in each genre
    const genreCounts = await Song.aggregate([
      {$group: {_id: '$genre', count: {$sum: 1}}},
    ]);

    // number of songs each artist has
    const artistSongCounts = await Song.aggregate([
      {
        $group: {
          _id: '$artist',
          count: {$sum: 1},
        },
      },
    ]);
    //number of songs in each album
    const albumSongCounts = await Song.aggregate([
      {
        $group: {
          _id: '$album',
          count: {$sum: 1},
        },
      },
    ]);
    //number  of albums each artist has
    const albumCountsPerArtist = await Song.aggregate([
      {
        $group: {
          _id: '$artist',
          albums: {$addToSet: '$album'},
        },
      },
      {
        $project: {
          artist: '$_id',
          numberOfAlbums: {$size: '$albums'},
        },
      },
    ]);

    // Prepare and return the response data
    const data = {
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      genreCounts,
      artistSongCounts,
      albumSongCounts,
      albumCountsPerArtist,
    };

    res.json(data);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});
// update song
router.put('/:id', async (req, res) => {
  try {
    // Check if genre is valid
    if (
      req.body.genre &&
      ![
        'Rock',
        'Pop',
        'Hip-Hop',
        'Electronic',
        'Classical',
        'Jazz',
        'Ethiopian Music',
        'Other',
      ].includes(req.body.genre)
    ) {
      return res
        .status(400)
        .send(
          'Invalid genre. Genre must be one of: Rap, Rock, Pop, Hip-Hop, Electronic, Classical, Jazz, Other, Ethiopian Music',
          'Ethiopian Music'
        );
    }
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({message: 'song updated', song: song});
  } catch (error) {
    res.status(400).send(error);
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).send({message: 'Song not found'});
    }
    const publicId = song.publicId.split('/').pop();
    await removeFromCloudinary(publicId);
    const deletedSong = await Song.findByIdAndDelete(req.params.id);
    res.status(200).json({message: 'song Deleted', song: deletedSong});
  } catch (error) {
    res.status(400).send(error);
  }
});
// Song by id 
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({message: 'Song not found'});
    }
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});
module.exports = router;
