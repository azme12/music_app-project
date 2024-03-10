// require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();


const app = express();



const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:5173','https://music-app-project-roan.vercel.app'],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
connectDB();

// Init MIddleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/songs', require('./songs'));


const PORT = process.env.PORT || 8800;
app.listen(PORT, console.log(`Listening on port ${PORT}`));
