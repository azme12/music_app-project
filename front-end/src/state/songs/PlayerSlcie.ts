import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// src/state/playerSlice.js

type Song = {title: string; songUrl: string} | null;

interface PlayerState {
  currentSong: Song;
  isPlaying: boolean;
}

const initialState: PlayerState = {
  currentSong: null,
  isPlaying: false,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<Song>) => {
      state.currentSong = action.payload;
    },
    playSong: (state) => {
      state.isPlaying = true;
    },
    pauseSong: (state) => {
      state.isPlaying = false;
    },
  },
});

export const {setCurrentSong, playSong, pauseSong} = playerSlice.actions;

export default playerSlice.reducer;
