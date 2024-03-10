import {call, put, select, takeEvery} from 'redux-saga/effects';

import {
  setSongs,
  setSongsByGenre,
  setSearchSong,
  setCreateSongCauseAnError,
  setAddSongButtonLoading,
  setEditSongCauseAnError,
  setEditSongButtonLoading,
  setShowSuccessToast,
  setShowFailedToast,
  setOpenDeleteModal,
} from './songs/songsSlice';

import axios, {AxiosResponse} from 'axios';
import {RootState} from './store';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function* fetchSongs() {
  try {
    const response: AxiosResponse = yield call(() =>
      axios.get(`${VITE_BASE_URL}/songs/list`)
    );
    if (response.data.message === 'list of songs') {
      console.log(response);
      yield put(setSongs(response.data.song));
    } else {
      console.log('Unexpected response message:', response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
}
function* fetchSongsByGenre(action: any) {
  const {genre}: {genre: string} = action.payload;
  try {
    const response: AxiosResponse = yield call(() =>
      axios.get(`http://localhost:8800/api/songs/${genre}`)
    );
    if (response.data.message === 'list of songs by genre') {
      yield put(setSongsByGenre(response.data.song));
    } else {
      console.log('Unexpected response message:', response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
}

type formdData = {
  title: string;
  artist: string;
  album: string;
  genre: string;
  coverImageUrl: string;
};

function* createSong(action: any) {
  yield put(setAddSongButtonLoading(true));

  // Check if action.payload exists before destructuring
  if (action.payload) {
    const {data, file}: {data: formdData; file: File} = action.payload;
    console.log(data);

    // Create a new FormData instance
    const formData = new FormData();
    // Append the file and other data to the FormData instance
    formData.append('postAudio', file);
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    try {
      const response: AxiosResponse = yield call(() => {
        return axios.post(`${VITE_BASE_URL}/songs/new`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      });
      yield put(setCreateSongCauseAnError(false));
      console.log(response.data);
      yield put(setAddSongButtonLoading(false));
      const songId = response.data.song._id;
      console.log(songId);
      yield put({
        type: 'songs/createSongSuccess',
        payload: response.data.song,
      });

      yield put({
        type: 'songs/createSongSuccessToast',
        payload: response.data,
      });
      yield put({type: 'songs/fetchSongs'});
    } catch (error) {
      yield put(setCreateSongCauseAnError(true));
      yield put(setAddSongButtonLoading(false));
      console.log(error);
    }
  } else {
    console.log('Payload is undefined');
  }
}
function* updateSong(action: any) {
  yield put(setEditSongButtonLoading(true));

  // Check if action.payload exists before destructuring
  if (action.payload) {
    const {id, data}: {id: string; data: formdData} = action.payload;
    console.log(data);
    console.log(id);
    try {
      const response: AxiosResponse = yield call(() => {
        return axios.put(`${VITE_BASE_URL}/songs/${id}`, data);
      });
      yield put(setEditSongCauseAnError(false));
      console.log(response.data);
      yield put(setEditSongButtonLoading(false));
      yield put({type: 'songs/fetchSongs'});
      yield put({type: 'songs/editSongSuccess', payload: response.data});
    } catch (error) {
      yield put(setEditSongCauseAnError(true));
      yield put(setEditSongButtonLoading(false));
      console.log(error);
    }
  } else {
    console.log('Payload is undefined');
  }
}
function* getSongById(action: any) {
  const {id}: {id: string} = action.payload;
  try {
    const response: AxiosResponse = yield call(() => {
      return axios.get(`${VITE_BASE_URL}/searchSong/${id}`);
    });
    yield put(setSearchSong(response.data.song));
  } catch (error) {
    console.log(error);
  }
}
function* deleteSongById(action: any) {
  try {
    const {songid}: {songid: string} = action.payload;
    console.log(songid, action);

    // Send a request to delete the song
    const response: AxiosResponse = yield call(() => {
      return axios.delete(`${VITE_BASE_URL}/songs/${songid}`);
    });
    console.log(response.data.message);
    const songToRemove = response.data.song;

    // Update the songs list and songs by genre after deletion
    const songs: RootState['songs']['songs'] = yield select(
      (state: RootState) => state.songs.songs
    );
    const songsByGenre: RootState['songs']['songsByGenre'] = yield select(
      (state: RootState) => state.songs.songsByGenre
    );

    const filteredSongs = songs.filter((song) => song._id !== songToRemove._id);
    const filteredSongsByGenre = songsByGenre.filter(
      (song) => song._id !== songToRemove._id
    );

    yield put(setSongs(filteredSongs));
    yield put(setSongsByGenre(filteredSongsByGenre));

    // Set delete success Toast on
    yield put(setShowSuccessToast(true));
  } catch (error) {
    yield put(setOpenDeleteModal(false));
    yield put(setShowFailedToast(true));
    console.log(error);
  }
}

export function* fetchSongsSaga() {
  yield takeEvery('songs/fetchSongs', fetchSongs);
}

export function* fetchSongsByGenreSaga() {
  yield takeEvery('songsByGenre/fetchSongs', fetchSongsByGenre);
}

export function* createSongSaga() {
  yield takeEvery('song/createSong', createSong);
}
export function* updateSongSaga() {
  yield takeEvery('song/updateSong', updateSong);
}

export function* getSongByIdSaga() {
  yield takeEvery('song/getSongById', getSongById);
}
export function* deleteSongByIdSaga() {
  yield takeEvery('song/deleteSongById', deleteSongById);
}
