import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface genre {
  _id: string;
  count: number;
}

interface songsAndAlbumsPerArtist {
  totalSongs: number,
  albums: [string]
  songs: [
    {
      title: string,
      genre: string
    }
  ],
  artist: string
}

interface albumCountsAndSongs {
  count: number,
      songs: [
        {
          title: number,
          artist: string,
          genre: string
        }
      ],
      album: string
}

interface songDataStatistics {
  genreCounts: genre[];
  songsAndAlbumsperArtist: songsAndAlbumsPerArtist[];
  albumCountsAndSongs: albumCountsAndSongs[];
  issongDataStatistics: boolean;
}


const initialState: songDataStatistics = {
  genreCounts: [],
  songsAndAlbumsperArtist: [],
  albumCountsAndSongs: [],
  issongDataStatistics: true,
};

const songDataStatistics = createSlice({
  name: "statisticsData",
  initialState,
  reducers: {
    setGenres: (state, action: PayloadAction<genre[]>) => {
      state.genreCounts = action.payload;
    },
    setSongsAndAlbumsperArtist: (state, action: PayloadAction<songsAndAlbumsPerArtist[]>) => {
      state.songsAndAlbumsperArtist = action.payload
    },
    setIssongDataStatisticsLoading: (state, action: PayloadAction<boolean>) => {
      state.issongDataStatistics = action.payload;
    },
    setAlbumCountsAndSongs: (state, action: PayloadAction<[]>) => {
      state.albumCountsAndSongs = action.payload
    }
  },
});

export const { setGenres, setIssongDataStatisticsLoading, setSongsAndAlbumsperArtist, setAlbumCountsAndSongs } = songDataStatistics.actions;
export default songDataStatistics.reducer