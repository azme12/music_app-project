const express = require('express');
const router = express.Router();
const upload = require('./upload');
const Song = require('./model/Songs');
const { uploadToCloudinary, removeFromCloudinary } = require('./cloudinary');

const GENRES = [
  'Jazz',
  'Electronic',
  'Rock',
  'Pop',
  'Hip-Hop',
  'Rap',
  'Classical',
  'Ethiopian Music',
  'other',
];

// @route   GET api/songs/
// @desc    Test route
router.get('/', (req, res) => res.send('Songs route'));

// @route   POST api/songs/new
// @desc    Add new song
router.post('/new', upload.single('postAudio'), async (req, res) => {
  try {
    if (!GENRES.includes(req.body.genre)) {
      return res.status(400).send('Invalid genre.');
    }
    const data = await uploadToCloudinary(req.file.path, 'post-songs');
    const song = new Song({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      genre: req.body.genre,
      songUrl: data.secure_url,
      publicId: data.public_id,
    });
    const savedPost = await song.save();
    res.status(200).json({ message: 'song created', song: savedPost });
  } catch (error) {
    console.log('Error:', error);
    res.status(400).send(error.message || error);
  }
});

// @route   GET api/songs/list
// @desc    List all songs
router.get('/list', async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json({ message: 'list of songs', song: songs });
  } catch (error) {
    res.status(400).send(error.message || error);
  }
});

// @route   GET api/songs/list/:genre
// @desc    List songs by genre
router.get('/list/:genre', async (req, res) => {
  try {
    const songs = await Song.find({ genre: req.params.genre });
    res.status(200).json({ message: 'list of songs by genre', song: songs });
  } catch (error) {
    res.status(400).send(error.message || error);
  }
});

// @route   GET api/songs/stats
// @desc    Get song statistics
router.get('/stats', async (req, res) => {
  try {
    const songs = await Song.find();
    const totalSongs = songs.length;
    const totalArtists = new Set(songs.map((song) => song.artist)).size;
    const totalAlbums = new Set(songs.map((song) => song.album)).size;
    const totalGenres = new Set(songs.map((song) => song.genre)).size;
    const genreCounts = await Song.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } },
    ]);
    const artistSongCounts = await Song.aggregate([
      { $group: { _id: '$artist', count: { $sum: 1 } } },
    ]);
    const albumSongCounts = await Song.aggregate([
      { $group: { _id: '$album', count: { $sum: 1 } } },
    ]);
    const albumCountsPerArtist = await Song.aggregate([
      { $group: { _id: '$artist', albums: { $addToSet: '$album' } } },
      { $project: { artist: '$_id', numberOfAlbums: { $size: '$albums' } } },
    ]);
    res.json({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      genreCounts,
      artistSongCounts,
      albumSongCounts,
      albumCountsPerArtist,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT api/songs/:id
// @desc    Update song
router.put('/:id', async (req, res) => {
  try {
    if (req.body.genre && !GENRES.includes(req.body.genre)) {
      return res.status(400).send('Invalid genre.');
    }
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'song updated', song });
  } catch (error) {
    res.status(400).send(error.message || error);
  }
});

// @route   DELETE api/songs/:id
// @desc    Delete song
router.delete('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).send({ message: 'Song not found' });
    }
    await removeFromCloudinary(song.publicId.split('/').pop());
    const deletedSong = await Song.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'song Deleted', song: deletedSong });
  } catch (error) {
    res.status(400).send(error.message || error);
  }
});

// @route   GET api/songs/:id
// @desc    Get song by id
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
