import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  coverImageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Songs {
  songs: Song[];
  song: Song;
  songsByGenre: Song[];
  searchedSong: Song;
  getSongsLoading: boolean;
  songsByGenreLoading: boolean;
  searchedSongLoading: boolean;
  isError: boolean;
  isCreateSongCausingError: boolean;
  addSongButtonLoading: boolean;
  isEditSongCausingError: boolean;
  EditSongButtonLoading: boolean;
  isSongtoBeDeletedMarked: boolean;
  isDeleteSongCausingError: boolean;
  showSuccessToast: boolean;
  showFailedToast: boolean;
  showOpenDeleteModal: boolean;
  markDeletedItem: boolean;

  newSongId: string | null;
  newSongIds: string | null;
  showCreateSongSuccessToast: boolean;
  showEditSongSuccessToast: boolean;
  selectedGenre: string | null;
}

const initialState: Songs = {
  songs: [],
  songsByGenre: [],
  searchedSong: {
    _id: '',
    title: '',
    artist: '',
    album: '',
    genre: '',
    coverImageUrl: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
  },
  getSongsLoading: true,
  songsByGenreLoading: true,
  searchedSongLoading: true,
  isError: false,
  // for creation purpose
  isCreateSongCausingError: false,
  addSongButtonLoading: false,
  // for editing purpose
  isEditSongCausingError: false,
  EditSongButtonLoading: false,
  // for deleting purpose
  isSongtoBeDeletedMarked: false,
  isDeleteSongCausingError: false,
  markDeletedItem: false,
  // for toast
  showSuccessToast: false,
  showFailedToast: false,
  // for modal
  showOpenDeleteModal: false,
  newSongId: '',
  newSongIds: '',
  showCreateSongSuccessToast: false,
  showEditSongSuccessToast: false,
  selectedGenre: null,
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setSongs: (state, action: PayloadAction<Song[]>) => {
      state.getSongsLoading = false;
      state.songs = action.payload;
    },
    setSong: (state, action: PayloadAction<Song | null>) => {
      state.song = action.payload ?? state.song;
    },
    setSongsByGenre: (state, action: PayloadAction<Song[]>) => {
      state.songsByGenreLoading = false;
      state.songsByGenre = action.payload;
    },
    setSearchSong: (state, action: PayloadAction<Song>) => {
      state.searchedSongLoading = false;
      state.searchedSong = action.payload;
    },
    setCreateSongCauseAnError: (state, action: PayloadAction<boolean>) => {
      state.isCreateSongCausingError = action.payload;
    },
    setAddSongButtonLoading: (state, action: PayloadAction<boolean>) => {
      state.addSongButtonLoading = action.payload;
    },
    setEditSongCauseAnError: (state, action: PayloadAction<boolean>) => {
      state.isEditSongCausingError = action.payload;
    },
    setEditSongButtonLoading: (state, action: PayloadAction<boolean>) => {
      state.EditSongButtonLoading = action.payload;
    },
    setShowSuccessToast: (state, action: PayloadAction<boolean>) => {
      state.showSuccessToast = action.payload;
    },
    setShowFailedToast: (state, action: PayloadAction<boolean>) => {
      state.showFailedToast = action.payload;
    },
    setOpenDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.showOpenDeleteModal = action.payload;
    },
    setmarkDeletedItem: (state, action: PayloadAction<boolean>) => {
      state.markDeletedItem = action.payload;
    },
    createSongSuccess: (state, action: PayloadAction<string>) => {
      state.newSongId = action.payload;
    },
    fetchSongById: (state, action: PayloadAction<string>) => {},
    updateSong: (state, action: PayloadAction<Song>) => {
      const index = state.songs.findIndex(
        (song) => song._id === action.payload._id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
    },
    setNewSongId: (state, action: PayloadAction<string>) => {
      state.newSongIds = action.payload;
    },
    resetNewSongId: (state) => {
      state.newSongId = null;
    },
    setSelectedGenre: (state, action: PayloadAction<string | null>) => {
      state.selectedGenre = action.payload;
    },
    createSongSuccessToast: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
      state.showCreateSongSuccessToast = true;
    },
    editSongSuccessToast: (state, action: PayloadAction<Song>) => {
      state.songs = state.songs.map((song) =>
        song._id === action.payload._id ? action.payload : song
      );
      state.showEditSongSuccessToast = true;
    },
  },
});

export const {
  setSongs,
  setSong,
  setSongsByGenre,
  setSearchSong,
  setCreateSongCauseAnError,
  setAddSongButtonLoading,
  setEditSongCauseAnError,
  setEditSongButtonLoading,
  setShowSuccessToast,
  setShowFailedToast,
  setOpenDeleteModal,
  setmarkDeletedItem,
  createSongSuccess,
  fetchSongById,
  updateSong,
  setSelectedGenre,
} = songsSlice.actions;

export default songsSlice.reducer;
