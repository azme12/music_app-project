import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface songsStatistics {
  TotalNumberOfSongs: string;
  TotalNumberOfArtists: string;
  TotalNumberOfAlbums: string;
  TotalNumberOfGenres: string;
  isLoading: boolean;
  isError: boolean;
}

const initialState: songsStatistics = {
  TotalNumberOfSongs: "",
  TotalNumberOfArtists: "",
  TotalNumberOfAlbums: "",
  TotalNumberOfGenres: "",
  isLoading: true,
  isError: false,
};

const songsStatisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setTotalNumberOfSongs: (state, action: PayloadAction<string>) => {
      state.TotalNumberOfSongs = action.payload;
    },
    setTotalNumberOfArtists: (state, action: PayloadAction<string>) => {
      state.TotalNumberOfArtists = action.payload;
    },
    setTotalNumberOfAlbums: (state, action: PayloadAction<string>) => {
      state.TotalNumberOfAlbums = action.payload;
    },
    setTotalNumberOfGenres: (state, action: PayloadAction<string>) => {
      state.TotalNumberOfGenres = action.payload;
    },
    setIsLoding: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setTotalNumberOfSongs,
  setTotalNumberOfArtists,
  setTotalNumberOfAlbums,
  setTotalNumberOfGenres,
  setIsLoding,
} = songsStatisticsSlice.actions;

export default songsStatisticsSlice.reducer;
