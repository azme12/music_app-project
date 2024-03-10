import {all} from 'redux-saga/effects';
import {
  fetchSongsSaga,
  fetchSongsByGenreSaga,
  createSongSaga,
  updateSongSaga,
  getSongByIdSaga,
  deleteSongByIdSaga,
} from './songsSaga';
import {
  fetchSongsStatisticsSaga,
  fetchSongsStatisticsDataSaga,
} from './songsStatisticsSaga';
import {watchFetchStats} from './statSaga';

export default function* rootSaga() {
  yield all([
    fetchSongsSaga(),
    fetchSongsByGenreSaga(),
    createSongSaga(),
    updateSongSaga(),
    getSongByIdSaga(),
    fetchSongsStatisticsSaga(),
    fetchSongsStatisticsDataSaga(),
    deleteSongByIdSaga(),
    watchFetchStats(),
  ]);
}
