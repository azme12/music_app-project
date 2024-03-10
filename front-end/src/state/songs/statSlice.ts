import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Count {
  _id: string;
  count: number;
}

interface AlbumCountPerArtist {
  _id: string;
  artist: string;
  numberOfAlbums: number;
}

interface StatsState {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  genreCounts: Count[];
  artistSongCounts: Count[];
  albumSongCounts: Count[];
  albumCountsPerArtist: AlbumCountPerArtist[];
  isLoading: boolean;
}

const initialState: StatsState = {
  totalSongs: 0,
  totalArtists: 0,
  totalAlbums: 0,
  totalGenres: 0,
  genreCounts: [],
  artistSongCounts: [],
  albumSongCounts: [],
  albumCountsPerArtist: [],
  isLoading: false,
};

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setStats: (state, action: PayloadAction<StatsState>) => {
      return {...state, ...action.payload};
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {setStats, setIsLoading} = statsSlice.actions;

export default statsSlice.reducer;
