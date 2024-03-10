import { call, put, takeEvery } from "redux-saga/effects";

import {
  setTotalNumberOfSongs,
  setTotalNumberOfArtists,
  setTotalNumberOfAlbums,
  setTotalNumberOfGenres,
  setIsLoding
} from "./songs/songsStatisticsSlice";

import {
  setGenres,
  setIssongDataStatisticsLoading,
  setSongsAndAlbumsperArtist,
  setAlbumCountsAndSongs
}
from "./songs/songsDataStatisticsSlice"

import axios, { AxiosResponse } from "axios";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

// statistics
// function* fetchTotalNumberOfSongs() {
//   try {
//     const response: AxiosResponse = yield call(() =>
//       axios.get(`${VITE_BASE_URL}/totalSongs`)
//     );
//     yield put(setTotalNumberOfSongs(response.data.totalSongs.totalSongs));
//   } catch (error) {
//     console.log(error);
//   }
// }
// function* fetchTotalNumberOfArtists() {
//   try {
//     const response: AxiosResponse = yield call(() =>
//       axios.get(`${VITE_BASE_URL}/totalArtists`)
//     );
//     yield put(setTotalNumberOfArtists(response.data.data.totalArtistsCount));
//   } catch (error) {
//     console.log(error);
//   }
// }
// function* fetchTotalNumberOfAlbums() {
//   try {
//     const response: AxiosResponse = yield call(() =>
//       axios.get(`${VITE_BASE_URL}/totalAlbums`)
//     );
//     yield put(setTotalNumberOfAlbums(response.data.data.totalAlbumsCount));
//   } catch (error) {
//     console.log(error);
//   }
// }
// function* fetchTotalNumberOfGenres() {
//   try {
//     const response: AxiosResponse = yield call(() =>
//       axios.get(`${VITE_BASE_URL}/totalGenre`)
//     );
//     yield put(setTotalNumberOfGenres(response.data.data.totalGenreCount));
//   } catch (error) {
//     console.log(error);
//   }
// }

function* fetchSongsStatistics() {
  try {
    const response1: AxiosResponse = yield call(() =>
      axios.get(`${VITE_BASE_URL}/totalSongs`)
    );
    yield put(setTotalNumberOfSongs(response1.data.totalSongs[0].totalSongs));

    const response2: AxiosResponse = yield call(() =>
      axios.get(`${VITE_BASE_URL}/totalArtists`)
    );
    yield put(setTotalNumberOfArtists(response2.data.data.totalArtistsCount));

    const response3: AxiosResponse = yield call(() =>
      axios.get(`${VITE_BASE_URL}/totalAlbums`)
    );
    yield put(setTotalNumberOfAlbums(response3.data.data.totalAlbumsCount));

    const response4: AxiosResponse = yield call(() =>
      axios.get(`${VITE_BASE_URL}/totalGenre`)
    );
    yield put(setTotalNumberOfGenres(response4.data.data.totalGenreCount));

    yield (put(setIsLoding(false)))

  } catch (error) {
    console.log(error);
  }
}

function* fetchSongsStatisticsData() {
  try {
    // get every genre + its total songs
    const response : AxiosResponse = yield call(() =>
      axios.get(`${VITE_BASE_URL}/songsPerGenre`)
    )
    yield put(setGenres(response.data.genreCounts))
    // get every artist name + total albums + total songs
    const response1 : AxiosResponse = yield call(() =>
      axios.get(`${VITE_BASE_URL}/songsAndAlbumsPerArtist`)
    )
    yield put(setSongsAndAlbumsperArtist(response1.data.artistCountsAndAlbums))
    // get album name + count of album + songs in album
    const response2 : AxiosResponse = yield call(() =>
      axios.get(`${VITE_BASE_URL}/songsPerAlbum`)
    )
    yield put(setAlbumCountsAndSongs(response2.data.albumCountsAndSongs))

    yield put(setIssongDataStatisticsLoading(false))
  } catch (error) {
    console.log(error)
  }
}

export function* fetchSongsStatisticsSaga() {
    yield takeEvery("songs/fetchSongsStatistics", fetchSongsStatistics)
}

export function* fetchSongsStatisticsDataSaga() {
  yield takeEvery("songs/fetchSongsStatisticsData", fetchSongsStatisticsData)
}